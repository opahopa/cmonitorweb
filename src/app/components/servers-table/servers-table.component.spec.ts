
import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServersTableComponent } from './servers-table.component';

describe('ServersTableComponent', () => {
  let component: ServersTableComponent;
  let fixture: ComponentFixture<ServersTableComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ServersTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServersTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
