import { Component, OnInit } from '@angular/core';
import { MdDialog } from '@angular/material';
import { AnswerComponent } from "app/answer/answer.component";

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {

  constructor(public dialog: MdDialog) { }

openDialog() {
    this.dialog.open(AnswerComponent);
  }

  ngOnInit() {
  }

}
