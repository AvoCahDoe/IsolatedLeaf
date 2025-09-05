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
  { id: '21', name: 'Omar El Idrissi', country: 'Morocco', label: 'Client', addr_city: 'Ouarzazate', addr_street: 'Avenue des Kasbahs 11' },


  // a bunch of data with no coordinates u can test them 
// { id: '22', name: 'MedTech Solutions', country: 'Germany', label: 'Supplier', addr_city: 'Berlin', addr_province: 'Berlin', addr_street: 'Alexanderplatz 5' },
// { id: '23', name: 'Salma Benkirane', country: 'Morocco', label: 'Client', addr_city: 'Chefchaouen', addr_street: 'Rue des Remparts 8' },
// { id: '24', name: 'Hamburg Robotics', country: 'Germany', label: 'Supplier', addr_city: 'Hamburg', addr_street: 'Industriestraße 102' },
// { id: '25', name: 'Imane Lahlou', country: 'Morocco', label: 'Client', addr_city: 'Meknes', addr_street: 'Avenue Moulay Ismail 44' },
// { id: '26', name: 'Bavaria Auto Parts', country: 'Germany', label: 'Supplier', addr_city: 'Munich', addr_province: 'Bavaria', addr_street: 'Motorstraße 12' },
// { id: '27', name: 'Youssef El Amrani', country: 'Morocco', label: 'Client', addr_city: 'El Jadida', addr_street: 'Rue de la Plage 23' },
// { id: '28', name: 'Saxon Software GmbH', country: 'Germany', label: 'Supplier', addr_city: 'Dresden', addr_province: 'Saxony', addr_street: 'Softwareweg 7' },
// { id: '29', name: 'Hind Ouarzazi', country: 'Morocco', label: 'Client', addr_city: 'Tetouan', addr_street: 'Avenue des Fleurs 19' },
// { id: '30', name: 'North Rhine Plastics', country: 'Germany', label: 'Supplier', addr_city: 'Düsseldorf', addr_province: 'North Rhine-Westphalia', addr_street: 'Kunststoffstraße 56' },
// { id: '31', name: 'Abdellah Tazi', country: 'Morocco', label: 'Client', addr_city: 'Safi', addr_street: 'Boulevard Hassan II 101' },
// { id: '32', name: 'Frankfurt Electronics', country: 'Germany', label: 'Supplier', addr_city: 'Frankfurt', addr_province: 'Hesse', addr_street: 'Elektrostraße 88' },
// { id: '33', name: 'Kenza Rifi', country: 'Morocco', label: 'Client', addr_city: 'Taza', addr_street: 'Rue de la Médina 14' },
// { id: '34', name: 'Cologne Chemicals', country: 'Germany', label: 'Supplier', addr_city: 'Cologne', addr_province: 'North Rhine-Westphalia', addr_street: 'Chemiepark 22' },
// { id: '35', name: 'Othman Souiri', country: 'Morocco', label: 'Client', addr_city: 'Nador', addr_street: 'Avenue Hassan II 37' },
// { id: '36', name: 'Bremen Shipyards', country: 'Germany', label: 'Supplier', addr_city: 'Bremen', addr_street: 'Hafenstraße 3' },
// { id: '37', name: 'Hajar El Amrani', country: 'Morocco', label: 'Client', addr_city: 'El Hoceima', addr_street: 'Boulevard Mohammed V 25' },
// { id: '38', name: 'Leipzig Textiles', country: 'Germany', label: 'Supplier', addr_city: 'Leipzig', addr_province: 'Saxony', addr_street: 'Textilstraße 11' },
// { id: '39', name: 'Rachid Chraibi', country: 'Morocco', label: 'Client', addr_city: 'Tanger', addr_street: 'Rue de la Kasbah 9' },
// { id: '40', name: 'Munich Precision Tools', country: 'Germany', label: 'Supplier', addr_city: 'Munich', addr_province: 'Bavaria', addr_street: 'Werkzeugweg 18' },
// { id: '41', name: 'Meryem El Fihri', country: 'Morocco', label: 'Client', addr_city: 'Oujda', addr_street: 'Avenue des Fleurs 14' },
// { id: '42', name: 'Stuttgart Automatics', country: 'Germany', label: 'Supplier', addr_city: 'Stuttgart', addr_province: 'Baden-Württemberg', addr_street: 'Automatisierungsweg 21' },
// { id: '43', name: 'Anas Bouziane', country: 'Morocco', label: 'Client', addr_city: 'Larache', addr_street: 'Rue du Port 7' },
// { id: '44', name: 'Dresden Optics', country: 'Germany', label: 'Supplier', addr_city: 'Dresden', addr_province: 'Saxony', addr_street: 'Optikstraße 33' },
// { id: '45', name: 'Sofia Lahbil', country: 'Morocco', label: 'Client', addr_city: 'Beni Mellal', addr_street: 'Avenue Hassan II 56' },
// { id: '46', name: 'Hamburg Energy Solutions', country: 'Germany', label: 'Supplier', addr_city: 'Hamburg', addr_street: 'Energieweg 12' },
// { id: '47', name: 'Rachida El Yamani', country: 'Morocco', label: 'Client', addr_city: 'Kenitra', addr_street: 'Boulevard Mohamed V 23' },
// { id: '48', name: 'Frankfurt Robotics GmbH', country: 'Germany', label: 'Supplier', addr_city: 'Frankfurt', addr_province: 'Hesse', addr_street: 'Robotikstraße 45' },
// { id: '49', name: 'Hicham Belkacem', country: 'Morocco', label: 'Client', addr_city: 'Sidi Kacem', addr_street: 'Rue du Marché 10' },
// { id: '50', name: 'Berlin Manufacturing', country: 'Germany', label: 'Supplier', addr_city: 'Berlin', addr_province: 'Berlin', addr_street: 'Industrieweg 77' },
// { id: '51', name: 'Nadia Chouaibi', country: 'Morocco', label: 'Client', addr_city: 'Ifrane', addr_street: 'Rue des Cèdres 5' },
// { id: '52', name: 'Leipzig Metalworks', country: 'Germany', label: 'Supplier', addr_city: 'Leipzig', addr_province: 'Saxony', addr_street: 'Metallstraße 19' },
// { id: '53', name: 'Ayoub El Khatib', country: 'Morocco', label: 'Client', addr_city: 'Tiznit', addr_street: 'Avenue des Palmiers 12' },
// { id: '54', name: 'Cologne Packaging GmbH', country: 'Germany', label: 'Supplier', addr_city: 'Cologne', addr_province: 'North Rhine-Westphalia', addr_street: 'Verpackungsweg 88' },
// { id: '55', name: 'Sara El Fadil', country: 'Morocco', label: 'Client', addr_city: 'Ksar El Kebir', addr_street: 'Boulevard Mohammed V 31' },
// { id: '56', name: 'Munich Textile Works', country: 'Germany', label: 'Supplier', addr_city: 'Munich', addr_province: 'Bavaria', addr_street: 'Textilweg 67' },
// { id: '57', name: 'Youssef Amrani', country: 'Morocco', label: 'Client', addr_city: 'Settat', addr_street: 'Rue de l’Industrie 18' },
// { id: '58', name: 'Bremen Automation', country: 'Germany', label: 'Supplier', addr_city: 'Bremen', addr_street: 'Automatisierungsweg 44' },
// { id: '59', name: 'Imane Bennis', country: 'Morocco', label: 'Client', addr_city: 'Berrechid', addr_street: 'Avenue Hassan II 29' },
// { id: '60', name: 'Nuremberg Electronics', country: 'Germany', label: 'Supplier', addr_city: 'Nuremberg', addr_province: 'Bavaria', addr_street: 'Elektronikstraße 15' },



];



}
