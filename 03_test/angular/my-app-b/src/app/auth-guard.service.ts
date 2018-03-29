import {Injectable} from "@angular/core";
import {CanActivate} from "@angular/router";
import {Observable} from "rxjs/Observable";
import {of} from "rxjs/observable/of";
import {delay, tap} from "rxjs/operators";


@Injectable()
export class AuthGuardService implements CanActivate{
  private isLoggedIn:boolean = false;
  private redirectUrl: string;

  canActivate() {
    console.warn('AuthGuard#canActivate called...');
    return true;
  }

  login(): Observable<boolean> {
    return of(true).pipe(
      delay(1000),
      tap(val => this.isLoggedIn = true)
    );
  }

  logout(): void {
    this.isLoggedIn = false;
  }
}
