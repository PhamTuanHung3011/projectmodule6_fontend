import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchHumanComponent } from './search-human.component';

describe('SearchHumanComponent', () => {
  let component: SearchHumanComponent;
  let fixture: ComponentFixture<SearchHumanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchHumanComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchHumanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
