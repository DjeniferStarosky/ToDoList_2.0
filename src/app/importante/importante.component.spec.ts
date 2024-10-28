import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportanteComponent } from './importante.component';

describe('ImportanteComponent', () => {
  let component: ImportanteComponent;
  let fixture: ComponentFixture<ImportanteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ImportanteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImportanteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
