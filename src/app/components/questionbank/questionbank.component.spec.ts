import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionbankComponent } from './questionbank.component';

describe('QuestionbankComponent', () => {
  let component: QuestionbankComponent;
  let fixture: ComponentFixture<QuestionbankComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QuestionbankComponent]
    });
    fixture = TestBed.createComponent(QuestionbankComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
