import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatexpandtableComponent } from './matexpandtable.component';

describe('MatexpandtableComponent', () => {
  let component: MatexpandtableComponent;
  let fixture: ComponentFixture<MatexpandtableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MatexpandtableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MatexpandtableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
