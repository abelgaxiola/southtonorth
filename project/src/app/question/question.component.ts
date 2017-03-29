import { Component, OnInit } from '@angular/core';
import { MdDialog, MdDialogConfig, MdDialogRef } from '@angular/material';
import { Subscription } from 'rxjs/Subscription';

import { QandA } from 'assets/q-and-a';
import { QuestionService } from 'assets/question.service';
import { AnswerComponent } from "app/answer/answer.component";

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {
  question: QandA;
  errorMessage: string;
  englishQuestions: boolean;

  constructor(
    private questionService: QuestionService,
    public dialog: MdDialog
  ) { }

  openDialog() {
    let config = new MdDialogConfig();
    let dialogRef: MdDialogRef<AnswerComponent> = this.dialog.open(AnswerComponent);
    dialogRef.componentInstance.answers = this.question.Answers;
  }

  ngOnInit(): void {
    // Default to english questions
    this.englishQuestions = true;
    this.getQuestion(1);
  }

  getQuestion(id: number) {
    this.questionService.getQuestion(id, this.englishQuestions).subscribe(
      question => this.question = question,
      error => this.errorMessage = <any>error);
  }

  getNextQuestion() {
    var nextId = this.question.Id + 1;
    if (nextId === 101)
      nextId = 1;
    this.getQuestion(nextId);
  }

  getPrevQuestion() {
    var prevId = this.question.Id - 1;
    if (prevId === 0)
      prevId = 100;
    this.getQuestion(prevId);
  }

  setSpanishQuestions() {
    this.englishQuestions = false;
    this.getQuestion(this.question.Id);
  }

  setEnglishQuestions() {
    this.englishQuestions = true;
    this.getQuestion(this.question.Id);
  }

}
