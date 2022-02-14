import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MarketsService } from 'src/app/markets/markets.service';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.css'],
})
export class NotFoundComponent implements OnInit {
  displayTimer: number;
  interval: any;
  marketsDataError: string = null;
  constructor(private router: Router, private marketsService: MarketsService) {}

  ngOnInit() {
    this.marketsService.errorMsg.subscribe((msg) => {
      console.warn(msg);
      this.marketsDataError = msg;
      console.warn(typeof this.marketsDataError);
    });
    if (this.marketsDataError == null) {
      this.redirectTimer();
    }
  }
  redirectTimer() {
    let time = 4;
    this.interval = setInterval(() => {
      if (time > 1) {
        time--;
        this.displayTimer = time;
      } else {
        clearInterval(this.interval);
        // this.redirectTimer();
        this.router.navigate(['/']);
      }
    }, 1000);
  }
}
