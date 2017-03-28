import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';

import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { QuestionComponent } from './question/question.component';
import { AnswerComponent } from './answer/answer.component';
import {QuestionService} from '../assets/question.service';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    QuestionComponent,
    AnswerComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterialModule
  ],
  providers: [
    QuestionService
  ],
  bootstrap: [
    AppComponent,
    QuestionComponent,
    AnswerComponent
  ]
})
export class AppModule { }
