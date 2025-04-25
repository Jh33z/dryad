import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductionsCardComponent } from './productions-card.component';

describe('ProductionsCardComponent', () => {
  let component: ProductionsCardComponent;
  let fixture: ComponentFixture<ProductionsCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductionsCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductionsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
