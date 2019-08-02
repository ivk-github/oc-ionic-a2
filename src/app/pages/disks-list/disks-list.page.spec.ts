import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisksListPage } from './disks-list.page';

describe('DisksListPage', () => {
  let component: DisksListPage;
  let fixture: ComponentFixture<DisksListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisksListPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisksListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
