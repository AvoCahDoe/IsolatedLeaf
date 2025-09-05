import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import * as L from 'leaflet';
import { firstValueFrom } from 'rxjs';
import { MapMarkerI } from '../core/model/Data/Marker.interface';

@Component({
  selector: 'cmn-map',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class CmnMapComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() markersData: MapMarkerI[] = [];

  map!: L.Map;
  markers: L.Marker[] = [];
  filterLabel = 'All';
  uniqueLabels: string[] = [];
  showFilter = false;
  showLegend = false;
  private legendControl: L.Control | null = null;
  private resizeObserver: ResizeObserver | null = null;
  
  // Loading state
  isLoading = true;

  labelIcons: { [key: string]: L.Icon } = {
    client: L.icon({ 
      iconUrl: 'assets/icons/greenMarkerIcon.png', 
      iconSize: [20, 20],
      iconAnchor: [10, 20],
      popupAnchor: [0, -20]
    }),
    supplier: L.icon({ 
      iconUrl: 'assets/icons/redMarkerIcon.png', 
      iconSize: [20, 20],
      iconAnchor: [10, 20],
      popupAnchor: [0, -20]
    }),
    default: L.icon({ 
      iconUrl: 'assets/icons/blackMarkerIcon.png', 
      iconSize: [20, 20],
      iconAnchor: [10, 20],
      popupAnchor: [0, -20]
    }),
  };

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getUniqueLabels();
  }

  ngAfterViewInit(): void {
    requestAnimationFrame(() => {
      this.initMap();
      this.addMarkers(this.markersData);
      this.addLegend();
      this.setupResizeObserver();
      
      this.geocodeMissingMarkers().then(() => {
        this.filterMarkers();
        this.isLoading = false;
      });
    });
  }

  ngOnDestroy(): void {
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
    }
    if (this.map) {
      this.map.remove();
    }
  }

  private initMap(): void {
    const mapElement = document.querySelector('.map-container');
    if (mapElement) {
      this.map = L.map(mapElement as HTMLElement, { 
        center: [0, 0], 
        zoom: 2,
        zoomControl: false,
        attributionControl: true
      });
      
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 18
      }).addTo(this.map);
    }
  }

  private getUniqueLabels(): void {
    const labels = new Set(this.markersData.map(m => m.label?.trim().toLowerCase() || 'default'));
    this.uniqueLabels = Array.from(labels).filter(label => label !== 'default');
  }

  private getIconForLabel(label: string): L.Icon {
    const normalizedLabel = label?.trim().toLowerCase() || 'default';
    return this.labelIcons[normalizedLabel] || this.labelIcons['default'];
  }

  private addMarkers(markers: MapMarkerI[]): void {
    // Clear existing markers
    this.markers.forEach(m => {
      if (this.map) {
        this.map.removeLayer(m);
      }
    });
    this.markers = [];

    markers.forEach(marker => {
      if (marker.lat != null && marker.lng != null && 
          !isNaN(marker.lat) && !isNaN(marker.lng)) {
        
        let popupContent = `<b>${marker.name || 'Unnamed'}</b><br/>`;
        
        if (marker.label) {
          popupContent += `<strong>Label:</strong> ${marker.label}<br/>`;
        }
        
        if (marker.addr_street) {
          popupContent += `<strong>Address:</strong> ${marker.addr_street}<br/>`;
        }
        
        if (marker.addr_city) {
          popupContent += `<strong>City:</strong> ${marker.addr_city}<br/>`;
        }
        
        if (popupContent.endsWith('<br/>')) {
          popupContent = popupContent.slice(0, -5);
        }
        
        const m = L.marker([marker.lat, marker.lng], { 
          icon: this.getIconForLabel(marker.label || ''),
          alt: `${marker.name || 'Unnamed'} - ${marker.label || 'No label'}`
        }).bindPopup(popupContent);
        
        this.markers.push(m);
        if (this.map) {
          m.addTo(this.map);
        }
      } else {
        console.warn('Marker missing valid coordinates:', marker);
      }
    });

    // Fit bounds to markers
    if (this.markers.length > 0 && this.map) {
      const group = L.featureGroup(this.markers);
      this.map.fitBounds(group.getBounds().pad(0.1));
    }

    this.updateLegend();
  }

  filterMarkers(): void {
    const filter = this.filterLabel.trim().toLowerCase();
    const filtered = filter === 'all' ? this.markersData : 
      this.markersData.filter(m => m.label?.trim().toLowerCase() === filter);
    this.addMarkers(filtered);
  }

  toggleFilter(): void {
    this.showFilter = !this.showFilter;
  }

  toggleLegend(): void {
    this.showLegend = !this.showLegend;
    this.updateLegend();
  }

  private updateLegend(): void {
    if (this.legendControl && this.map) {
      const legendElement = this.legendControl.getContainer();
      if (legendElement) {
        legendElement.style.display = this.showLegend && this.markers.length > 0 ? 'block' : 'none';
      }
    }
    this.populateLegend();
  }

  private addLegend(): void {
    const LegendControl = L.Control.extend({
      onAdd: () => {
        const div = L.DomUtil.create('div', 'info legend') as HTMLDivElement;
        div.setAttribute('id', 'map-legend');
        div.setAttribute('role', 'region');
        div.setAttribute('aria-label', 'Map legend');
        
        div.innerHTML = '<h4 style="margin: 0 0 8px 0;">Legend</h4>';
        div.innerHTML += '<div class="legend-content"></div>';
        
        div.style.background = 'rgba(255, 255, 255, 0.2)';
        div.style.padding = '10px';
        div.style.borderRadius = '5px';
        div.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.2)';
        div.style.backdropFilter = 'blur(5px)';
        div.style.display = 'none';
        
        return div;
      },
      
    });
    
    this.legendControl = new LegendControl({ position: 'bottomright' });
    
    if (this.map) {
      this.legendControl.addTo(this.map);
      this.populateLegend();
    }
  }

  private populateLegend(): void {
    if (!this.legendControl || !this.map) return;
    
    const legendElement = this.legendControl.getContainer();
    if (!legendElement) return;
    
    const contentElement = legendElement.querySelector('.legend-content');
    if (!contentElement) return;
    
    // Clear existing content
    contentElement.innerHTML = '';
    
    // Get all unique labels from current markers (excluding default)
    const currentLabels = new Set<string>();
    this.markers.forEach(marker => {
      const markerOptions = (marker as any).options;
      if (markerOptions && markerOptions.icon) {
        const iconUrl = markerOptions.icon.options.iconUrl;
        // Find matching label for this icon (excluding default)
        for (const [label, icon] of Object.entries(this.labelIcons)) {
          if (label !== 'default' && (icon as any).options.iconUrl === iconUrl) {
            currentLabels.add(label);
            break;
          }
        }
      }
    });
    
    // Also check all labels in the original data to ensure completeness (excluding default)
    this.markersData.forEach(marker => {
      const label = marker.label?.trim().toLowerCase();
      if (label && label !== 'default') {
        currentLabels.add(label);
      }
    });
    
    const sortedLabels = Array.from(currentLabels).sort();
    
    // Create legend items
    sortedLabels.forEach(label => {
      let iconUrl: string;
      let displayName: string;
      
      if (this.labelIcons[label]) {
        iconUrl = this.labelIcons[label].options.iconUrl;
        displayName = label.charAt(0).toUpperCase() + label.slice(1);
      } else {
        // For unknown labels, use default icon
        iconUrl = this.labelIcons['default'].options.iconUrl;
        displayName = label.charAt(0).toUpperCase() + label.slice(1);
      }
      
      const item = document.createElement('div');
      item.style.display = 'flex';
      item.style.alignItems = 'center';
      item.style.marginBottom = '4px';
      
      item.innerHTML = `
        <img src="${iconUrl}" 
             alt="${displayName} marker" 
             style="width:16px;height:16px;margin-right:8px;">
        <span>${displayName}</span>
      `;
      
      contentElement.appendChild(item);
    });
  }

  private async geocodeMissingMarkers(): Promise<void> {
    const markersToGeocode = this.markersData.filter(m => 
      (!m.lat || !m.lng) && m.addr_city
    );
    
    for (const marker of markersToGeocode) {
      try {
        const q = encodeURIComponent(`${marker.addr_street ?? ''} ${marker.addr_city} ${marker.addr_province ?? ''} ${marker.country}`);
        const res: any = await firstValueFrom(
          this.http.get(`https://photon.komoot.io/api/?q=${q}&limit=1`)
        );
        
        if (res?.features?.length > 0) {
          const [lng, lat] = res.features[0].geometry.coordinates;
          marker.lat = lat;
          marker.lng = lng;
        }
      } catch (e) {
        console.warn('Geocoding failed for marker:', marker, e);
      }
      
      await new Promise(r => setTimeout(r, 200));
    }
    
    this.getUniqueLabels();
    this.populateLegend();
  }

  private setupResizeObserver(): void {
    const mapElement = document.querySelector('.map-container');
    if (mapElement) {
      this.resizeObserver = new ResizeObserver(() => {
        if (this.map) {
          this.map.invalidateSize();
        }
      });
      this.resizeObserver.observe(mapElement);
    }
  }
}