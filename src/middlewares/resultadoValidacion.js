import { validationResult } from "express-validator";



const resultadoValidacion = (req, res, next) => {
    console.log("El patovica esta en la puerta", req.body)
    const errores = validationResult(req)
    if(!errores.isEmpty()){
        return res.status(400).json(errores.array())
    }
    next()
}


export default resultadoValidacion