import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { NgxSmartModalModule, NgxSmartModalService } from 'ngx-smart-modal';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { FormsModule} from "@angular/forms";

import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AppRoutingModule } from './app-routing.module';
import { QuestionComponent } from './question/question.component';
import {TimePipe} from './time.pipe';
import { RegisterComponent } from './auth/register/register.component';
import {AuthService} from "./auth/auth.service";
import { LoginComponent } from './auth/login/login.component';
import {AuthGuard} from "./auth/auth.guard";
import {TokenInterceptorService} from "./token-interceptor.service";
import { MoviesComponent } from './admin/movies/movies.component';
import { MovieEditComponent } from './admin/movie-edit/movie-edit.component';
import { MovieViewComponent } from './admin/movie-view/movie-view.component';
import { MainPageComponent } from './admin/main-page/main-page.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { ProfileComponent } from './user/profile/profile.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    QuestionComponent,
    TimePipe,
    RegisterComponent,
    LoginComponent,
    MoviesComponent,
    MovieEditComponent,
    MovieViewComponent,
    MainPageComponent,
    NotfoundComponent,
    ProfileComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    NgxSmartModalModule.forRoot()
  ],
  providers: [NgxSmartModalService, AuthGuard, AuthService, {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
