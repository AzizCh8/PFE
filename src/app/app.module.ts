import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms'; 
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {ReactiveFormsModule} from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './footer/footer.component';
import { HomeAdminComponent } from './home-admin/home-admin.component';
import { AjouterUtilisateurComponent } from './ajouter-utilisateur/ajouter-utilisateur.component';
import { ContactComponent } from './contact/contact.component';
import {HttpClientModule} from '@angular/common/http'
import { ListeUtilisateursComponent } from './liste-utilisateurs/liste-utilisateurs.component';
import { ModifierUtilisateurComponent } from './modifier-utilisateur/modifier-utilisateur.component';
import { AjouterRoleComponent } from './ajouter-role/ajouter-role.component';
import { ListeRolesComponent } from './liste-roles/liste-roles.component';
import { ModifierRoleComponent } from './modifier-role/modifier-role.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { AjouterDepartementComponent } from './ajouter-departement/ajouter-departement.component';
import { ListeDepartementsComponent } from './liste-departements/liste-departements.component';
import { ModifierDepartementComponent } from './modifier-departement/modifier-departement.component';
import { Etape1Component } from './etape1/etape1.component';
import { Etape2Component } from './etape2/etape2.component';
import { SignDocComponent } from './sign-doc/sign-doc.component';
import { ListeProcessusComponent } from './liste-processus/liste-processus.component';
import { writeXLSX } from 'xlsx';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    HomeComponent,
    FooterComponent,
    HomeAdminComponent,
    AjouterUtilisateurComponent,
    ContactComponent,
    ListeUtilisateursComponent,
    ModifierUtilisateurComponent,
    AjouterRoleComponent,
    ListeRolesComponent,
    ModifierRoleComponent,
    ForgetPasswordComponent,
    AjouterDepartementComponent,
    ListeDepartementsComponent,
    ModifierDepartementComponent,
    Etape1Component,
    Etape2Component,
    SignDocComponent,
    ListeProcessusComponent
    
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    MatButtonModule,
    MatInputModule,
    ReactiveFormsModule,
    NgbModule,
    HttpClientModule,
   
  

    
   
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
