import { Component, computed, inject } from '@angular/core'
import { AuthService } from '../auth/auth.service'

@Component({
  selector: 'app-profile',
  imports: [],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent {
  authService = inject(AuthService)
  currentUser = computed(this.authService.currentUser)
}
