import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ButtonAddPipe } from './button-add.pipe';
import { Comp404Component } from './comp404/comp404.component';
import { HrefAddPipe } from './href-add.pipe';
import { MaterialModule } from './material-module';
import { DialogOverviewExampleDialog } from './matexpandtable/dialog-overview-dialog.component';
import {
  AddCommentDialog1,
  MatexpandtableComponent,
} from './matexpandtable/matexpandtable.component';
import { NavbarComponent } from './navbar.component';

@NgModule({
  declarations: [
    AppComponent,
    MatexpandtableComponent,
    NavbarComponent,
    Comp404Component,
    ButtonAddPipe,
    HrefAddPipe,
    DialogOverviewExampleDialog,
    AddCommentDialog1,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
