import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AjouterDepartementComponent } from './ajouter-departement/ajouter-departement.component';
import { AjouterRoleComponent } from './ajouter-role/ajouter-role.component';
import { AjouterUtilisateurComponent } from './ajouter-utilisateur/ajouter-utilisateur.component';
import { ContactComponent } from './contact/contact.component';
import { Etape1Component } from './etape1/etape1.component';
import { Etape2Component } from './etape2/etape2.component';
import { FooterComponent } from './footer/footer.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { HeaderComponent } from './header/header.component';
import { HomeAdminComponent } from './home-admin/home-admin.component';
import { HomeComponent } from './home/home.component';
import { ListeDepartementsComponent } from './liste-departements/liste-departements.component';
import { ListeProcessusComponent } from './liste-processus/liste-processus.component';
import { ListeRolesComponent } from './liste-roles/liste-roles.component';
import { ListeUtilisateursComponent } from './liste-utilisateurs/liste-utilisateurs.component';
import { LoginComponent } from './login/login.component';
import { ModifierDepartementComponent } from './modifier-departement/modifier-departement.component';
import { ModifierRoleComponent } from './modifier-role/modifier-role.component';
import { ModifierUtilisateurComponent } from './modifier-utilisateur/modifier-utilisateur.component';
import { AuthGuard } from './services/authentification/auth.guard';
import { RoleGuard } from './services/authentification/role.guard';
import { SignDocComponent } from './sign-doc/sign-doc.component';


const routes: Routes = [
  {path:'home',component:HomeComponent,canActivate:[AuthGuard]},
  {path:'homeAdmin',component:HomeAdminComponent},
  {path:'login',component:LoginComponent},
  {path:'header',component:HeaderComponent},
  {path:'footer',component:FooterComponent},
  {path:'addUser',component:AjouterUtilisateurComponent,canActivate:[RoleGuard]},
  {path:'contact',component:ContactComponent,canActivate:[AuthGuard]},
  {path:'users',component:ListeUtilisateursComponent,canActivate:[RoleGuard]},
  {path:'editUser/:id',component:ModifierUtilisateurComponent,canActivate:[AuthGuard]},
  {path:'addRole',component:AjouterRoleComponent},
  {path:'roles',component:ListeRolesComponent},
  {path:'editRole/:id',component:ModifierRoleComponent},
  {path:'forgotpassword',component:ForgetPasswordComponent},
  {path:'addDepartement',component:AjouterDepartementComponent,canActivate:[RoleGuard]},
  {path:'departements',component:ListeDepartementsComponent,canActivate:[RoleGuard]},
  {path:'editDepartement/:id',component:ModifierDepartementComponent,canActivate:[RoleGuard]},
  {path:'etape1',component:Etape1Component},
  {path:'etape2',component:Etape2Component},
  {path:'sign',component:SignDocComponent,canActivate:[AuthGuard]},
  {path:'listeProcessus',component:ListeProcessusComponent}
  
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
