import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core'
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms'
import { Router, RouterLink } from '@angular/router'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { MatButtonModule } from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon'
import { SocialAuthComponent } from '../social-auth/social-auth.component'
import { AuthService } from '../auth.service'
import { merge } from 'rxjs'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'

@Component({
  selector: 'app-sign-up',
  imports: [
    ReactiveFormsModule,
    RouterLink,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    SocialAuthComponent,
  ],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignUpComponent {
  private readonly authService = inject(AuthService)
  private readonly formBuilder = inject(NonNullableFormBuilder)
  private readonly router = inject(Router)

  handleErrorMessage = this.authService.handleErrorMessage
  errorMessage = this.authService.getErrorMessage()
  isLoading = signal(false)

  signUpForm = this.formBuilder.group({
    fullname: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
  })

  constructor() {
    Object.entries(this.signUpForm.controls).forEach(([name, control]) => {
      merge(control.statusChanges, control.valueChanges)
        .pipe(takeUntilDestroyed())
        .subscribe(() => this.authService.handleErrorMessage(name, control))
    })
  }

  onSubmit() {
    if (this.signUpForm.invalid) return
    const { email, password, fullname } = this.signUpForm.getRawValue()

    this.isLoading.set(true)
    this.authService.registerUser(email, password, fullname)
      .subscribe(({ error }) => {
        this.isLoading.set(false)
        if (error) return

        this.router.navigateByUrl('/profile')
      })
  }
}
