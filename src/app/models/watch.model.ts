import { isDevMode } from "@angular/core";
import { map, pipe } from "rxjs";
import { array, boolean, object, string, TypeOf, ZodTypeAny } from "zod";

export const ScrapedWatch = object({
  name: string(),

  // TODO: Den här ska vara string().datetime() men den kommer MED tidszon från backend.
  postedDate: string(),
  link: string().url(),
});

export const watchSchema = object({
  id: string().uuid(),
  active: boolean(),
  added: string().datetime(),
  label: string(),
  lastEmailSent: string().datetime().nullable(),
  watchToScrape: string().url(),
  notifications: array(string().datetime()),
  watch: ScrapedWatch,
});

export type Watch = TypeOf<typeof watchSchema>;

// TODO: Det kanske går att lägga till den här i interceptor. Om man inte vill validering en typ går det att använda context tokens. https://angular.dev/guide/http/interceptors#defining-context-tokens
export function verifyResponse<T extends ZodTypeAny>(zodObj: T) {
  return pipe(
    map(response => {
      if (isDevMode()) {
        const result = zodObj.safeParse(response);

        if (!result.success) {
          console.error(result.error);
        }
      }

      return response as TypeOf<T>;
    }),
  );
}
