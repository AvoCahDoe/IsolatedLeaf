  import { Component, Input, OnInit } from '@angular/core';
  import * as L from 'leaflet';
  import { Marker as MarkerInterface } from '../core/models/Marker.interface';
  import { HttpClient, HttpClientModule } from '@angular/common/http';
  import { FormsModule } from '@angular/forms';
  import { firstValueFrom } from 'rxjs';

  import 'leaflet.markercluster';

  @Component({
    selector: 'app-map',
    imports: [FormsModule, HttpClientModule],
    templateUrl: './map.component.html',
    styleUrls: ['./map.component.scss']
  })
  export class MapComponent implements OnInit {
    @Input() markersData: MarkerInterface[] = [];

    map!: L.Map;
    leafletMarkers: L.Marker[] = [];
    filterLabel: string = '';
    uniqueLabels: string[] = [];

    // dictionary of markers icons
    labelIcons: { [key: string]: L.Icon } = {
      Client: L.icon({
        iconUrl: 'assets/icons/client.png',
        iconSize: [20, 30],
        iconAnchor: [8, 16],
        popupAnchor: [0, -20]
      }),
      Supplier: L.icon({
        iconUrl: 'assets/icons/supplier.png',
        iconSize: [20, 30],
        iconAnchor: [8, 16],
        popupAnchor: [0, -20]
      }),
      Default: L.icon({
        iconUrl: 'assets/icons/default.png',
        iconSize: [20, 30],
        iconAnchor: [8, 16],
        popupAnchor: [0, -20]
      })
    };

    constructor(private http: HttpClient) {}

    ngOnInit(): void {
      this.initMap();
      this.getUniqueLabels();
      this.filterLabel = 'All';

      this.addMarkers(this.markersData);
      this.addLegend();

      // Background geocoding
      this.geocodeMissingMarkers().then(() => {
        this.filterMarkers();
      });

      window.addEventListener('resize', () => {
        if (this.map) this.map.invalidateSize();
      });
    }

    initMap(): void {
      this.map = L.map('map', { center: [0, 0], zoom: 2 });
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
      }).addTo(this.map);
    }

    getUniqueLabels(): void {
      const labelsSet = new Set(this.markersData.map(m => m.label.trim()));
      this.uniqueLabels = Array.from(labelsSet);
    }

    getIcon(label: string): L.Icon {
      return this.labelIcons[label] ?? this.labelIcons['Default'];
    }

  addMarkers(markers: MarkerInterface[], fit: boolean = true): void {
    // Clear existing markers only if reloading everything
    this.leafletMarkers.forEach(m => this.map.removeLayer(m));
    this.leafletMarkers = [];

    markers.forEach(marker => {
      if (marker.lat != null && marker.lng != null) {
        const popupContent = `
          <div style="font-size: 14px; line-height: 1.5;">
            <b>Name:</b> ${marker.name}<br/>
            <b>Label:</b> ${marker.label}<br/>
            <b>Street:</b> ${marker.addr_street ?? '-'}<br/>
            <b>City:</b> ${marker.addr_city ?? '-'}<br/>
            <b>Province:</b> ${marker.addr_province ?? '-'}<br/>
            <b>Country:</b> ${marker.country ?? '-'}
          </div>
        `;

        const m = L.marker([marker.lat, marker.lng], { icon: this.getIcon(marker.label) })
          .bindPopup(popupContent);

        m.on('click', () => this.noamitim(marker));
        this.leafletMarkers.push(m);
        m.addTo(this.map);
      }
    });


    //responsiveness
    if (fit && this.leafletMarkers.length > 0) {
      const group = L.featureGroup(this.leafletMarkers);
      this.map.fitBounds(group.getBounds().pad(0.2));
    }


  }


    filterMarkers(): void {
      const selectedLabel = this.filterLabel?.trim().toLowerCase();
      if (!selectedLabel || selectedLabel === 'all') {
        this.addMarkers(this.markersData);
        return;
      }
      const filtered = this.markersData.filter(
        m => m.label.trim().toLowerCase() === selectedLabel
      );
      this.addMarkers(filtered);
    }

    noamitim(marker?: MarkerInterface): void {
      console.log('Marker clicked:', marker);
    }

    addLegend(): void {
      const legend = (L.control as any)({ position: 'bottomright' });

      legend.onAdd = () => {
        const div = L.DomUtil.create('div', 'info legend');

        div.style.background = 'rgba(255, 255, 255, 0.95)';
        div.style.padding = '12px 15px';
        div.style.borderRadius = '10px';
        div.style.boxShadow = '0 4px 12px rgba(0,0,0,0.25)';
        div.style.fontFamily = 'Arial, sans-serif';
        div.style.fontSize = '14px';
        div.style.color = '#333';
        div.style.lineHeight = '1.6';
        div.style.minWidth = '130px';

        div.innerHTML = `<h4 style="margin:0 0 10px 0; font-size:16px; text-align:center; color:#555;">Legend</h4>`;

        Object.entries(this.labelIcons).forEach(([label, icon]) => {
          if (label === 'Default') return;
          const iconUrl = icon.options.iconUrl;
          div.innerHTML += `
            <div style="display:flex; align-items:center; margin-bottom:6px;">
              <span style="
                display:inline-block;
                width:24px; height:24px;
                background: url('${iconUrl}') no-repeat center center;
                background-size: contain;
                border-radius:50%;
                margin-right:8px;
                box-shadow: 0 1px 3px rgba(0,0,0,0.3);
              "></span>
              <span>${label}</span>
            </div>
          `;
        });

        return div;
      };

      legend.addTo(this.map);
    }

    // Delay helper
    private delay(ms: number) {
      return new Promise(resolve => setTimeout(resolve, ms));
    }

  // Geocoding with User, delay and retry
async geocodeMissingMarkers(): Promise<void> {
  for (const marker of this.markersData) {
    if ((marker.lat == null || marker.lng == null) && marker.addr_city) {
      try {
        const query = encodeURIComponent(
          `${marker.addr_street ?? ''} ${marker.addr_city} ${marker.addr_province ?? ''} ${marker.country}`
        );
        const url = `https://photon.komoot.io/api/?q=${query}&limit=1`;

        const results: any = await firstValueFrom(this.http.get(url));

        if (results && results.features && results.features.length > 0) {
          const coords = results.features[0].geometry.coordinates; // [lng, lat]
          marker.lng = coords[0];
          marker.lat = coords[1];

          console.log(`Geocoded ${marker.id}:`, marker.lat, marker.lng);

          // Prevent re-centering the map
          this.addMarkers(this.markersData, false); // ✅ Pass false to avoid fitBounds
        }
      } catch (err) {
        console.warn('Photon geocoding failed for marker', marker, err);
      }

      await this.delay(500);
    }
  }
}

  }
