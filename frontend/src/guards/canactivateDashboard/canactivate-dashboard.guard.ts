import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { MAuth } from 'src/models/auth.model';
import { AuthService } from 'src/providers/auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class CanactivateDashboardGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (MAuth.getToken()) {
      return true;
    } else {
      this.router.navigate(['landing']).then(() => {
        MAuth.deleteSession();
        this.authService.sendFlag(false);
        return false;
      });
    }

    return false;
  }
}
