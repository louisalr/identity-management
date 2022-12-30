import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LdapListComponent } from './ldap-management/ldap-list/ldap-list.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppMaterialModule } from './app-material.module';
import { NavbarComponent } from './ldap-management/navbar/navbar.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import {MatTableModule} from "@angular/material/table";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatInputModule} from "@angular/material/input";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { LdapEditComponent } from './ldap-management/ldap-edit/ldap-edit.component';
import { LdapAddComponent } from './ldap-management/ldap-add/ldap-add.component';
import { AlertComponent } from './share/alert/alert.component';
import { LdapManagementModule } from './ldap-management/ldap-management.module';
import {MatButtonModule} from "@angular/material/button";
import {HttpClientModule} from "@angular/common/http";
import {HttpClientInMemoryWebApiModule} from "angular-in-memory-web-api";
import {InMemoryUsersService} from "./service/in-memory-users.service";

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    NavbarComponent,
  ],
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        LdapManagementModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        AppMaterialModule,
        LayoutModule,
        MatSidenavModule,
        MatSnackBarModule,
        MatIconModule,
        MatToolbarModule,
        MatListModule,
        MatButtonModule,
        HttpClientModule,
        HttpClientInMemoryWebApiModule.forRoot(
          InMemoryUsersService, {dataEncapsulation: false}
        )
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
