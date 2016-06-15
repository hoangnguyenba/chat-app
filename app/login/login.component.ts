import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router-deprecated';
import { CORE_DIRECTIVES, FORM_DIRECTIVES } from '@angular/common';
import { Http, Headers } from '@angular/http';
import { contentHeaders } from '../shared/headers';


@Component({
  selector: 'login',
  directives: [RouterLink, CORE_DIRECTIVES, FORM_DIRECTIVES ],
  templateUrl: 'app/login/login.component.html',
  styleUrls: ['app/login/login.component.css']
})
export class LoginComponent {
  constructor(public router: Router, public http: Http) {
  }

  login(event: Event, username: String, password: String) {
    event.preventDefault();
    let body = JSON.stringify({ username, password });
    this.http.post('http://localhost:3131/login', body, { headers: contentHeaders })
      .map((res) => {
        let body = res.json();  
        return body || { };
      })
      .subscribe(
        data => {
          localStorage.setItem('id_token', data.id_token);
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
