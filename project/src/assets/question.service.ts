import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';

import { QandA } from 'assets/q-and-a';

@Injectable()
export class QuestionService {
  private englishQuestionsUrl = 'assets/english-questions.json';
  private spanishQuestionsUrl = 'assets/spanish-questions.json';
  private englishQuestions: boolean;

  constructor(private http: Http) { }

  getQuestions(): Observable<QandA[]> {
    var url = this.englishQuestions ? this.englishQuestionsUrl : this.spanishQuestionsUrl;

    return this.http.get(url)
      .map((response: Response) => <QandA[]>response.json())
      .catch(this.handleError);
  }

  getQuestion(id: number, englishQuestions: boolean): Observable<QandA> {
    this.englishQuestions = englishQuestions;

    return this.getQuestions()
      .map((questions: QandA[]) => questions.find(p => p.Id === id));
  }

  private handleError(error: Response) {
    // ToDo: Log somewhere else (text-file or database)
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }
}
