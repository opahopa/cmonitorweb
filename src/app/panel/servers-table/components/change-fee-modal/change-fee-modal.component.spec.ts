import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeFeeModalComponent } from './change-fee-modal.component';

describe('ChangeFeeModalComponent', () => {
  let component: ChangeFeeModalComponent;
  let fixture: ComponentFixture<ChangeFeeModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangeFeeModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeFeeModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
