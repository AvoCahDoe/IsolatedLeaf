import { Component, Input, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { Marker as MarkerInterface } from '../core/models/Marker.interface';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import 'leaflet.markercluster';


@Component({
  selector: 'app-map',
  imports: [FormsModule,HttpClientModule],
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {


  //array of markers comming from parent comp
  @Input() markersData: MarkerInterface[] = [];
  // var with map instance
  map!: L.Map;
  //array of markers
  leafletMarkers: L.Marker[] = [];
  //filtering critirea
  filterLabel: string = '';
  //unique labels will be filled out dynamically based on input array
  uniqueLabels: string[] = [];

  // dictionary of markers icons
  labelIcons: { [key: string]: L.Icon } = {
Client: L.icon({
    iconUrl: 'assets/icons/client.png',
    iconSize: [20, 30],       // icon size
    iconAnchor: [8, 16],      // tip of the marker
    popupAnchor: [0, -20]    // popup appears 16px above the anchor
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

//for neomatim (geocoding api)
  constructor(private http: HttpClient) {}


  // iniate map + get unique labels + get coordinate of missing markers then add them 
ngOnInit(): void {
  this.initMap();
  this.getUniqueLabels();
  this.filterLabel = 'All';

  // Geocode then add markers and legend
  this.geocodeMissingMarkers().then(() => {
    this.addMarkers(this.markersData);
    this.addLegend();
  });

  // Listen to window resize to update map
  window.addEventListener('resize', () => {
    if (this.map) {
      this.map.invalidateSize(); // Recalculate map size
    }
  });
}



// initiate map by difinition docs
  initMap(): void {
    this.map = L.map('map', { center: [0, 0], zoom: 2 });
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(this.map);
  }

  // simple set to omit duplicaes
  getUniqueLabels(): void {
    const labelsSet = new Set(this.markersData.map(m => m.label.trim()));
    this.uniqueLabels = Array.from(labelsSet);
  }
// get icon for a label 
  getIcon(label: string): L.Icon {
    return this.labelIcons[label] ?? this.labelIcons['Default'];
  }


  // add array of markers to map + popup message
addMarkers(markers: MarkerInterface[]): void {
  // Remove existing markers
  this.leafletMarkers.forEach(m => this.map.removeLayer(m));
  this.leafletMarkers = [];

  markers.forEach(marker => {
    if (marker.lat != null && marker.lng != null) {
      // Build popup content dynamically as Label: Value
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

  // Fit map bounds to all markers
  if (this.leafletMarkers.length > 0) {
    const group = L.featureGroup(this.leafletMarkers);
    this.map.fitBounds(group.getBounds().pad(0.2));
  }
}


  // filtering logic 
  filterMarkers(): void {
    const selectedLabel = this.filterLabel?.trim().toLowerCase();
    if (!selectedLabel || selectedLabel === 'all') {
      this.addMarkers(this.markersData);
      return;
    }
    const filtered = this.markersData.filter(m => m.label.trim().toLowerCase() === selectedLabel);
    this.addMarkers(filtered);
  }


  //just to verify geocoding works (check terminal)
  noamitim(marker?: MarkerInterface): void {
    console.log('Marker clicked:', marker);
  }



// the legend 
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
      if (label === 'Default') return; // skip default
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







// geocoding logic for objects missing lat
  async geocodeMissingMarkers(): Promise<void> {
    const promises = this.markersData.map(async marker => {
      if ((marker.lat == null || marker.lng == null) && marker.addr_city) {
        try {
          const query = encodeURIComponent(`${marker.addr_street ?? ''} ${marker.addr_city} ${marker.addr_province ?? ''} ${marker.country}`);
          const url = `https://nominatim.openstreetmap.org/search?q=${query}&format=json&limit=1`;
          const results: any = await this.http.get(url).toPromise();
          if (results && results.length > 0) {
            marker.lat = parseFloat(results[0].lat);
            marker.lng = parseFloat(results[0].lon);
          }
        } catch (err) {
          console.warn('Geocoding failed for marker', marker, err);
        }
      }
    });

    await Promise.all(promises);
  }
}
