import { Component } from '@angular/core'
import { RouterLink } from '@angular/router'
import { MatButtonModule } from '@angular/material/button'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { faGoogle, faFacebook, faApple } from '@fortawesome/free-brands-svg-icons'

@Component({
  selector: 'app-social-auth',
  imports: [RouterLink, MatButtonModule, FontAwesomeModule],
  templateUrl: './social-auth.component.html',
  styleUrl: './social-auth.component.scss',
})
export class SocialAuthComponent {
  googleIcon = faGoogle
  facebookIcon = faFacebook
  appleIcon = faApple
}
