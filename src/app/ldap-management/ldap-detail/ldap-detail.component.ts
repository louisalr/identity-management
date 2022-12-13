import { Router} from "@angular/router";
import { Location } from '@angular/common';
import {UserLdap} from "../../model/user-ldap";
import {UsersService} from "../../service/users.service";
import {FormBuilder} from "@angular/forms";
import {ConfirmValidParentMatcher, passwordsValidator} from "./passwords-validator.directive";


export abstract class LdapDetailComponent {

  user: UserLdap;
  processLoadRunning = false;
  processValidateRunning = false;

  passwordPlaceHolder: string;
  errorMessage = '';

  confirmValidParentMatcher = new ConfirmValidParentMatcher();

  userForm = this.fb.group({
    id: {value: '', disabled: true},
    login: [''],
    nom: [''],
    prenom: [''],
    passwordGroup: this.fb.group({
      password: [''],
      confirmPassword:  ['']
    }, {validators: passwordsValidator}),
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
      (!this.addForm || this.formGetValue('passwordGroup.password') !== '');
  }

  private formGetValue(name: string): any {
    return this.userForm.get(name).value;
  }

  goToLdap(): void{
    this.router.navigate(['/users/list'])
  }

  abstract validateForm(): void;

  onSubmitForm() {
    console.log("Submit du form")
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

  protected copyUserToFormControl(): void{
    if(!this.addForm){
      this.userForm.get('id').setValue(this.user.id.toString())
    }
    this.userForm.get('login').setValue(this.user.login)
    this.userForm.get('nom').setValue(this.user.nom)
    this.userForm.get('prenom').setValue(this.user.prenom)
    this.userForm.get('mail').setValue(this.user.mail)
  }

  protected getUserFromFormControl(): UserLdap{
    return{
      id: parseInt(this.userForm.get('id').value),
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
