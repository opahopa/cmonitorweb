import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WsStatusComponent } from './ws-status.component';

describe('WsStatusComponent', () => {
  let component: WsStatusComponent;
  let fixture: ComponentFixture<WsStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WsStatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WsStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
