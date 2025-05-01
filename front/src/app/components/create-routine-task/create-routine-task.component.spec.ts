import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateRoutineTaskComponent } from './create-routine-task.component';

describe('CreateRoutineTaskComponent', () => {
  let component: CreateRoutineTaskComponent;
  let fixture: ComponentFixture<CreateRoutineTaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateRoutineTaskComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateRoutineTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
