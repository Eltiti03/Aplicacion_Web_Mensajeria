import { Chat_Web } from "../models/mariaDB/mChats.js";
import { validateUser } from "../models/validations/schemas.js";
export class cChatsWeb {
    static async cpostaggClient(req, res) {
        // try {
        const result = validateUser(req.body);
        if (!result.success) {
            return res
                .status(401)
                .json({ error: "Digite los datos correctamente... (aggClient)" });
        }
        const caggClient = await Chat_Web.postaggClient(result.data);
        return res.status(201).json(caggClient);
        // } catch (error) {
        return res
            .status(500)
            .json({ error: "Error en el servidor!! (aggClient)" });
        //}
    }
}
