import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MapComponent } from './map.component/map.component';

import { Marker } from './core/models/Marker.interface';

@Component({
  selector: 'app-root',
  
  imports: [RouterOutlet,MapComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('leaf');

markersArray: Marker[] = [
  { id: '1', name: 'Mohammed Benali', lat: 33.5731, lng: -7.5898, country: 'Morocco', label: 'Client', addr_city: 'Casablanca', addr_street: '123 Avenue Mohammed V' },
  { id: '2', name: 'Klaus Mueller GmbH', country: 'Germany', label: 'Supplier', addr_city: 'Munich', addr_province: 'Bavaria', addr_street: 'Bayerstraße 45' },
  { id: '3', name: 'Fatima Zahra Trading', lat: 34.0209, lng: -6.8416, country: 'Morocco', label: 'Client', addr_city: 'Rabat', addr_street: 'Rue Ibn Batouta 12' },
  { id: '4', name: 'Bayerische Maschinen', country: 'Germany', label: 'Supplier', addr_city: 'Stuttgart', addr_province: 'Baden-Württemberg', addr_street: 'Industriestraße 89' },
  { id: '5', name: 'Ahmed El Mansouri', lat: 31.6340, lng: -7.9999, country: 'Morocco', label: 'Client', addr_city: 'Marrakech', addr_street: 'Jemaa el-Fnaa 56' },
  { id: '6', name: 'Hansa Textiles AG', country: 'Germany', label: 'Supplier', addr_city: 'Hamburg', addr_street: 'Hafenstraße 234' },
  { id: '7', name: 'Youssef Chraibi', lat: 34.0331, lng: -5.0003, country: 'Morocco', label: 'Client', addr_city: 'Fes', addr_street: 'Rue Talaa 78' },
  { id: '8', name: 'Bavarian Electronics', country: 'Germany', label: 'Supplier', addr_city: 'Nuremberg', addr_province: 'Bavaria', addr_street: 'Elektronikallee 12' },
  { id: '9', name: 'Amina El Fassi', lat: 34.0171, lng: -6.8345, country: 'Morocco', label: 'Client', addr_city: 'Salé', addr_street: 'Avenue Hassan II 34' },
  { id: '10', name: 'Deutsche Chemie GmbH', country: 'Germany', label: 'Supplier', addr_city: 'Cologne', addr_province: 'North Rhine-Westphalia', addr_street: 'Chemieweg 67' },
  { id: '11', name: 'Karim Ouazzani', lat: 35.7673, lng: -5.8003, country: 'Morocco', label: 'Client', addr_city: 'Tangier', addr_street: 'Boulevard Pasteur 89' },
  { id: '12', name: 'Ruhr Valley Steel', country: 'Germany', label: 'Supplier', addr_city: 'Essen', addr_province: 'North Rhine-Westphalia', addr_street: 'Stahlstraße 156' },
  { id: '13', name: 'Nadia Amrani', lat: 30.4202, lng: -9.5981, country: 'Morocco', label: 'Client', addr_city: 'Agadir', addr_street: 'Avenue du Soleil 23' },
  { id: '14', name: 'Saxon Precision Tools', country: 'Germany', label: 'Supplier', addr_city: 'Dresden', addr_province: 'Saxony', addr_street: 'Werkzeugstraße 45' },
  { id: '15', name: 'Hassan El Khadir', lat: 35.1703, lng: -2.9394, country: 'Morocco', label: 'Client', addr_city: 'Nador', addr_street: 'Rue Mohammed V 67' },
  { id: '16', name: 'Franconian Wood Products', country: 'Germany', label: 'Supplier', addr_city: 'Würzburg', addr_province: 'Bavaria', addr_street: 'Forststraße 78' },
  { id: '17', name: 'Samira Alaoui', lat: 32.2998, lng: -9.2371, country: 'Morocco', label: 'Client', addr_city: 'Essaouira', addr_street: 'Rue de la Corniche 45' },
  { id: '18', name: 'Hannoverian Machinery', country: 'Germany', label: 'Supplier', addr_city: 'Hanover', addr_province: 'Lower Saxony', addr_street: 'Maschinenweg 34' },
  { id: '19', name: 'Mustapha Jilali', lat: 35.2629, lng: -6.5688, country: 'Morocco', label: 'Client', addr_city: 'Tetouan', addr_street: 'Avenue Mohammed VI 12' },
  { id: '20', name: 'Black Forest Timber', country: 'Germany', label: 'Supplier', addr_city: 'Freiburg', addr_province: 'Baden-Württemberg', addr_street: 'Waldweg 89' },

];



}
