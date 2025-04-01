import { Component, computed, inject, signal } from '@angular/core'
import { RouterLink } from '@angular/router'
import { MatListModule } from '@angular/material/list'
import { MatButtonModule } from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon'
import { SocialAuthComponent } from '../../auth/social-auth/social-auth.component'
import { NavItem } from '../navlist.types'
import { NAV_LIST } from '../navlist.constants'
import { AuthService } from '../../auth/auth.service'

@Component({
  selector: 'app-mobile-navlist',
  imports: [
    RouterLink,
    MatListModule,
    MatButtonModule,
    MatIconModule,
    SocialAuthComponent,
  ],
  templateUrl: './mobile-navlist.component.html',
  styleUrl: './mobile-navlist.component.scss',
})
export class MobileNavlistComponent {
  private readonly authService = inject(AuthService)

  navList = signal<NavItem[]>(NAV_LIST)
  currentUser = computed(this.authService.currentUser)

  logout() {
    this.authService.logout()
  }
}
