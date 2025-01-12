import { isDevMode } from "@angular/core";
import { map, pipe } from "rxjs";
// import { array, boolean, object, string, TypeOf, ZodTypeAny } from "zod";
import * as v from "valibot";

// export const ScrapedWatch = object({
//   name: string(),
//
//   // TODO: Den här ska vara string().datetime() men den kommer MED tidszon från backend.
//   postedDate: string(),
//   link: string().url(),
// });
//
// export const watchSchema = object({
//   id: string().uuid(),
//   active: boolean(),
//   added: string().datetime(),
//   label: string(),
//   lastEmailSent: string().datetime().nullable(),
//   watchToScrape: string().url(),
//   notifications: array(string().datetime()),
//   watch: ScrapedWatch,
// });
//
// export type WatchGammal = TypeOf<typeof watchSchema>;
//
// // TODO: Det kanske går att lägga till den här i interceptor. Om man inte vill validering en typ går det att använda context tokens. https://angular.dev/guide/http/interceptors#defining-context-tokens
// export function verifyResponse<T extends ZodTypeAny>(zodObj: T) {
//   return pipe(
//     map(response => {
//       if (isDevMode()) {
//         const result = zodObj.safeParse(response);
//
//         if (!result.success) {
//           console.error(result.error);
//         }
//       }
//
//       return response as TypeOf<T>;
//     }),
//   );
// }

export const ScrapedWatchNy = v.object({
  name: v.string(),

  // TODO: Den här ska vara string().datetime() men den kommer MED tidszon från backend.
  postedDate: v.string(),
  link: v.pipe(v.string(), v.url()),
});

export const watchSchemaNy = v.object({
  id: v.pipe(v.string(), v.uuid()),
  active: v.boolean(),
  added: v.pipe(v.string(), v.isoTimestamp()),
  label: v.string(),
  lastEmailSent: v.nullable(v.pipe(v.string(), v.isoTimestamp())),
  watchToScrape: v.pipe(v.string(), v.url()),
  notifications: v.array(v.pipe(v.string(), v.isoTimestamp())),
  watch: ScrapedWatchNy,
});

export type Watch = v.InferInput<typeof watchSchemaNy>;

export function verifyResponseNy(schema: any) {
  return pipe(
    map(response => {
      if (isDevMode()) {
        const result = v.safeParse(schema, response);

        if (!result.success) {
          console.error("valibot error", result.issues);
        }
      }

      return response as any;
    }),
  );
}
