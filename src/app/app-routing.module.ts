import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DashboardComponent} from './dashboard/dashboard.component';
import {QuestionComponent} from './question/question.component';
import {MainPageComponent} from './admin/main-page/main-page.component';
import {RegisterComponent} from "./auth/register/register.component";
import {AuthGuard} from "./auth/auth.guard";
import {LoginComponent} from "./auth/login/login.component";
import {MoviesComponent} from "./admin/movies/movies.component";
import {MovieViewComponent} from "./admin/movie-view/movie-view.component";
import {MovieEditComponent} from "./admin/movie-edit/movie-edit.component";

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'quiz', component: QuestionComponent },
  { path: 'admin', canActivate: [AuthGuard], component: MainPageComponent },
    {path: 'login', component: LoginComponent},
    {path: 'register', component: RegisterComponent},
    {path: 'movies', component: MoviesComponent},
    {path: 'movie/:id', component: MovieViewComponent},
    {path: 'movie/:id/edit', component: MovieEditComponent}

];


@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
