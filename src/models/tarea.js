import mongoose, { Schema } from "mongoose";



const tareaEsquema = new Schema({
    nombre:{
        type:String,
        minLength:3,
        maxLength:20,
        required:true,
        unique:true
    },
    estado:{
        type:String,
        enum: ["Por hacer", "En proceso", "Finalizada", "Anulada"],
        required:true
    },
    fecha_inicio:{
        type: Date,
        required:true
    },
    fecha_entrega:{
        type:Date,
        required:true
    }},
    {
    timestamps:true
    }
)

const Tarea = mongoose.model('tarea', tareaEsquema)

export default Tarea