import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProfileHelperService {

constructor() { }

getPasswordStrength(password: string): { strength: number; message: string; color: string } {
  let strength = 0;
  const messages = ['Very Weak', 'Weak', 'Medium', 'Strong', 'Very Strong'];
  const colors = ['danger', 'warning', 'info', 'primary', 'success'];

  if (password.length >= 8) strength++;
  if (password.match(/[a-z]+/)) strength++;
  if (password.match(/[A-Z]+/)) strength++;
  if (password.match(/[0-9]+/)) strength++;
  if (password.match(/[@$!%*?&]+/)) strength++;

  return {
    strength: (strength / 5) * 100,
    message: messages[strength - 1] || 'None',
    color: colors[strength - 1] || 'danger'
  };
}

}
