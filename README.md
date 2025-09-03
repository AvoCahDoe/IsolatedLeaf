# Angular Leaflet Map Component

## Overview

This Angular project provides a **reusable map component** using **Leaflet** to display markers with dynamic popups, a filter dropdown, and a legend.  
Markers can be geocoded automatically if latitude/longitude is missing.  

It is optimized for **hundreds of markers**, supports **small icons**, and is fully responsive.

---

## Features

- Display markers with **custom icons** (Client, Supplier, Default).  
- Popups show marker info as **Label: Value** pairs.  
- Filter markers dynamically by **label**.  
- Automatic **geocoding** for markers missing latitude/longitude using OpenStreetMap Nominatim.  
- Responsive map container that adjusts on window resize.  
- Dynamic legend showing marker types with icons.  
- Handles small marker sizes without jitter on zoom.  

---

## How It Works

1. **Map Initialization:**  
   The component initializes a Leaflet map and adds OpenStreetMap tiles.  

2. **Markers:**  
   - Markers are created from `markersData` input.  
   - Custom icons are assigned based on `label`.  
   - Popups show detailed information as `Label: Value`.  

3. **Filtering:**  
   Users can filter markers by label using a dropdown. Filtered markers are displayed dynamically.  

4. **Legend:**  
   A legend is displayed in the bottom-right corner showing the types of markers.  

5. **Geocoding:**  
   If a marker is missing `lat` or `lng`, the component calls OpenStreetMap Nominatim API to get coordinates.  

6. **Responsive Design:**  
   The map container resizes automatically on window resize with `map.invalidateSize()` to avoid rendering issues.  

---

## Installation

1. Clone the repository:

```bash
git clone https://github.com/your-repo/angular-leaflet-map.git
cd angular-leaflet-map
npm install
ng serve -o

//Open your browser at http://localhost:4200.

```


## Marker Data Format

Each marker object should follow this interface:

```Json
export interface Marker {
  id?: string;
  name: string;
  label: string;       // e.g., Client, Supplier
  country: string;
  addr_street?: string;
  addr_city?: string;
  addr_province?: string;
  addr_postcode?: string;
  lat?: number;
  lng?: number;
}
```


## Notes 

Use iconAnchor and popupAnchor to position markers and popups correctly.

Call this.map.invalidateSize() after any container resize to avoid rendering issues.

For large numbers of markers, consider MarkerClusterGroup for performance.

Always use L.Icon for marker images; avoid CSS background images for markers.

Popups are designed to show only non-empty fields for clarity.