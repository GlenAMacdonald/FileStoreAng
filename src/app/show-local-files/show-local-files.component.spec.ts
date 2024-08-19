import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowLocalFilesComponent } from './show-local-files.component';

describe('ShowLocalFilesComponent', () => {
  let component: ShowLocalFilesComponent;
  let fixture: ComponentFixture<ShowLocalFilesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShowLocalFilesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ShowLocalFilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
