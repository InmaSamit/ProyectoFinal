import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';
import { GoalComponent } from './components/goal/goal.component'
export const routes: Routes = [

  {path: 'login', component: LoginComponent},
  {path: 'profile', component: ProfileComponent},
  { path: 'goals/:interestId', component: GoalComponent },

];
