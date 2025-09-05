import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CmnMapComponent } from './map.component';

describe('CmnMapComponent', () => {
  let component: CmnMapComponent;
  let fixture: ComponentFixture<CmnMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CmnMapComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CmnMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
