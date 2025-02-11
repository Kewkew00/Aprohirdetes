import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HirdetesComponent } from './hirdetes.component';

describe('HirdetesComponent', () => {
  let component: HirdetesComponent;
  let fixture: ComponentFixture<HirdetesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HirdetesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HirdetesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
