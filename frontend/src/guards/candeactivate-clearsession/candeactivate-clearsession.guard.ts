import { Injectable } from '@angular/core';
import { CanDeactivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { MAuth } from 'src/models/auth.model';

@Injectable({
  providedIn: 'root',
})
export class ClearSessionGuard implements CanDeactivate<any> {
  constructor(private router: Router) {}
  /**
   * Before leaving the `Dashboard page`, validate if there is a session and end it.
   * This also works when leaving the page by pressing the back button in the browser.
   */
  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
    if (MAuth.getToken()) {
      this.router.navigate(['login']).then(() => {
        MAuth.deleteSession();
        return false;
      });
    } else {
      return true;
    }
  }
}
