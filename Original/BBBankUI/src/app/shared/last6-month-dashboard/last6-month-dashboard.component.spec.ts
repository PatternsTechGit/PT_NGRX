import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Last6MonthDashboardComponent } from './last6-month-dashboard.component';

describe('Last6MonthDashboardComponent', () => {
  let component: Last6MonthDashboardComponent;
  let fixture: ComponentFixture<Last6MonthDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Last6MonthDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Last6MonthDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
