import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuUtilisateurComponent } from './menu-utilisateur.component';

describe('MenuUtilisateurComponent', () => {
  let component: MenuUtilisateurComponent;
  let fixture: ComponentFixture<MenuUtilisateurComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuUtilisateurComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuUtilisateurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
