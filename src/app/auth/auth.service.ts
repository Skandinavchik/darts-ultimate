import { Injectable, signal } from '@angular/core'
import { AuthResponse, createClient } from '@supabase/supabase-js'
import { environment } from '../../environments/environment'
import { from, Observable } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  supabaseClient = createClient(environment.supabaseUrl, environment.supabaseKey)
  currentUser = signal<{ fullname: string } | null>(null)

  registerUser(email: string, password: string, fullname: string ): Observable<AuthResponse> {
    const promise = this.supabaseClient.auth.signUp({
      email,
      password,
      options: {
        data: {
          fullname,
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
  }
}
