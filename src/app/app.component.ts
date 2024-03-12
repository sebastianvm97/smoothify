import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UrlShortenerComponent } from './components/private/url-shortener/url-shortener.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, UrlShortenerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'smoothify';
}
