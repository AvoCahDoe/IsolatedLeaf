export interface MapMarkerI {
  id?: string;
  name: string;
  lat?: number;
  lng?: number;
  country: string;
  label: string; 
  addr_street?: string;
  addr_city: string;
  addr_province?: string;
}
