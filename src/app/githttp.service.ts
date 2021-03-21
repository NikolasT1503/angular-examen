import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Issues } from './issue.interface';
import { FormArray } from '@angular/forms';
import { Router } from '@angular/router';

const token = 'e7340cfd1139794514d14db21e53bbfa7eeae512';
const owner = 'NikolasT1503';
const reponame = 'angular-examen';


@Injectable({
  providedIn: 'root'
})
export class GitServiceService {

  constructor(private httpclient: HttpClient) {
  }

  //https://github.com/NikolasT1503/angular-examen/issues/3

  getIssues() {
    const url = 'https://api.github.com/repos/NikolasT1503/angular-examen/issues';
    return this.httpclient.get(url);
  }

  createIssue() {
    const options = {
      headers: new HttpHeaders().append('Authorization', 'Basic ' + btoa(owner + ':' + token)),
    }

    this.httpclient.post('https://api.github.com/repos/NikolasT1503/angular-examen/issues', {
      owner: owner,
      repo: reponame,
      title: 'Проверка',
      body: 'Проверка body'
    }, options).subscribe((issue) =>{
      console.log(issue)
    });
  }
}