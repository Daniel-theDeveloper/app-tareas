import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Tap4Page } from './tap4.page';

describe('Tap4Page', () => {
  let component: Tap4Page;
  let fixture: ComponentFixture<Tap4Page>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(Tap4Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
