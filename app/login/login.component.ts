import { Component, Inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router-deprecated';
import { CORE_DIRECTIVES, FORM_DIRECTIVES } from '@angular/common';
import { Http, Headers } from '@angular/http';
import { contentHeaders } from '../shared/headers';
import { UserService, User } from '../shared';
import { APP_CONFIG, AppConfig } from '../config';

@Component({
  selector: 'login',
  directives: [RouterLink, CORE_DIRECTIVES, FORM_DIRECTIVES ],
  templateUrl: 'app/login/login.component.html',
  styleUrls: ['app/login/login.component.css']
})
export class LoginComponent {
  constructor(public router: Router, 
              public http: Http, 
              private userService: UserService,
              @Inject(APP_CONFIG) private config:AppConfig
            ) 
  {
  }

  login(event: Event, username: String, password: String) {
    event.preventDefault();
    let body = JSON.stringify({ username, password });
    this.http.post( this.config.apiEndpoint + 'login', body, { headers: contentHeaders })
      .map((res) => {
        let body = res.json();  
        return body || { };
      })
      .subscribe(
        data => {
          localStorage.setItem('id_token', data.id_token);
          this.userService.setCurrentUser(new User(data.user));
          if(data.status == true)
            this.router.parent.navigateByUrl('/');
        },
        error => {
          alert(error.text());
          console.log(error.text());
        }
      );
  }
}
