import { inject, Injectable, signal } from '@angular/core'
import { AuthResponse, createClient, Provider } from '@supabase/supabase-js'
import { from, Observable } from 'rxjs'
import { FormControl } from '@angular/forms'
import { Router } from '@angular/router'
import { environment } from '../../environments/environment'

const { url, key } = environment.supabase

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  supabaseClient = createClient(url, key)
  router = inject(Router)

  currentUser = signal<string | null>(null)
  private errorMessage = signal({
    fullname: '',
    email: '',
    password: '',
  })

  registerUser(email: string, password: string, fullname: string ): Observable<AuthResponse> {
    const promise = this.supabaseClient.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullname,
        },
      },
    })

    return from(promise)
  }

  login(email: string, password: string): Observable<AuthResponse> {
    const promise = this.supabaseClient.auth.signInWithPassword({
      email,
      password,
    })

    return from(promise)
  }

  logout() {
    this.supabaseClient.auth.signOut()
    this.router.navigateByUrl('/')
  }

  signInWithSocial(provider: Provider) {
    const { redirectTo } = environment
    return from(this.supabaseClient.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo,
      },
    }))
  }

  handleErrorMessage(name: string, control: FormControl<string>) {
    let message = ''

    switch (name) {
      case 'fullname':
        if (control.hasError('required')) {
          message = 'Full name is required'
        }
        break
      case 'email':
        if (control.hasError('required')) {
          message = 'Email is required'
        } else if (control.hasError('email')) {
          message = 'Invalid email'
        }
        break
      case 'password':
        if (control.hasError('required')) {
          message = 'Password is required'
        } else if (control.hasError('minlength')) {
          message = 'Password must be at least 8 characters'
        }
        break
    }

    this.errorMessage.update(prev => ({ ...prev, [name]: message }))
  }

  getErrorMessage() {
    return this.errorMessage
  }

  transformUserInputs(userInput: { email: string, password: string, fullname?: string }) {
    const { email, password, fullname = '' } = userInput
    return {
      email: email.trim().toLowerCase(),
      password: password.trim(),
      fullname: fullname?.trim(),
    }
  }
}
