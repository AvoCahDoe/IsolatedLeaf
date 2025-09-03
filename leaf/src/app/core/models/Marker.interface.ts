export interface Marker {
  id?: string;
  name: string;
  lat?: number;
  lng?: number;
  country: string;
  label: string; // e.g., Client, Supplier, etc.
  addr_street?: string;
  addr_city: string;
  addr_province?: string;
}
