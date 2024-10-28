import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeuDiaComponent } from './meu-dia.component';

describe('MeuDiaComponent', () => {
  let component: MeuDiaComponent;
  let fixture: ComponentFixture<MeuDiaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MeuDiaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MeuDiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
