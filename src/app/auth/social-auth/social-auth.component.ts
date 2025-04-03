import { Component, inject } from '@angular/core'
import { Router, RouterLink } from '@angular/router'
import { MatButtonModule } from '@angular/material/button'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { faGoogle, faFacebook, faApple } from '@fortawesome/free-brands-svg-icons'
import { take } from 'rxjs'
import { AuthService } from '../auth.service'

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

  onGoogleButtonClick() {
    this.authService.signInWithSocial('google')
      .pipe(take(1))
      .subscribe({
        next: res => {
          console.log(res)
          console.log(res)
        },
        error: err => {
          console.log(err)
        },
      })
  }

  onFacebookButtonClick() {
    this.authService.signInWithSocial('facebook')
      .pipe(take(1))
      .subscribe({
        next: res => {
          console.log(res)
        },
        error: err => {
          console.log(err)
        },
      })
  }
}
