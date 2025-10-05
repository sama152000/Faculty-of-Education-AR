import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './Pages/shared/navbar/navbar.component';

@Component({
  selector: 'app-Faculty-of-education',
  templateUrl: './Faculty-of-education.component.html',
  styleUrls: ['./Faculty-of-education.component.css'],
  imports: [ 
    RouterOutlet,
    NavbarComponent
    ]
})
export class FacultyOfEducationComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
