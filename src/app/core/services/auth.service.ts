import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { tap } from 'rxjs';
import { environment } from '../../../environments/environments';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private readonly apiUrl = `${environment.apiUrl}/auth`;

    constructor(
        private http: HttpClient,
        private router: Router,
        private route: ActivatedRoute
    ) {}

    login(credentials: {
        email: string;
        password: string;
        rememberMe: boolean;
    }) {
        return this.http.post(`${this.apiUrl}/login`, credentials).
        pipe(
            tap((response: any) => {
                // Store the authentication token
                localStorage.setItem('auth_token', response.token);
                // Store user data if needed
                if (response.user) {
                    localStorage.setItem(
                        'current_user',
                        JSON.stringify(response.user)
                    );
                }
                const returnUrl =
                    this.route.snapshot.queryParams['returnUrl'] || '/home';
                this.router.navigateByUrl(returnUrl);
            })
        );
    }

    logout() {
        localStorage.removeItem('auth_token');
        localStorage.removeItem('current_user');
        this.router.navigate(['/login']);
    }

    isAuthenticated(): boolean {
        // Check if token exists and is not expired
        const token = localStorage.getItem('auth_token');
        return !!token; // Add proper token validation logic here
    }
}
