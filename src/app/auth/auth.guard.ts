import { inject } from '@angular/core'
import { CanActivateFn, Router } from '@angular/router'
import { AuthService } from './auth.service'
import { catchError, from, map, of, take } from 'rxjs'

export const authGuard: CanActivateFn = () => {
  const router = inject(Router)
  const authService = inject(AuthService)

  return from(authService.supabaseClient.auth.getSession())
    .pipe(
      take(1),
      map(({ data }) => {
        if (data.session) return true
        router.navigateByUrl('/login')
        return false
      }),
      catchError(() => {
        router.navigateByUrl('/login')
        return of(false)
      }),
    )
}
