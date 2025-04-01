import { Component, computed, inject, signal, ViewChild } from '@angular/core'
import { Router, RouterLink } from '@angular/router'
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatSlideToggleModule } from '@angular/material/slide-toggle'
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'
import { NavlistComponent } from '../navlist/navlist.component'
import { MatButtonModule } from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon'
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav'
import { MatMenuModule } from '@angular/material/menu'
import { MobileNavlistComponent } from '../mobile-navlist/mobile-navlist.component'
import { ThemeService } from '../../services/theme/theme.service'
import { AuthService } from '../../auth/auth.service'

@Component({
  selector: 'app-navbar',
  imports: [
    RouterLink,
    MatSidenavModule,
    MatToolbarModule,
    MatSlideToggleModule,
    NavlistComponent,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MobileNavlistComponent,
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  private readonly theme = inject(ThemeService)
  private readonly breakpointObserver = inject(BreakpointObserver)
  private readonly router = inject(Router)
  private readonly authService = inject(AuthService)

  @ViewChild('sidenav') sidenav?: MatSidenav

  isXSmall = signal(false)
  currentTheme = computed(() => this.theme.getCurrentThemeMode())
  currentUser = computed(this.authService.currentUser)
  themeIcon = computed(() => this.currentTheme() === 'light-mode' ? 'dark_mode' : 'light_mode')

  constructor() {
    this.breakpointObserver
      .observe([Breakpoints.XSmall, Breakpoints.Small])
      .pipe(takeUntilDestroyed())
      .subscribe(({ matches }) => {
        this.isXSmall.set(matches)
        if (!matches) this.sidenav?.close()
      })
  }

  toggleTheme() {
    this.theme.toggleThemeMode()
  }

  logout() {
    this.authService.logout()
    this.router.navigateByUrl('/')
  }
}
