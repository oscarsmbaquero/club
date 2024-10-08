import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartysComponent } from './partys.component';

describe('PartysComponent', () => {
  let component: PartysComponent;
  let fixture: ComponentFixture<PartysComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PartysComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PartysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
