import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetailsTaskPage } from './details-task.page';

describe('DetailsTaskPage', () => {
  let component: DetailsTaskPage;
  let fixture: ComponentFixture<DetailsTaskPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(DetailsTaskPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
