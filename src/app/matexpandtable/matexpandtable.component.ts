import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { DatePipe } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import {
  AfterViewInit,
  Component,
  Inject,
  OnChanges,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { GitauthInterceptor } from '../gitauth.interceptor';
import { GitServiceService } from '../githttp.service';
import { HrefAddPipe } from '../href-add.pipe';
import { Issue, Issues } from '../issue.interface';
import { DialogOverviewExampleDialog } from './dialog-overview-dialog.component';

export interface DialogData {
  title: string;
  body: string;
}

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
  providers: [
    DatePipe,
    HrefAddPipe,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: GitauthInterceptor,
      multi: true,
    },
  ],
})
export class MatexpandtableComponent implements OnInit, OnChanges, AfterViewInit {
  
  issues;
  dataSource;
  title;
  body;
  comment;

  columnsToDisplay: string[] = [
    'id',
    'state',
    'created_at',
    'title',
    'body',
    'user',
  ];
  
  expandedElement: Issue[] | null;
  @ViewChild(MatSort) sort: MatSort;

  form: FormGroup;
  issuesFormArray: FormArray;

  addCommentfb: FormBuilder;

  constructor(
    public gitServ: GitServiceService,
    private fb: FormBuilder,
    private datepipe: DatePipe,
    public dialog: MatDialog
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
            id: this.fb.control(issue.number, Validators.required),
            state: this.fb.control(issue.state, Validators.required),
            created_at: this.fb.control(
              this.datepipe.transform(
                issue.created_at,
                'dd-MM-yyyy hh:mm:ss ZZZZ'
              ),
              Validators.required
            ),
            title: this.fb.control(issue.title, Validators.required),
            url: this.fb.control(issue.url, Validators.required),
            user: this.fb.control(issue.user.login, Validators.required),
            /*             userAvatar: this.fb.control(
              this.hrefpipe.transform(issue.user.avatar_url),
              Validators.required
            ), добавить валидатор на это который добавляет ссылку */
            userAvatar: this.fb.control(
              issue.user.avatar_url,
              Validators.required
            ),
            body: this.fb.control(issue.body, Validators.required),
          })
        )
      );
      this.dataSource = new MatTableDataSource(this.issuesFormArray.controls);

      this.dataSource.filterPredicate = (row, filter) => {
        console.log(row, filter);
        const issue = row.value as Issue;

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

  ngOnChanges() {}

  ngAfterViewInit() {}

  filterFunction(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue;
  }

  loadComments(id_issue: number) {
    this.gitServ.getIssueComments(id_issue.toString());
  }

  closeIssue(id: any) {
    this.dialog.open(AddCommentDialog1, {
      data: id,
    });

  }

  addComment(id: any) {
      this.dialog.open(AddCommentDialog1, {
        data: id,
      });
  }

  openDialog() {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog);

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }
}


@Component({
  selector: 'add-dialog.component',
  templateUrl: 'add-comment-dialog.html',
})
export class AddCommentDialog1 {
  comment: string;

  constructor(
    @Inject(MAT_DIALOG_DATA) public issue_number: number,
    public gitService: GitServiceService
  ) {}

  addComment() {
    console.log('Добавление коммента', this.issue_number.toString(), this.comment);
    this.gitService.createIssueComment(this.issue_number.toString(), this.comment);
    
  }

  closeIssue() {
    this.gitService.closeIssue(this.issue_number.toString());
  }
}
