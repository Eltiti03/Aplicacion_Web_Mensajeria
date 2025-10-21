// // App/Backend/src/models/interfaces/user.interface.ts

export interface client {
  ID?: string;
  MAIL: string;
  PASS_HASH: string;
  CREATED_AT?: Date;
}
