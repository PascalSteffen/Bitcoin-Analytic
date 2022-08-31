import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import { DataDiagramComponent } from './data-diagram.component';

describe('DataDiagramComponent', () => {
  let component: DataDiagramComponent;
  let fixture: ComponentFixture<DataDiagramComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [ DataDiagramComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DataDiagramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
