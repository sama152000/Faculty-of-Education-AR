import { Component, OnInit } from '@angular/core';
import { FooterComponent } from "../footer/footer.component";

@Component({
  selector: 'app-coming-soon',
  templateUrl: './coming-soon.component.html',
  styleUrls: ['./coming-soon.component.css'],
  imports: [FooterComponent]
})
export class ComingSoonComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
