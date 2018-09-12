import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExtraServiceMenuComponent } from './extra-service-menu.component';

describe('ExtraServiceMenuComponent', () => {
  let component: ExtraServiceMenuComponent;
  let fixture: ComponentFixture<ExtraServiceMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExtraServiceMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExtraServiceMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
