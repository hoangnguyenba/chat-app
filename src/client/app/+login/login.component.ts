import { Component } from '@angular/core';

import { AuthService } from '../shared/auth.service';

@Component({
  moduleId: module.id,
  selector: 'login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.css']
})
export class LoginComponent {
  constructor(private authService: AuthService
            ) {
  }

  login(event: Event, username: String, password: String) {
    event.preventDefault();

    this.authService.login(username, password);
  }
}
