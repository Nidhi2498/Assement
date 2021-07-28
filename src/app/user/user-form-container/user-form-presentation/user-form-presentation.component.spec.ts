import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserFormPresentationComponent } from './user-form-presentation.component';

describe('UserFormPresentationComponent', () => {
  let component: UserFormPresentationComponent;
  let fixture: ComponentFixture<UserFormPresentationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserFormPresentationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserFormPresentationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
