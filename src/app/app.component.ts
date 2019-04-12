import { Component } from '@angular/core';
import { WatchlistService } from './services/watchlist.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  constructor(private watchlistService:WatchlistService) {
  }
}
