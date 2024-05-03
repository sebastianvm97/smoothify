import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { UrlShortenerComponent } from '../url-shortener/url-shortener.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    UrlShortenerComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

}
