import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/providers/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  token = false;
  isAuthenticated$: Subscription;

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    this.isAuthenticated$ = this.authService.isAuthenticated.subscribe(
      (value: boolean) => {
        this.token = value;
      }
    );
  }

  /**
   * Logout
   */
  public logout(): void {
    this.authService.sendFlag(false);
    this.router.navigate(['login']);
  }
}
