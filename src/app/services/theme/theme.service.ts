import { effect, Injectable, signal } from '@angular/core'
import { ThemeMode } from './theme.type'

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private readonly THEME_KEY = 'theme-mode'
  private readonly themeMode = signal<ThemeMode>(this.getInitialMode())

  constructor() {
    effect(() => {
      const mode = this.themeMode()
      this.updateDOM(mode)
      this.persistMode(mode)
    })
  }

  private getInitialMode(): ThemeMode {
    const stored = localStorage.getItem(this.THEME_KEY) as ThemeMode | null
    return stored ?? 'light-mode'
  }

  private updateDOM(mode: ThemeMode): void {
    document.documentElement.classList.toggle('dark-mode', mode === 'dark-mode')
  }

  private persistMode(mode: ThemeMode): void {
    mode === 'dark-mode'
      ? localStorage.setItem(this.THEME_KEY, mode)
      : localStorage.removeItem(this.THEME_KEY)
  }

  getCurrentThemeMode() {
    return this.themeMode()
  }

  toggleThemeMode(): void {
    this.themeMode.set(this.themeMode() === 'light-mode' ? 'dark-mode' : 'light-mode')
  }
}
