import { computed, inject } from '@angular/core'
import { CanActivateFn, Router } from '@angular/router'
import { AuthService } from './auth.service'

export const authGuard: CanActivateFn = () => {
  const router = inject(Router)
  const authService = inject(AuthService)
  const currentUser = computed(authService.currentUser)

  if (!currentUser()) {
    router.navigateByUrl('/login')
    return false
  }

  return true
}
