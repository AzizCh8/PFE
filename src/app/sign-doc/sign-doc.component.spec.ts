import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignDocComponent } from './sign-doc.component';

describe('SignDocComponent', () => {
  let component: SignDocComponent;
  let fixture: ComponentFixture<SignDocComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignDocComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignDocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
