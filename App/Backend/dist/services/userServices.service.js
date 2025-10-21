// // // App/Backend/src/service/userServices.service.ts
import bcript from "bcrypt";
export class UserServices {
    async passHash(pass) {
        const hash = await bcript.hash(pass, 12);
        return hash;
    }
    async passCompare(pass, hash) {
        const hashVal = await bcript.compare(pass, hash);
        return hashVal;
    }
}
