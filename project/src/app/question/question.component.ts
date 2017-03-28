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
    this.getQuestion(1);
  }

  getQuestion(id: number) {
    this.questionService.getQuestion(id).subscribe(
      question => this.question = question,
      error => this.errorMessage = <any>error);
  }

  getNextQuestion() {
    var nextId = this.question.Id + 1;
    this.getQuestion(nextId);
  }

  getPrevQuestion() {
    var nextId = this.question.Id - 1;
    this.getQuestion(nextId);
  }

}
