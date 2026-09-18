import { browser } from '$app/environment';

// Export an object and mutate its properties. You can't reassign an exported $state variable.
export const userMode = $state({ beginner: false });

export function setBeginner(value) {
    userMode.beginner = value;
    if (browser) localStorage.setItem('beginner', String(value));
}

export function loadUserMode() {
    if (browser) userMode.beginner = localStorage.getItem('beginner') === 'true';
}