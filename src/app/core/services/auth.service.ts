import { AuthenticationService } from './../../../generated/api/api/authentication.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, tap } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { AuthResponse } from '../../../generated/api/model/authResponse';
import { ToastService } from './toast.service';

interface DecodedToken {
  userId: string;
  email: string;
  role: string;
  exp: number;
  iss: string;
  aud: string;
}

interface User {
  userId: string;
  email: string;
  role: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  username: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    private authServiceApi: AuthenticationService,
    private toastSerice: ToastService
  ) {}

 login(credentials: { email: string; password: string; rememberMe: boolean }) {
  return this.authServiceApi
    .apiV1AuthenticationLoginPost({
      email: credentials.email,
      password: credentials.password,
    })
    .pipe(
      tap((response: AuthResponse) => {
        if (!response || !response.jwtToken) {
          this.toastSerice.show(
            'warning',
            'Warning',
            'Login failed. Please check your credentials and try again.'
          );
          return;
        }
        
        // Store the authentication token
        localStorage.setItem('token', response.jwtToken);

        var currentUser: User = {
          userId: response.id! || '',
          email: response.email || '',
          role: response.role || '', 
          firstName: response.firstName || '',
          lastName: response.lastName || '',
          phoneNumber: '0800-000-0000', // Default phone number, can be updated later
          username: response.username || ''
        };
        
        // Store user data if needed
        if (response) {
          localStorage.setItem('current_user', JSON.stringify(currentUser));
        }

        // Get the return URL from route parameters or default to '/dashboard'
        const returnUrl = this.route.snapshot.queryParams['returnUrl'] || this.getDefaultRoute();
        this.router.navigateByUrl(returnUrl);
      }),
      catchError((error) => {
        if (error.status === 404) {
          this.toastSerice.show(
            'error',
            'Not Found',
            'User not found. Please check your credentials and try again.'
          );
        } else {
          this.toastSerice.show(
            'error',
            'Error',
            'An error occurred during login. Please try again later.'
          );
        }
        throw error;
      })
    );
}

private getDefaultRoute(): string {
  const userRole = this.getUserRole();
  switch (userRole) {
    case 'SuperAdministrator':
      return '/super-admin/dashboard';
    case 'MainMember':
      return '/main-member/dashboard';
    default:
      return '/dashboard';
  }
}

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('current_user');
    this.router.navigate(['/login']);
  }

  getDecodedToken(): DecodedToken | null {
    const token = localStorage.getItem('token'); // Or wherever you store your JWT
    if (token) {
      return jwtDecode<DecodedToken>(token);
    }
    return null;
  }

  getUserRole(): string | null {
    const decodedToken = this.getDecodedToken();
    return decodedToken?.role || null;
  }

  isInRole(role: string): boolean {
    const userRole = this.getUserRole();
    console.log('User Role:', userRole);
    console.log('Required Role:', role);
    return userRole === role;
  }

  getUserEmail(): string | null {
    const decodedToken = this.getDecodedToken();
    if (decodedToken) {
      return decodedToken['email'];
    }
    return null;
  }

  getUserId(): string | null {
    const decodedToken = this.getDecodedToken();
    if (decodedToken) {
      return decodedToken['userId'];
    }
    return null;
  }


  isAuthenticated(): boolean {
    const decodedToken = this.getDecodedToken();
    if (!decodedToken) return false;

    // Check if token is expired
    const currentTime = Date.now() / 1000;
    return decodedToken.exp > currentTime;
  }

  getCurrentUser(): User | null {
    const userData = localStorage.getItem('current_user');
    if (userData) {
      return JSON.parse(userData) as User;
    }
    return null;
  }
}
