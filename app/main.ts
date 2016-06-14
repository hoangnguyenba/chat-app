import { bootstrap }    from '@angular/platform-browser-dynamic';
import { HTTP_PROVIDERS } from '@angular/http';
import { AppComponent } from './app.component';
import { AuthService } from './shared/auth.service';

bootstrap(AppComponent, [HTTP_PROVIDERS, AuthService]);
