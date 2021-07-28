import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserListPresentationComponent } from './user-list-presentation.component';

describe('UserListPresentationComponent', () => {
  let component: UserListPresentationComponent;
  let fixture: ComponentFixture<UserListPresentationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserListPresentationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserListPresentationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
