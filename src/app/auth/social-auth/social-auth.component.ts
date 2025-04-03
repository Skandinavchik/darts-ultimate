import { Component, inject } from '@angular/core'
import { Router, RouterLink } from '@angular/router'
import { MatButtonModule } from '@angular/material/button'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { faGoogle, faFacebook, faApple } from '@fortawesome/free-brands-svg-icons'
import { catchError, take } from 'rxjs'
import { AuthService } from '../auth.service'
import { Provider } from '@supabase/supabase-js'

@Component({
  selector: 'app-social-auth',
  imports: [RouterLink, MatButtonModule, FontAwesomeModule],
  templateUrl: './social-auth.component.html',
  styleUrl: './social-auth.component.scss',
})
export class SocialAuthComponent {
  authService = inject(AuthService)
  router = inject(Router)

  googleIcon = faGoogle
  facebookIcon = faFacebook
  appleIcon = faApple

  onSocialButtonClick(provider: Provider) {
    this.authService.signInWithSocial(provider)
      .pipe(
        take(1),
        catchError(error => {
          throw error
        }),
      )
      .subscribe()
  }
}
