import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private mql: MediaQueryList | null = null;
  private storageKey = 'theme';

  // Ensure only <html> carries the 'dark' class; remove from any other common ancestors
  private applyDark(dark: boolean) {
    console.log('🎨 ApplyDark called with:', dark); // DEBUG
    const root = document.documentElement;
    const body = document.body;
    const appRoot = document.querySelector('app-root');
    root.classList.toggle('dark', dark);
    // Cleanup: never leave 'dark' lingering on body/app-root
    body.classList.remove('dark');
    if (appRoot) appRoot.classList.remove('dark');
  }

  init() {
    console.log('🚀 ThemeService.init() called'); // DEBUG
    const saved = localStorage.getItem(this.storageKey) as
      | 'light'
      | 'dark'
      | 'system'
      | null;

    if (saved === 'system') {
      this.attachSystemListener();
      this.applySystem();
    } else if (saved === 'dark' || saved === 'light') {
      this.detachSystemListener();
      // Set without animation on init
      const root = document.documentElement;
      if (saved === 'dark') {
        root.classList.add('dark');
      } else {
        root.classList.remove('dark');
      }
    } else {
      // Default to light unless user sets otherwise
      this.detachSystemListener();
      const root = document.documentElement;
      root.classList.remove('dark');
      localStorage.setItem(this.storageKey, 'light');
    }
  }

  toggle() {
    const current = this.current;
    this.setTheme(current === 'dark' ? 'light' : 'dark');
  }

  setTheme(mode: 'light' | 'dark' | 'system') {
    const root = document.documentElement;
    // add short-lived theming class to scope transitions during toggle
    root.classList.add('theming');
    window.setTimeout(() => root.classList.remove('theming'), 250);

    if (mode === 'dark') {
      this.detachSystemListener();
      this.applyDark(true);
      localStorage.setItem(this.storageKey, 'dark');
    } else if (mode === 'light') {
      this.detachSystemListener();
      this.applyDark(false);
      localStorage.setItem(this.storageKey, 'light');
    } else {
      this.attachSystemListener();
      this.applySystem();
      localStorage.setItem(this.storageKey, 'system');
    }
  }

  private attachSystemListener() {
    if (!window.matchMedia) return;
    // detach any previous handler
    this.detachSystemListener();
    this.mql = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = () => this.applySystem();
    this.mql.addEventListener?.('change', handler as EventListener);
    // Fallback for older Safari
    // @ts-ignore
    this.mql.addListener?.(handler);
    (this as any)._systemHandler = handler;
  }

  private detachSystemListener() {
    if (!this.mql) return;
    const handler = (this as any)._systemHandler as (() => void) | undefined;
    if (handler) {
      this.mql.removeEventListener?.('change', handler as EventListener);
      // @ts-ignore
      this.mql.removeListener?.(handler);
    }
    this.mql = null;
    delete (this as any)._systemHandler;
  }

  applySystem() {
    const prefersDark =
      window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: dark)').matches;
    this.applyDark(prefersDark);
  }

  get current(): 'light' | 'dark' {
    const isDark = document.documentElement.classList.contains('dark');
    return isDark ? 'dark' : 'light';
  }

  getSavedMode(): 'light' | 'dark' | 'system' {
    const saved = localStorage.getItem(this.storageKey) as
      | 'light'
      | 'dark'
      | 'system'
      | null;
    return saved ?? 'light';
  }
}
