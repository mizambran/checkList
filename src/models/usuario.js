import mongoose, { Schema } from "mongoose";


const usuarioEsquema = new Schema({
    email:{
        type:String,
        validate:{
            validator:(valor) => {
                return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(valor)
            }
        },
        required:true,
        unique:true
    },
    contraseña:{    
        type:String,
        required:true
    }
},
    {
    timestamps:true
    }
)

const Usuario = mongoose.model('usuario', usuarioEsquema)

export default Usuario