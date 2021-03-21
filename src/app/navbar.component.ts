import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from "@angular/common"

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  navbarOpen = false;

  constructor(private router: Router, private _location: Location){}

  ngOnInit(): void {
  }

  toggleNavbar(){
    this.navbarOpen=!this.navbarOpen;
  }

  goTable1() {
    this.router.navigate(['table1']);
  }

  goTable2() {
    this.router.navigate(['table2']);
  }
  goBack() {
    this._location.back();
  }

  goForward(){
    this._location.forward();
  }
}