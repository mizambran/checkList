import jwt from "jsonwebtoken"


const generarJWT = (id, rol) => {
    try {
        const payload = {id, rol}
        const token = jwt.sign(payload, process.env.SECRETJWT, {expiresIn: "24h"})
        return token
    } catch (error) {
        console.error(error)
        throw new Error("Error al generar token")
    }
}

export default generarJWT