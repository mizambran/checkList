import mongoose, { Schema } from "mongoose";


const usuarioEsquema = new Schema({
    email:{
        type:String,
        validate:{
            validator:(valor) => {
                return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(valor)
            },
            message:"El formato de email no es valido"
        },
        required:true,
        unique:true
    },
    password:{    
        type:String,
        required:true,
        select:false
    }
},
    {
    timestamps:true
    }
)

const Usuario = mongoose.model('usuario', usuarioEsquema)

export default Usuario