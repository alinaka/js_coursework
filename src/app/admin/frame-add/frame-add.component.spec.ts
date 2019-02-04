import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FrameAddComponent } from './frame-add.component';

describe('FrameAddComponent', () => {
  let component: FrameAddComponent;
  let fixture: ComponentFixture<FrameAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FrameAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FrameAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
