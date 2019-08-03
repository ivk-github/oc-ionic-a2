import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LendDiskPage } from './lend-disk.page';

describe('LendDiskPage', () => {
  let component: LendDiskPage;
  let fixture: ComponentFixture<LendDiskPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LendDiskPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LendDiskPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
