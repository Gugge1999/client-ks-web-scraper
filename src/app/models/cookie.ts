export const cookieState = {
  Init: "init",
  Rejected: "rejected",
  Accepted: "accepted",
} as const satisfies Record<string, string>;

export const initialCookie = cookieState.Init;
