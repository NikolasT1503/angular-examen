import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MatexpandtableComponent } from './matexpandtable/matexpandtable.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTable } from '@angular/material/table';
import { MaterialModule } from './material-module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NavbarComponent } from './navbar.component';
import { Comp404Component } from './comp404/comp404.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GitauthInterceptor } from './gitauth.interceptor';
import { ButtonAddPipe } from './button-add.pipe';
import { HrefAddPipe } from './href-add.pipe';

@NgModule({
  declarations: [
    AppComponent,
    MatexpandtableComponent,
    NavbarComponent,
    Comp404Component,
    ButtonAddPipe,
    HrefAddPipe
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
  providers: [

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
