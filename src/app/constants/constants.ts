import { ApiStatus } from "@models/api-status.model";
import { animate, style, transition, trigger } from "@angular/animations";

export const FIREBASE_CONFIG = {
  apiKey: "AIzaSyDJ7ITz4fNpZbOA2IHfhPC_V_KKmrd-Rq8",
  authDomain: "ks-web-scraper.firebaseapp.com",
  projectId: "ks-web-scraper",
  storageBucket: "ks-web-scraper.firebasestorage.app",
  messagingSenderId: "330274214889",
  appId: "1:330274214889:web:2a7f4ec0010d99900bf178",
  measurementId: "G-2M7YJWSQ0F",
} as const;

export const INITIAL_API_STATUS: ApiStatus = {
  status: "pending",
  scrapingIntervalInMinutes: 0,
  memoryUsage: 0,
  uptime: {
    years: 0,
    months: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  },
} as const;

export const ERROR_API_STATUS: ApiStatus = {
  ...INITIAL_API_STATUS,
  status: "inactive",
} as const;

export const STACK_API_ERROR_PROPERTY = "stack";

export const CARD_DATE_FORMAT = "d MMMM yyyy - HH:mm:ss";

export const fadeInAnimation = trigger("fadeInAnimation", [
  transition(":enter", [
    style({
      opacity: 0,
    }),
    animate("500ms ease-in-out", style({ opacity: 1 })),
  ]),
  transition(":leave", [
    style({
      opacity: 1,
    }),
    animate("150ms ease-in-out", style({ opacity: 0 })),
  ]),
]);
