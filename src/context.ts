export interface GqlContext {
  authorization: string;
}

export const context: GqlContext = { authorization: "Bearer goes here!" };
