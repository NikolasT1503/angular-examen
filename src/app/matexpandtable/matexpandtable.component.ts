import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { DatePipe } from '@angular/common';
import { AfterViewInit, Component, OnChanges, OnInit, ViewChild } from '@angular/core';
import { GitServiceService } from '../githttp.service';
import { Issue, Issues } from '../issue.interface';
import { MatTableDataSource } from '@angular/material/table';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-mattable',
  templateUrl: './matexpandtable.component.html',
  styleUrls: ['./matexpandtable.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ),
    ]),
  ],
  providers: [DatePipe],
})
export class MatexpandtableComponent implements OnInit, OnChanges, AfterViewInit {
  issues;
  dataSource;
  columnsToDisplay: string[] = [
    'state',
    'created_at',
    'title',
/*     'url',
    'userIssue',
    'body', */
    'actions',
  ];
  /* columnsToDisplay = ['state', 'created_at', 'title', 'url']; */
  expandedElement: Issue[] | null;
  @ViewChild(MatSort) sort: MatSort;

  form: FormGroup;
  issuesFormArray: FormArray;

  constructor(
    public gitServ: GitServiceService,
    private fb: FormBuilder,
    private datepipe: DatePipe
  ) {}

  viewIssues() {
    this.gitServ.getIssues().subscribe((data) => {
      this.issues = data;
      console.log(this.issues);
    });
  }
  ngOnInit(): void {
    /* this.viewIssues(); */
    /* this.gitServ.getIssues().subscribe((issuesData: Issue[]) => {
      this.dataSource = issuesData;
    }); */

    this.gitServ.getIssues().subscribe((issues: Issues) => {
      this.form = this.fb.group({
        issues: this.fb.array([]),
      });
      this.issuesFormArray = this.form.get('issues') as FormArray;
      issues.forEach((issue, index) =>
        this.issuesFormArray.insert(
          index,
          this.fb.group({
            state: this.fb.control(issue.state, Validators.required),
            created_at: this.fb.control(
              this.datepipe.transform(issue.created_at, 'dd-MM-yyyy hh:mm:ss ZZZZ'),
              Validators.required
            ),
            title: this.fb.control(issue.title, Validators.required),
            url: this.fb.control(issue.url, Validators.required),
            userIssue: this.fb.control(issue.user.login, Validators.required),
            body: this.fb.control(issue.body, Validators.required),
          })
        )
      );

      this.dataSource = new MatTableDataSource(this.issuesFormArray.controls);
      this.dataSource.filterPredicate = (row, filter) => {
        console.log(row, filter);
        const issue = row.value as Issue;
        console.log(
          'проверка return',
          issue.state + ' | ' + issue.title + ' | ' + issue.url
        );
        return (
          issue.state
            .trim()
            .toLowerCase()
            .includes(filter.trim().toLowerCase()) ||
          issue.title
            .trim()
            .toLowerCase()
            .includes(filter.trim().toLowerCase()) ||
          issue.user.login
            .trim()
            .toLowerCase()
            .includes(filter.trim().toLowerCase()) ||
          issue.body.trim().toLowerCase().includes(filter.trim().toLowerCase())
        );
      };
    });
  }

  ngOnChanges(){}

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  filterFunction(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue;
  }
}
