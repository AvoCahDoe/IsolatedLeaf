// src/app/core/services/geocoding.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { MapMarkerI } from '../core/model/Data/Marker.interface';
@Injectable({
  providedIn: 'root' // Provided in root for singleton access
})
export class GeocodingService {

  // Proxy endpoints configured in proxy.conf.json
  // These map to your local Photon instances
  private readonly GEOCODE_PROXY_AUSTRALIA = '/resolve/api/australia'; // Proxied to http://localhost:8081
  private readonly GEOCODE_PROXY_AFRICA = '/resolve/api/africa';       // Proxied to http://localhost:8082
  private readonly COORDINATE_CACHE_KEY = 'marker-coordinates';
  private readonly CACHE_EXPIRY = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

  constructor(private http: HttpClient) {}

  /**
   * Determines the region (australia/africa) for a given marker based on its country.
   * @param marker The marker object.
   * @returns 'australia', 'africa', or null if region cannot be determined.
   */
  determineRegion(marker: MapMarkerI): 'australia' | 'africa' | null {
    if (marker.country) {
      const countryLower = marker.country.toLowerCase();
      if (['australia', 'new zealand'].includes(countryLower)) {
        return 'australia';
      } else if (['nigeria', 'kenya', 'south africa', 'egypt', 'ghana', 'morocco', 'uganda', 'zambia', 'zimbabwe', 'tanzania', 'ethiopia', 'mali', 'senegal', 'ivory coast', 'cameroon', 'cape verde', 'comoros', 'djibouti', 'equatorial guinea', 'eritrea', 'eswatini', 'gabon', 'gambia', 'guinea', 'guinea-bissau', 'lesotho', 'liberia', 'libya', 'madagascar', 'malawi', 'mali', 'mauritania', 'mauritius', 'morocco', 'mozambique', 'namibia', 'niger', 'nigeria', 'rwanda', 'sao tome and principe', 'senegal', 'seychelles', 'sierra leone', 'somalia', 'south africa', 'south sudan', 'sudan', 'tanzania', 'togo', 'tunisia', 'uganda', 'zambia', 'zimbabwe'].includes(countryLower)) {
        return 'africa';
      }
    }
    return null;
  }

  /**
   * Builds a query string from the address components of a marker.
   * @param marker The marker object.
   * @returns The query string for geocoding.
   */
  buildGeocodeQuery(marker: MapMarkerI): string {
    const components: string[] = [];
    if (marker.addr_street) {
      components.push(marker.addr_street.trim());
    }
    if (marker.addr_city) {
      components.push(marker.addr_city.trim());
    }
    if (marker.addr_province) {
      components.push(marker.addr_province.trim());
    }
    if (marker.country) {
      components.push(marker.country.trim());
    }
    const fullAddress = components.join(' ').replace(/\s+/g, ' ').trim();

    if (components.length === 1 && marker.country && marker.addr_city) {
      return `${marker.addr_city.trim()}, ${marker.country.trim()}`;
    }
    return fullAddress;
  }

  /**
   * Attempts to get coordinates for a marker using the specified regional Photon proxy.
   * Handles caching.
   * @param marker The marker object needing coordinates.
   * @param region The region ('australia' or 'africa') to determine the proxy URL.
   * @returns A promise resolving to {lat, lng} or null.
   */
  async geocodeMarker(marker: MapMarkerI, region: 'australia' | 'africa'): Promise<{ lat: number; lng: number } | null> {
    const proxyUrl = region === 'australia' ? this.GEOCODE_PROXY_AUSTRALIA : this.GEOCODE_PROXY_AFRICA;
    console.debug(`GeocodingService: Using proxy URL for region ${region}: ${proxyUrl}`); // Debug log

    // Check cache first (if marker has id)
    if (marker.id) {
      const cached = this.getCachedCoordinates(marker.id);
      if (cached) {
        console.debug(`GeocodingService: Using cached coordinates for marker ${marker.id}`);
        return cached;
      }
    }

    if ((!marker.lat || !marker.lng) && (marker.addr_city || marker.addr_street)) {
      const queryString = this.buildGeocodeQuery(marker); // Define queryString inside the scope where it's used
      if (!queryString) {
        console.warn(`GeocodingService: No valid address components found for marker ${marker.name || marker.id}, skipping geocoding.`);
        return null; // No query string means no address to geocode
      }

      try {
        const q = encodeURIComponent(queryString);
        console.debug(`GeocodingService: Attempting geocoding for query: "${queryString}" in region: "${region}"`);
        const fullGeocodeUrl = `${proxyUrl}?q=${q}&limit=1`;
        console.debug(`GeocodingService: Requesting geocoding from: ${fullGeocodeUrl}`); // Debug log
        const res: any = await firstValueFrom(
          this.http.get(fullGeocodeUrl) // Use the full constructed URL
        );

        if (res?.features?.length > 0) {
          const [lng, lat] = res.features[0].geometry.coordinates;
          console.debug(`GeocodingService: Geocoding successful for "${queryString}", found: [${lat}, ${lng}]`);

          // Cache the coordinates (if marker has id)
          if (marker.id) {
            this.cacheCoordinates(marker.id, lat, lng);
          }

          return { lat, lng };
        } else {
          console.warn(`GeocodingService: Geocoding returned no results for query: "${queryString}" in region: "${region}"`);
        }
      } catch (e) {
        console.error(`GeocodingService: Geocoding failed for query "${queryString}" in region "${region}":`, e);
        // Silent fail for speed, but log error
      }
    } else {
      // Log if coordinates already exist or if no address is available for geocoding
      if (marker.lat && marker.lng) {
        console.debug(`GeocodingService: Coordinates already present for marker ${marker.name || marker.id}, skipping geocoding.`);
      } else {
        console.warn(`GeocodingService: No coordinates or address available for marker ${marker.name || marker.id}, skipping geocoding.`);
      }
    }

    return null; // Return null if geocoding wasn't attempted or failed
  }

  private getCachedCoordinates(markerId: string): { lat: number; lng: number } | null {
    try {
      const cache = JSON.parse(localStorage.getItem(this.COORDINATE_CACHE_KEY) || '{}');
      const cached = cache[markerId];

      if (cached && (Date.now() - cached.timestamp) < this.CACHE_EXPIRY) {
        console.debug(`GeocodingService: Cache hit for marker ${markerId}`);
        return { lat: cached.lat, lng: cached.lng };
      } else if (cached) {
        console.debug(`GeocodingService: Cache expired for marker ${markerId}`);
      }
    } catch (e) {
      console.error("GeocodingService: Error reading from coordinate cache:", e);
      // Silent fail, proceed without cache
    }
    return null;
  }

  private cacheCoordinates(markerId: string, lat: number, lng: number): void {
    try {
      const cache = JSON.parse(localStorage.getItem(this.COORDINATE_CACHE_KEY) || '{}');
      cache[markerId] = { lat, lng, timestamp: Date.now() };
      localStorage.setItem(this.COORDINATE_CACHE_KEY, JSON.stringify(cache));
      console.debug(`GeocodingService: Cached coordinates for marker ${markerId}: [${lat}, ${lng}]`);
    } catch (e) {
      console.error("GeocodingService: Error writing to coordinate cache:", e);
      // Silent fail
    }
  }
}