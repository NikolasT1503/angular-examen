import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Issue } from './issue.interface';
import { FormArray } from '@angular/forms';
import { Router } from '@angular/router';

const token = '370853ab589285162b3a281d0b4cab813b97e00f';
const owner = 'NikolasT1503';
const reponame = 'angular-examen';


@Injectable({
  providedIn: 'root'
})
export class GitServiceService {
  options = {
    headers: new HttpHeaders().append('Authorization', 'Basic ' + btoa(owner + ':' + token)),
  }

  constructor(private httpclient: HttpClient) {
  }

  //https://github.com/NikolasT1503/angular-examen/issues/3

  getIssues() {
    const url = 'https://api.github.com/repos/NikolasT1503/angular-examen/issues';
    return this.httpclient.get(url);
  }

  createIssue(issue: Issue) {
    this.httpclient.post('https://api.github.com/repos/NikolasT1503/angular-examen/issues', {...issue,
      owner: owner,
      repo: reponame
    }, this.options).subscribe((issue) =>{
      console.log(issue)
    });
  }

  getIssueComments(issue_number: string){
    return this.httpclient.get('https://api.github.com/repos'+owner+'/'+reponame+'/issues/'+issue_number+'/comments');
  }

  createIssueComment(issue_number: string, comment: string){
    const url = 'https://api.github.com/repos/NikolasT1503/angular-examen/issues/'+issue_number+'/comments';
    console.log('Проверка url', url);


    this.httpclient.post(url, {
      owner: 'NikolasT1503',
      repo: 'angular-examen',
      issue_Number: issue_number,
      body: comment
    }, this.options).subscribe((data) =>{
      console.log(data)
    });    
  }

  closeIssue(issue_number: string){
    const url = 'https://api.github.com/repos/NikolasT1503/angular-examen/issues/'+issue_number+'/lock';
    const url2 = 'https://api.github.com/repos/NikolasT1503/angular-examen/issues/'+issue_number;
    this.httpclient.put(url, {
          owner: owner,
          repo: reponame,
          issue_Number: issue_number,
          lock_reasson: 'resolved',
        },this.options
      )
      .subscribe((data) => {
        console.log(data);
      });

    this.httpclient.patch(url2,
        {
          owner: owner,
          repo: reponame,
          issue_Number: issue_number,
          state: 'closed',
        },this.options
      )
      .subscribe((data) => {
        console.log(data);
      });
  }
}