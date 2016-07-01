import { AuthGuard }          from '../auth.guard';
import { AuthService }        from '../shared/auth.service';
import { LoginComponent }     from './login.component';
export const LoginRoutes = [
  { path: 'login', component: LoginComponent }
];
export const AUTH_PROVIDERS = [AuthGuard, AuthService];