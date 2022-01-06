import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.css'],
})
export class NotFoundComponent implements OnInit {
  displayTimer: number;
  constructor(private router: Router) {}

  ngOnInit(): void {
    this.redirectTimer();
  }
  redirectTimer() {
    let time = 4;
    setInterval(() => {
      if (time > 1) {
        time--;
        console.log(time);
        this.displayTimer = time;
      } else {
        return this.router.navigate(['/']);
      }
    }, 1000);
  }
}
