import { Component, signal } from '@angular/core'
import { RouterLink } from '@angular/router'
import { MatListModule } from '@angular/material/list'
import { MatButtonModule } from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon'
import { SocialAuthComponent } from '../../auth/social-auth/social-auth.component'
import { NavItem } from '../navlist.types'
import { NAV_LIST } from '../navlist.constants'

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
  navList = signal<NavItem[]>(NAV_LIST)
}
