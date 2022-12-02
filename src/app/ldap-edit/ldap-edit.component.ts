import { Component, OnInit } from '@angular/core';
import {UsersService} from "../service/users.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder} from "@angular/forms";
import {LdapAddComponent} from "../ldap-add/ldap-add.component";
import {LdapDetailComponent} from "../ldap-detail/ldap-detail.component";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-ldap-edit',
  templateUrl: '../ldap-detail/ldap-detail.component.html',
  styleUrls: ['../ldap-detail/ldap-detail.component.scss']
})
export class LdapEditComponent extends LdapDetailComponent implements OnInit {

  constructor(private usersService: UsersService,
              private route: ActivatedRoute,
              fb: FormBuilder,
              router: Router,
              private snackBar: MatSnackBar)
  { super (false, fb, router);}

  ngOnInit(): void {
    super.onInit();
    this.getUser();
  }

  validateForm(): void{
    console.log('LdapEditComponent');
    this.processValidateRunning = true;
    this.usersService.updateUser(this.getUserFromFormControl()).subscribe(
      data => {
        this.processValidateRunning = false;
        this.errorMessage = '';
        this.snackBar.open('Utilisateur modifié')
      },
      error => {
        this.processValidateRunning = false;
        this.errorMessage = 'Une erreur est survenue dans les modifications'
        this.snackBar.open('Utilisateur non modifié')
      }
    )
  }

  private getUser(): void{
    const login = this.route.snapshot.paramMap.get('id');
    this.processValidateRunning = true;
    this.usersService.getUser(login).subscribe(
      user => {
        this.user = user;
        this.copyUserToFromControl();
        this.processLoadRunning= false;
      },
      error => {
        this.processLoadRunning = false;
        this.errorMessage = "L'utilisateur n'existe pas";
        this.snackBar.open("Utilisateur non trouvé")
      }
    )
  }

}
