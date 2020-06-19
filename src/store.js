import { writable } from 'svelte/store';

export const apiKeyStore = writable('');

export const apiUrlStore = writable('https://ewserver.di.unimi.it/mobicomp/mostri');

export const mapElementsStore = writable([]);

export const profileDataStore = writable(0);
