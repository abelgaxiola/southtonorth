import { Component, OnInit } from '@angular/core';
import { MdDialog, MdDialogRef } from '@angular/material';

@Component({
  templateUrl: './answer.component.html',
  styleUrls: ['./answer.component.css']
})
export class AnswerComponent implements OnInit {
  public answers: string[];

  constructor(public dialogRef: MdDialogRef<AnswerComponent>) { }

  ngOnInit() {
  }

}
