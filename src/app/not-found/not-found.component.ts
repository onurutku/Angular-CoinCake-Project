import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.css'],
})
export class NotFoundComponent implements OnInit {
  displayTimer: number;
  interval: any;
  constructor(private router: Router) {}

  ngOnInit(): void {
    this.redirectTimer();
  }
  redirectTimer() {
    let time = 4;
    this.interval = setInterval(() => {
      if (time > 1) {
        time--;
        console.log(time);
        this.displayTimer = time;
      } else {
        clearInterval(this.interval);
        this.router.navigate(['/']);
      }
    }, 1000);
  }
}
