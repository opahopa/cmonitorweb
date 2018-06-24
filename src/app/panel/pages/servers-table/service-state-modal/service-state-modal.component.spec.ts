import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceStateModalComponent } from './service-state-modal.component';

describe('ServiceStateModalComponent', () => {
  let component: ServiceStateModalComponent;
  let fixture: ComponentFixture<ServiceStateModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServiceStateModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceStateModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
