import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GDBoardComponent } from './gd-board.component';

describe('GDBoardComponent', () => {
  let component: GDBoardComponent;
  let fixture: ComponentFixture<GDBoardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GDBoardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GDBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
