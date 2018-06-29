import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServerCodiusInfoComponent } from './server-codius-info.component';

describe('ServerCodiusInfoComponent', () => {
  let component: ServerCodiusInfoComponent;
  let fixture: ComponentFixture<ServerCodiusInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServerCodiusInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServerCodiusInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
