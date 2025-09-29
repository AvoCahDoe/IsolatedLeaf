import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CmnMapComponent } from './map.component/map.component';

import { MapMarkerI } from './core/model/Data/Marker.interface';
@Component({
  selector: 'app-root',
  
  imports: [RouterOutlet,CmnMapComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('leaf');

markersArray: MapMarkerI[] = [
  // Mixed Africa and Australia businesses (1-50)
  { id: '1', name: 'Nairobi Trading Co', country: 'Kenya', label: 'Client', addr_city: 'Nairobi', addr_street: 'Moi Avenue 123' },
  { id: '2', name: 'Sydney Harbour Logistics', country: 'Australia', label: 'Supplier', addr_city: 'Sydney', addr_street: 'Circular Quay 456' },
  { id: '3', name: 'Cairo Manufacturing Ltd', country: 'Egypt', label: 'Client', addr_city: 'Cairo', addr_street: 'Tahrir Square 789' },
  { id: '4', name: 'Melbourne Tech Industries', country: 'Australia', label: 'Supplier', addr_city: 'Melbourne', addr_street: 'Flinders Street 101' },
  { id: '5', name: 'Lagos Agricultural Solutions', country: 'Nigeria', label: 'Client', addr_city: 'Lagos', addr_street: 'Ikoyi Road 222' },
  { id: '6', name: 'Perth Mining Equipment', country: 'Australia', label: 'Supplier', addr_city: 'Perth', addr_street: 'St Georges Terrace 333' },
  { id: '7', name: 'Cape Town Tourism Services', country: 'South Africa', label: 'Client', addr_city: 'Cape Town', addr_street: 'Long Street 444' },
  { id: '8', name: 'Brisbane Construction Materials', country: 'Australia', label: 'Supplier', addr_city: 'Brisbane', addr_street: 'Queen Street 555' },
  { id: '9', name: 'Addis Ababa Textiles', country: 'Ethiopia', label: 'Client', addr_city: 'Addis Ababa', addr_street: 'Bole Road 666' },
  { id: '10', name: 'Adelaide Food Processing', country: 'Australia', label: 'Supplier', addr_city: 'Adelaide', addr_street: 'Rundle Street 777' },
  { id: '11', name: 'Casablanca Electronics', country: 'Morocco', label: 'Client', addr_city: 'Casablanca', addr_street: 'Anfa Boulevard 888' },
  { id: '12', name: 'Hobart Maritime Services', country: 'Australia', label: 'Supplier', addr_city: 'Hobart', addr_street: 'Salamanca Place 999' },
  { id: '13', name: 'Accra Renewable Energy', country: 'Ghana', label: 'Client', addr_city: 'Accra', addr_street: 'Independence Avenue 111' },
  { id: '14', name: 'Darwin Aviation Parts', country: 'Australia', label: 'Supplier', addr_city: 'Darwin', addr_street: 'Mitchell Street 222' },
  { id: '15', name: 'Algiers Chemicals', country: 'Algeria', label: 'Client', addr_city: 'Algiers', addr_street: 'Rue Didouche Mourad 333' },
  { id: '16', name: 'Canberra Government Services', country: 'Australia', label: 'Supplier', addr_city: 'Canberra', addr_street: 'Flinders Way 444' },
  { id: '17', name: 'Khartoum Agriculture', country: 'Sudan', label: 'Client', addr_city: 'Khartoum', addr_street: 'Nile Street 555' },
  { id: '18', name: 'Gold Coast Tourism', country: 'Australia', label: 'Supplier', addr_city: 'Gold Coast', addr_street: 'Surfers Paradise 666' },
  { id: '19', name: 'Tunis IT Solutions', country: 'Tunisia', label: 'Client', addr_city: 'Tunis', addr_street: 'Avenue Habib Bourguiba 777' },
  { id: '20', name: 'Newcastle Steel Works', country: 'Australia', label: 'Supplier', addr_city: 'Newcastle', addr_street: 'Hunter Street 888' },
  { id: '21', name: 'Lusaka Mining Corp', country: 'Zambia', label: 'Client', addr_city: 'Lusaka', addr_street: 'Kabulonga Road 999' },
  { id: '22', name: 'Wollongong Manufacturing', country: 'Australia', label: 'Supplier', addr_city: 'Wollongong', addr_street: 'Burelli Street 111' },
  { id: '23', name: 'Harare Financial Services', country: 'Zimbabwe', label: 'Client', addr_city: 'Harare', addr_street: 'Samora Machel Avenue 222' },
  { id: '24', name: 'Geelong Automotive', country: 'Australia', label: 'Supplier', addr_city: 'Geelong', addr_street: 'Little Malop Street 333' },
  { id: '25', name: 'Kampala Telecommunications', country: 'Uganda', label: 'Client', addr_city: 'Kampala', addr_street: 'Kampala Road 444' },
  { id: '26', name: 'Toowoomba Agriculture', country: 'Australia', label: 'Supplier', addr_city: 'Toowoomba', addr_street: 'Drayton Street 555' },
  { id: '27', name: 'Dakar Shipping', country: 'Senegal', label: 'Client', addr_city: 'Dakar', addr_street: 'Avenue Léopold Sédar Senghor 666' },
  { id: '28', name: 'Cairns Marine Services', country: 'Australia', label: 'Supplier', addr_city: 'Cairns', addr_street: 'The Esplanade 777' },
  { id: '29', name: 'Kigali Tech Hub', country: 'Rwanda', label: 'Client', addr_city: 'Kigali', addr_street: 'KN 1 Avenue 888' },
  { id: '30', name: 'Albury Transport', country: 'Australia', label: 'Supplier', addr_city: 'Albury', addr_street: 'Dean Street 999' },
  { id: '31', name: 'Maputo Construction', country: 'Mozambique', label: 'Client', addr_city: 'Maputo', addr_street: 'Avenida Julius Nyerere 111' },
  { id: '32', name: 'Ballarat Mining Equipment', country: 'Australia', label: 'Supplier', addr_city: 'Ballarat', addr_street: 'Sturt Street 222' },
  { id: '33', name: 'Antananarivo Textiles', country: 'Madagascar', label: 'Client', addr_city: 'Antananarivo', addr_street: 'Andohalo Road 333' },
  { id: '34', name: 'Bendigo Banking Services', country: 'Australia', label: 'Supplier', addr_city: 'Bendigo', addr_street: 'Lyons Street 444' },
  { id: '35', name: 'Conakry Port Services', country: 'Guinea', label: 'Client', addr_city: 'Conakry', addr_street: 'Rue Koloma 555' },
  { id: '36', name: 'Townsville Energy', country: 'Australia', label: 'Supplier', addr_city: 'Townsville', addr_street: 'Flinders Street 666' },
  { id: '37', name: 'Lome Import Export', country: 'Togo', label: 'Client', addr_city: 'Lomé', addr_street: 'Rue des Martyrs 777' },
  { id: '38', name: 'Launceston Food Processing', country: 'Australia', label: 'Supplier', addr_city: 'Launceston', addr_street: 'Elizabeth Street 888' },
  { id: '39', name: 'Abidjan Cocoa Trading', country: 'Ivory Coast', label: 'Client', addr_city: 'Abidjan', addr_street: 'Plateau District 999' },
  { id: '40', name: 'Mackay Sugar Refinery', country: 'Australia', label: 'Supplier', addr_city: 'Mackay', addr_street: 'River Street 111' },
  { id: '41', name: 'Porto-Novo Textiles', country: 'Benin', label: 'Client', addr_city: 'Porto-Novo', addr_street: 'Rue de la République 222' },
  { id: '42', name: 'Rockhampton Agricultural', country: 'Australia', label: 'Supplier', addr_city: 'Rockhampton', addr_street: 'East Street 333' },
  { id: '43', name: 'Banjul Fisheries', country: 'Gambia', label: 'Client', addr_city: 'Banjul', addr_street: 'Kairaba Avenue 444' },
  { id: '44', name: 'Sunshine Coast Tourism', country: 'Australia', label: 'Supplier', addr_city: 'Sunshine Coast', addr_street: 'David Low Way 555' },
  { id: '45', name: 'Freetown Mining', country: 'Sierra Leone', label: 'Client', addr_city: 'Freetown', addr_street: 'Wilberforce Road 666' },
  { id: '46', name: 'Tamworth Agricultural', country: 'Australia', label: 'Supplier', addr_city: 'Tamworth', addr_street: 'Bridge Street 777' },
  { id: '47', name: 'Bissau Fisheries', country: 'Guinea-Bissau', label: 'Client', addr_city: 'Bissau', addr_street: 'Avenida Amílcar Cabral 888' },
  { id: '48', name: 'Orange Wine Production', country: 'Australia', label: 'Supplier', addr_city: 'Orange', addr_street: 'Byng Street 999' },
  { id: '49', name: 'Djibouti Logistics', country: 'Djibouti', label: 'Client', addr_city: 'Djibouti', addr_street: 'Rue du Prince 111' },
  { id: '50', name: 'Wagga Wagga Manufacturing', country: 'Australia', label: 'Supplier', addr_city: 'Wagga Wagga', addr_street: 'Moama Street 222' }
];
}
