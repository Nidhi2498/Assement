import { TestBed } from '@angular/core/testing';

import { UserFormPresenterService } from './user-form-presenter.service';

describe('UserFormPresenterService', () => {
  let service: UserFormPresenterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserFormPresenterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
