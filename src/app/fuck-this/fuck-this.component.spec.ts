import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FuckThisComponent } from './fuck-this.component';

describe('FuckThisComponent', () => {
  let component: FuckThisComponent;
  let fixture: ComponentFixture<FuckThisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FuckThisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FuckThisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
