import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Issues } from './issue.interface';
import { FormArray } from '@angular/forms';
import { Router } from '@angular/router';

const token = 'd6335fe75487e55f1aef6e5ab2989968706a8aa0';
const owner = 'NikolasT1503';
const reponame = 'angular-lecture13-tests';


@Injectable({
  providedIn: 'root'
})
export class GitServiceService {

  constructor(private httpclient: HttpClient) {
  }

  getIssues() {
    const url = 'https://api.github.com/repos/NikolasT1503/angular-lecture13-tests/issues';
    return this.httpclient.get(url);
  }
}
