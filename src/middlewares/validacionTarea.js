import { body } from "express-validator"
import resultadoValidacion from "./resultadoValidacion.js";


const validacionTarea = [
    body("nombre")
    .trim()
    .notEmpty().withMessage("No puede estar vacio")
    .isLength({min:3, max:20}),

    body("estado")
    .notEmpty().withMessage("No puede estar vacio")
    .isIn(["Por hacer", "En proceso", "Finalizada", "Anulada"]).withMessage("Tenes que elegir una opción"),

    body("fecha_inicio")
    .notEmpty().withMessage("La fecha de inicio es obligatoria")
    .isISO8601().withMessage("Debe ser una fecha válida (Formato recomendado: AAAA-MM-DD)")
    .toDate(),

    body("fecha_entrega")
    .notEmpty().withMessage("Fecha de entrega es obligatoria")
    .isISO8601().withMessage("Debe ser una fecha válida (Formato recomendado: AAAA-MM-DD)")
    .toDate() // Lo pasamos a objeto Date
    .custom((fechaEntrega, {req}) => {

        // 1. Nos aseguramos de que el usuario haya mandado la fecha_inicio
        if(!req.body.fecha_inicio){
            // Si no mandó fecha de inicio, dejamos que el validador de fecha_inicio tire su propio error
            return true
        }
        // 2. Transformamos la fecha_inicio a un objeto Date real para poder compararlas matemáticamente
        const fechaInicio = new Date(req.body.fecha_inicio);
        // 3. Hacemos la comparación lógica
        if(fechaEntrega < fechaInicio){
            throw new Error("La fecha de entrega no puede ser menor a la fecha de inicio")
        }
        // Si pasó la prueba, retornamos true para que el validador dé luz verde
        return true 
    }),
    resultadoValidacion
]

export default validacionTarea