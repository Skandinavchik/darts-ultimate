import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core'
import { Router, RouterLink } from '@angular/router'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { MatButtonModule } from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon'
import { SocialAuthComponent } from '../social-auth/social-auth.component'
import { AuthService } from '../auth.service'
import { NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'

@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule,
    RouterLink,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    SocialAuthComponent,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  private readonly authService = inject(AuthService)
  private readonly formBuilder = inject(NonNullableFormBuilder)
  private readonly router = inject(Router)

  handleErrorMessage = this.authService.handleErrorMessage
  errorMessage = signal<string | null>(null)
  isLoading = signal(false)

  loginForm = this.formBuilder.group({
    email: [''],
    password: [''],
  })

  constructor() {
    this.loginForm.valueChanges
      .pipe(takeUntilDestroyed())
      .subscribe(() => {
        if (this.errorMessage()) this.errorMessage.set(null)
      })
  }

  onSubmit() {
    if (this.loginForm.invalid) return
    const { email, password } = this.loginForm.getRawValue()

    this.isLoading.set(true)
    this.authService.login(email, password)
      .subscribe(({ error }) => {
        this.isLoading.set(false)
        if (error) {
          this.errorMessage.set('Invalid email or password')
          return
        }

        this.errorMessage.set(null)

        this.router.navigateByUrl('/profile')
      })
  }
}
