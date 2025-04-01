import { Component, inject, OnInit } from '@angular/core'
import { RouterOutlet } from '@angular/router'
import { MatSidenavModule } from '@angular/material/sidenav'
import { MatButtonModule } from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon'
import { MatToolbarModule } from '@angular/material/toolbar'
import { NavbarComponent } from './navigation/navbar/navbar.component'
import { AuthService } from './auth/auth.service'

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    NavbarComponent,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  authService = inject(AuthService)

  ngOnInit() {
    this.authService.supabaseClient.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN') {
        this.authService.currentUser.set({ fullname: session?.user.user_metadata['full_name'] })
      }

      if (event === 'SIGNED_OUT') this.authService.currentUser.set(null)
    })
  }
}
