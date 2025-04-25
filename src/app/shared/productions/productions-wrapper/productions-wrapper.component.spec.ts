import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductionsWrapperComponent } from './productions-wrapper.component';

describe('ProductionsWrapperComponent', () => {
  let component: ProductionsWrapperComponent;
  let fixture: ComponentFixture<ProductionsWrapperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductionsWrapperComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductionsWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
