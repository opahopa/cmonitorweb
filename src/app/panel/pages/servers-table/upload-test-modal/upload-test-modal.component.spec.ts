import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadTestModalComponent } from './upload-test-modal.component';

describe('UploadTestModalComponent', () => {
  let component: UploadTestModalComponent;
  let fixture: ComponentFixture<UploadTestModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadTestModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadTestModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
