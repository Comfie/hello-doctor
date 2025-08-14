import { Injectable } from "@angular/core";
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from "@angular/router";
import { AuthService } from "../services/auth.service";
import { ToastService } from "../services/toast.service";

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router,
    private toastService: ToastService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | UrlTree {
    const requiredRole = route.data['role'];

    // If not authenticated, redirect to login
    if (!this.authService.isAuthenticated()) {
      return this.router.createUrlTree(['/login'], {
        queryParams: { returnUrl: state.url },
      });
    }

    console.log('Required Role:', requiredRole);

    // Check if user has the required role
    if (!this.authService.isInRole(requiredRole)) {
      this.toastService.show(
        'error',
        'Access Denied',
        `You do not have permission to access this page. Required role: ${requiredRole}`
      );
      return false;
    }

    // If authenticated and has correct role, allow access
    return true;
  }
}
