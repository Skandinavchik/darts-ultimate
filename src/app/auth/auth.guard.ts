import { inject } from '@angular/core'
import { CanActivateFn, Router } from '@angular/router'
import { AuthService } from './auth.service'
import { catchError, from, map, of, take } from 'rxjs'

export const authGuard: CanActivateFn = () => {
  const router = inject(Router)
  const authService = inject(AuthService)

  return from(authService.supabaseClient.auth.getUser())
    .pipe(
      take(1),
      map(({ data }) => {
        if (!data.user) {
          router.navigateByUrl('/login')
          return false
        }

        return true
      }),
      catchError(() => {
        router.navigateByUrl('/login')
        return of(false)
      }),
    )
}
