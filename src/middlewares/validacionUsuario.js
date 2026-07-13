import { body } from "express-validator";
import resultadoValidacion from './resultadoValidacion.js'

const validacionUsuario = [
    body("email")
    .trim()
    .notEmpty().withMessage("Email es un campo obligatorio")
    .isEmail().withMessage("Debe tener un formato de email válido"),

    body("password")
    .trim()
    .notEmpty().withMessage("Contraseña es un campo obligatorio")
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d\W_]{8,64}$/)
    .withMessage("La contraseña debe tener entre 8 y 64 caracteres, incluir al menos una mayúscula, una minúscula y un número."),

    resultadoValidacion
]

export default validacionUsuario