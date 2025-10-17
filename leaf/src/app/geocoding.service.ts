// src/app/core/services/geocoding.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { MapMarkerI } from './core/model/Data/Marker.interface';
@Injectable({
  providedIn: 'root'
})
export class GeocodingService {

  private readonly GEOCODE_ENDPOINT = '/geocode';

  constructor(private http: HttpClient) {}

  private buildQuery(marker: MapMarkerI): string {
    const parts = [
      marker.addr_street,
      marker.addr_city,
      marker.addr_province,
      marker.country
    ].filter(Boolean).join(', ');
    return parts.trim();
  }

  async geocodeMarker(marker: MapMarkerI): Promise<{ lat: number; lng: number } | null> {
    const query = this.buildQuery(marker);
    if (!query) {
      console.warn(`[GeocodingService] No address data to geocode for marker: ${marker.name || marker.id}`);
      return null;
    }

    console.log(`[GeocodingService] Geocoding: "${query}"`);

    try {
      const q = encodeURIComponent(query);
      const url = `${this.GEOCODE_ENDPOINT}?q=${q}&format=json&limit=1`;

      console.debug(`[GeocodingService] Request URL: ${url}`);

      const results: any[] = await firstValueFrom(this.http.get<any[]>(url));

      if (Array.isArray(results) && results.length > 0) {
        const result = results[0];
        const lat = parseFloat(result.lat);
        const lng = parseFloat(result.lon);

        if (!isNaN(lat) && !isNaN(lng)) {
          console.log(`[GeocodingService] SUCCESS for "${query}" → [${lat}, ${lng}]`);
          return { lat, lng };
        } else {
          console.warn(`[GeocodingService] Invalid coordinates returned for "${query}": lat=${result.lat}, lon=${result.lon}`);
        }
      } else {
        console.warn(`[GeocodingService] No results found for "${query}"`);
      }
    } catch (error) {
      console.error(`[GeocodingService] ERROR geocoding "${query}":`, error);
    }

    return null;
  }
}