import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { GitServiceService } from '../githttp.service';

@Component({
  selector: 'create-issues',
  templateUrl: './dialog-overview-dialog.component.html',
})
export class DialogOverviewExampleDialog {
  issueSendForm: FormGroup;

  panelOpenState = false;

  constructor(fb: FormBuilder, public githttp: GitServiceService) {
    this.issueSendForm = fb.group({
      title: fb.control(''),
      body: fb.control(''),
    });
  }

  send(): void {
    if (!this.issueSendForm.value.title) {
      this.issueSendForm.get('title').setValue(this.issueSendForm.value.body);
    }

    this.githttp.createIssue(this.issueSendForm.value);
  }

  resetForm() {
    this.issueSendForm.reset();
  }
}
