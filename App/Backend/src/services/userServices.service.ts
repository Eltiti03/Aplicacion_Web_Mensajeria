// // // App/Backend/src/service/userServices.service.ts

import bcript from "bcrypt";

export class UserServices {
  async passHash(pass: string) {
    const hash = await bcript.hash(pass, 12);

    return hash;
  }

  async passCompare(pass: string, hash: string) {
    const hashVal = await bcript.compare(pass, hash);

    return hashVal;
  }
}
