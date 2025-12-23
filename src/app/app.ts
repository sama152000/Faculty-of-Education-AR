import { Component, HostListener } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NanoWidgetComponent } from './core/features/Faculty-of-education/Pages/shared/nano-widget/nano-widget.component';
import { LoadingComponent } from './shared/components/loading.component';

@Component({
  selector: 'app-root',
  imports: [
    ButtonModule,
    CommonModule,
    RouterModule,
    NanoWidgetComponent,
    LoadingComponent,
  ],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected title = 'كلية التربية ';
  showScrollButton = false;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.showScrollButton = window.pageYOffset > 300;
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
