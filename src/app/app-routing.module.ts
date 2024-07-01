import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DepartmentLoginComponent } from './conference-manangement-system/department-login/department-login.component';
import { ManagementLoginComponent } from './conference-manangement-system/management-login/management-login.component';
import { ConferenceManangementSystemModule } from './conference-manangement-system/conference-manangement-system.module';
import { WildCardComponent } from './conference-manangement-system/wild-card/wild-card.component';
import { RegistrationComponent } from './registration/registration.component';
import { LoginComponent } from './login/login.component';
import { AdminComponent } from './admin/admin.component';
import { RegistrationListComponent } from './registration-list/registration-list.component';
import { LogoutComponent } from './registration-list/logout/logout.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';

const routes: Routes = [
  {
    path:"can",component:LogoutComponent
  },
  {path:"",redirectTo: '/login', pathMatch: 'full' },
//   { path: 'registration', component: RegistrationComponent },

// {
//   path:'conference',component:ConferenceManangementSystemModule,
//   children:[
 

//   ]
// }
{
  path: 'department',
  component: DepartmentLoginComponent,
},
{
  path:'about',
  component:AboutComponent

},
{
  path: 'management',
  component: ManagementLoginComponent,
},
{
  path: 'registration',
  component: RegistrationComponent,
},
{
  path:'admin',
  component:AdminComponent,

},
{
  path:'registrationlist',
  component:RegistrationListComponent,
},
{
path:'contact',
component:ContactComponent
},
// {
//   path:'login/registration',
//   component: RegistrationComponent,
// },
{
  path: 'management/department',
  component: DepartmentLoginComponent,
},
// {
//   path: 'login/management',
//   component:  ManagementLoginComponent,
// },
// {
//   path: 'registration/login',
//   component: LoginComponent,
// },
{
path:'department/management-login',
component:ManagementLoginComponent
},
{
  path: 'login',
  component: LoginComponent,
},
{
  path: '**',
  component: WildCardComponent,
},
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
