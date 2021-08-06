import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DobexampleComponent } from './dobexample.component';

describe('DobexampleComponent', () => {
  let component: DobexampleComponent;
  let fixture: ComponentFixture<DobexampleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DobexampleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DobexampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
