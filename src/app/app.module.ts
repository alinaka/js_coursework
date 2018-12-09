import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { NgxSmartModalModule, NgxSmartModalService } from 'ngx-smart-modal';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AppRoutingModule } from './app-routing.module';
import { QuestionComponent } from './question/question.component';
import {TimePipe} from './time.pipe';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    QuestionComponent,
    TimePipe,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    NgxSmartModalModule.forRoot()
  ],
  providers: [NgxSmartModalService],
  bootstrap: [AppComponent]
})
export class AppModule { }
