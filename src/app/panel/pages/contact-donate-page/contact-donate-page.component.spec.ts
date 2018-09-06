import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactDonatePageComponent } from './contact-donate-page.component';

describe('ContactDonatePageComponent', () => {
  let component: ContactDonatePageComponent;
  let fixture: ComponentFixture<ContactDonatePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContactDonatePageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactDonatePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
