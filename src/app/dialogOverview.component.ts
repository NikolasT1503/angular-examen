import {Component, Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DialogOverviewExampleDialog } from './matexpandtable/dialog-overview-dialog.component';


/**
 * @title Dialog Overview
 */
@Component({
  selector: 'dialog-overview',
  templateUrl: 'dialogOverview.component.html',
})
export class DialogOverview {

  title: string;
  body: string;

  constructor(public dialog: MatDialog) {}

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '250px',
      data: {title: this.title, body: this.body}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.body = result;
    });
  }

}