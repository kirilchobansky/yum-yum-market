import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileOrdersListComponent } from './profile-orders-list.component';

describe('ProfileOrdersListComponent', () => {
  let component: ProfileOrdersListComponent;
  let fixture: ComponentFixture<ProfileOrdersListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProfileOrdersListComponent]
    });
    fixture = TestBed.createComponent(ProfileOrdersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
