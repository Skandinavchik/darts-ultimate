import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core'
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms'
import { Router, RouterLink } from '@angular/router'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { MatButtonModule } from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon'
import { SocialAuthComponent } from '../social-auth/social-auth.component'
import { AuthService } from '../auth.service'
import { tap } from 'rxjs'

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
  private readonly formBuilder = inject(FormBuilder)
  private readonly router = inject(Router)
  isLoading = signal(false)
  errorMessage: string | null = null

  signUpForm = this.formBuilder.nonNullable.group({
    fullname: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  })

  onSubmit() {
    if (this.signUpForm.invalid) return
    const { email, password, fullname } = this.signUpForm.getRawValue()

    this.authService.registerUser(email, password, fullname)
      .pipe(
        tap(() => this.isLoading.set(true)),
      )
      .subscribe(({ error }) => {
        this.isLoading.set(false)

        if (error) return

        this.router.navigateByUrl('/')
      })
  }
}
