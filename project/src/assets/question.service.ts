import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';

import { QandA } from 'assets/q-and-a';

@Injectable()
export class QuestionService {
  //ToDo: Implement option for Spanish questions
  private englishQuestionsUrl = 'assets/english-questions.json';

  constructor(private http: Http) { }
  // Not used at this time but leaving here for later implementation
  getQuestions(): Observable<QandA[]> {
    return this.http.get(this.englishQuestionsUrl)
      .map((response: Response) => <QandA[]>response.json())
      .do(data => console.log('All: ' + JSON.stringify(data)))
      .catch(this.handleError);
  }

  getQuestion(id: number): Observable<QandA> {
    return this.getQuestions()
      .map((questions: QandA[]) => questions.find(p => p.Id === id));
  }

  private handleError(error: Response) {
    // ToDo: Log somewhere else (text-file or database)
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }
}
