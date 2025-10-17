import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CmnMapComponent } from './map.component/map.component';

import { MapMarkerI } from './core/model/Data/Marker.interface';
@Component({
  selector: 'app-root',
  
  imports: [CmnMapComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('leaf');

markersArray: MapMarkerI[] =[
  { id: '1', name: 'Casablanca Import & Export', country: 'Morocco', label: 'Client', addr_city: 'Casablanca', addr_street: 'Avenue Hassan II 45' },
  { id: '2', name: 'Atlas Logistics SARL', country: 'Morocco', label: 'Client', addr_city: 'Marrakesh', addr_street: 'Rue Ibn Sina 17' },
  { id: '3', name: 'Sahara Foods', country: 'Morocco', label: 'Client', addr_city: 'Agadir', addr_street: 'Boulevard Mohammed V 88' },
  { id: '4', name: 'Rabat Consulting Group', country: 'Morocco', label: 'Client', addr_city: 'Rabat', addr_street: 'Avenue Fal Ould Oumeir 23' },
  { id: '5', name: 'Fes Textiles', country: 'Morocco', label: 'Client', addr_city: 'Fes', addr_street: 'Rue Talaa Kebira 9' },
  { id: '6', name: 'Tangier Marine Supplies', country: 'Morocco', label: 'Client', addr_city: 'Tangier', addr_street: 'Boulevard des FAR 32' },
  { id: '7', name: 'Ouarzazate Energy Co', country: 'Morocco', label: 'Client', addr_city: 'Ouarzazate', addr_street: 'Avenue Mohammed VI 11' },
  { id: '8', name: 'Chefchaouen Artisans', country: 'Morocco', label: 'Client', addr_city: 'Chefchaouen', addr_street: 'Rue Hassan I 5' },
  { id: '9', name: 'Errachidia Mining', country: 'Morocco', label: 'Client', addr_city: 'Errachidia', addr_street: 'Avenue Moulay Ali Cherif 16' },
  { id: '10', name: 'Meknes AgroTech', country: 'Morocco', label: 'Client', addr_city: 'Meknes', addr_street: 'Boulevard Mohammed V 73' },
  { id: '11', name: 'Oujda Commerce', country: 'Morocco', label: 'Client', addr_city: 'Oujda', addr_street: 'Avenue Al Massira 41' },
  { id: '12', name: 'Nador Transport', country: 'Morocco', label: 'Client', addr_city: 'Nador', addr_street: 'Rue Taouima 22' },
  { id: '13', name: 'Kenitra Industries', country: 'Morocco', label: 'Client', addr_city: 'Kenitra', addr_street: 'Rue Marrakech 8' },
  { id: '14', name: 'El Jadida Seafood', country: 'Morocco', label: 'Client', addr_city: 'El Jadida', addr_street: 'Rue Sidi Bouzid 6' },
  { id: '15', name: 'Taza Engineering', country: 'Morocco', label: 'Client', addr_city: 'Taza', addr_street: 'Boulevard Hassan II 15' },
  { id: '16', name: 'Settat Construction', country: 'Morocco', label: 'Client', addr_city: 'Settat', addr_street: 'Rue Al Maghrib Al Arabi 12' },
  { id: '17', name: 'Larache Logistics', country: 'Morocco', label: 'Client', addr_city: 'Larache', addr_street: 'Avenue Youssef Ibn Tachfine 19' },
  { id: '18', name: 'Essaouira Marine Works', country: 'Morocco', label: 'Client', addr_city: 'Essaouira', addr_street: 'Rue Skala 3' },
  { id: '19', name: 'Beni Mellal Farming', country: 'Morocco', label: 'Client', addr_city: 'Beni Mellal', addr_street: 'Boulevard Mohammed V 56' },
  { id: '20', name: 'Tiznit Crafts', country: 'Morocco', label: 'Client', addr_city: 'Tiznit', addr_street: 'Rue Al Massira 24' },
  { id: '21', name: 'Ksar El Kebir Traders', country: 'Morocco', label: 'Client', addr_city: 'Ksar El Kebir', addr_street: 'Rue Omar Ibn Khattab 10' },
  { id: '22', name: 'Guelmim Solar Group', country: 'Morocco', label: 'Client', addr_city: 'Guelmim', addr_street: 'Avenue Al Massira 18' },
  { id: '23', name: 'Midelt Minerals', country: 'Morocco', label: 'Client', addr_city: 'Midelt', addr_street: 'Rue Moulay Rachid 9' },
  { id: '24', name: 'Tinghir Tourism Services', country: 'Morocco', label: 'Client', addr_city: 'Tinghir', addr_street: 'Avenue des FAR 7' },
  { id: '25', name: 'Safi Ceramics', country: 'Morocco', label: 'Client', addr_city: 'Safi', addr_street: 'Rue Sidi Abderrahman 21' },
  { id: '26', name: 'Taourirt Trading Co', country: 'Morocco', label: 'Client', addr_city: 'Taourirt', addr_street: 'Rue Moulay Ismail 4' },
  { id: '27', name: 'Tiflet Distribution', country: 'Morocco', label: 'Client', addr_city: 'Tiflet', addr_street: 'Avenue Al Massira 14' },
  { id: '28', name: 'Azrou Forestry Ltd', country: 'Morocco', label: 'Client', addr_city: 'Azrou', addr_street: 'Rue Al Wahda 11' },
  { id: '29', name: 'Khouribga Phosphates', country: 'Morocco', label: 'Client', addr_city: 'Khouribga', addr_street: 'Boulevard Hassan II 38' },
  { id: '30', name: 'Tan-Tan Logistics', country: 'Morocco', label: 'Client', addr_city: 'Tan-Tan', addr_street: 'Avenue Mohammed V 5' }
]
;
}
