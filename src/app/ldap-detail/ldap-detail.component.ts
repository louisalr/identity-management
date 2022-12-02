import { Router} from "@angular/router";
import { Location } from '@angular/common';
import {UserLdap} from "../model/user-ldap";
import {UsersService} from "../service/users.service";
import {FormBuilder} from "@angular/forms";


export abstract class LdapDetailComponent {

  user: UserLdap;
  processLoadRunning = false;
  processValidateRunning = false;

  passwordPlaceHolder: string;

  userForm = this.fb.group({
    login: [''],
    nom: [''],
    prenom: [''],
    passwordGroup: this.fb.group({
      password: [''],
      confirmPassword:  ['']
    }),
    mail: {value: '', disabled: true}
  })

  protected constructor(public addForm: boolean,
                        private fb: FormBuilder,
                        private router: Router) {
    this.passwordPlaceHolder = 'Mot de passe ' + (this.addForm ? '' : ' (vide si inchangé)');
  }


  protected onInit(): void{
    //useless dans notre cas
  }

  isFormValid(): boolean{
    return this.userForm.valid &&
      (!this.addForm || this.formGetValue('passwordGroup.password') !== '')
  }

  /*
  private getUser(): void{
    const login = this.route.snapshot.paramMap.get('id');

    this.usersService.getUser(login).subscribe(
      user => { this.user = user; console.log("LdapDetail getUser = "); console.log(user);}
    )
  }*/

  private formGetValue(name: string): any {
    return this.userForm.get(name).value;
  }

  goToLdap(): void{
    this.router.navigate(['/users/list'])
  }

  abstract  validateForm(): void;

  onSubmitForm(): void {
    this.validateForm()
  }

  updateLogin(): void {
    if (this.addForm) {
      this.userForm.get('login').setValue((this.formGetValue('prenom') + '.' + this.formGetValue('nom')).toLowerCase());
      this.updateMail();
    }
  }


  updateMail(): void {
    if( this.addForm){
      this.userForm.get('mail').setValue(this.formGetValue('login').toLowerCase() + '@epsi.lan')
    }
  }

  protected copyUserToFromControl(): void{
    this.userForm.get('login').setValue(this.user.login)
    this.userForm.get('nom').setValue(this.user.nom)
    this.userForm.get('prenom').setValue(this.user.prenom)
    this.userForm.get('mail').setValue(this.user.mail)
  }

  protected getUserFromFormControl(): UserLdap{
    return{
      login: this.userForm.get('login').value,
      nom: this.userForm.get('nom').value,
      prenom: this.userForm.get('prenom').value,
      nomComplet: this.userForm.get('nom').value + ' ' + this.userForm.get('prenom').value,
      mail: this.userForm.get('login').value,
      employeNumero: 1,
      employeNiveau: 1,
      dateEmbauche: '2020-04-24',
      publisherId: 1,
      active: true,
      motDePasse: '',
      role: 'ROLE_USER'
    }
  }

}
