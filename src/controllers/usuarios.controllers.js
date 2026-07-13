import { genSaltSync, hashSync } from "bcrypt"
import Usuario from "../models/usuario.js"
import mongoose from "mongoose"


export const crearUsuario = async(req, res) => {
    try {
        const saltos = genSaltSync(10)
        const contraseñaHash = hashSync(req.body.password, saltos)
        req.body.password = contraseñaHash
        const nuevoUsuario = new Usuario(req.body)
        
        const existeElUsuario = await Usuario.findOne({email:req.body.email})
        if(existeElUsuario){
            return res.status(400).json({mensaje:"Ya existe un usuario con este Email"})
        }
        await nuevoUsuario.save()
        res.status(201).json({mensaje:"Se creó un usuario con éxito!"})
    } catch (error) {
        console.error(error)
        res.status(500).json({mensaje:"No se pudo crear el usuario."})
    }
}

export const listarUsuarios = async(req, res) => {
    try {
        const usuarios = await Usuario.find()
        res.status(200).json(usuarios)
    } catch (error) {
        console.error(error)
        res.status(500).json({mensaje:"No se pudo listar los usuarios"})
    }
}

export const buscarUsuario = async(req, res) => {
    try {
        const id = req.params.id;
        if(!mongoose.isValidObjectId(id)){
            return res.status(400).json({mensaje:"El id es invalido"})
        }
        const usuarioEncontrado = await Usuario.findById(id)
        if(!usuarioEncontrado){
            return res.status(404).json({mensaje:"No se encontró el usuario solicitado"})
        }
        res.status(200).json(usuarioEncontrado)
    } catch (error) {
        console.error(error)
        res.status(500).json({mensaje:"No se pudo buscar el usuario."})
    }
}

export const usuarioPaginado = async(req, res) => {
    try {
        const page = req.query.page || 1;
        const limit = req.query.limit || 10;
        const skip = (page - 1) * limit

        const [usuarios, cantidadUsuarios] = await Promise.all([
            Usuario.find().skip(skip).limit(limit),
            Usuario.countDocuments()
        ])
        res.status(200).json({
            usuarios,
            paginaActual: page,
            cantidadUsuarios,
            cantPaginas: Math.ceil(cantidadUsuarios / limit)
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({mensaje:"No se pudo paginar los usuarios"})
    }
}

export const editarUsuario = async(req, res) => {
    try {
        const id = req.params.id
        if(!mongoose.isValidObjectId(id)){
            return res.status(400).json({mensaje:"El id no es válido"})
        }
        const existeElUsuario = await Usuario.findOne({email: req.body.email})
        if(existeElUsuario && existeElUsuario._id.toString() !== id){
            return res.status(400).json({mensaje:"El email ya existe en otro usuario"})
        }
        if(req.body.password){
            const saltos = genSaltSync(10);
            const contraseñaHash = hashSync(req.body.password, saltos)
            req.body.password = contraseñaHash
        }
        const usuarioEncontrado = await Usuario.findByIdAndUpdate(id, req.body, {returnDocument:'after', runValidators:true})
        if(!usuarioEncontrado){
            return res.status(404).json({mensaje:"No se encontró el usuario que estas queriendo editar"})
        }
        res.status(200).json({mensaje:"El usuario se editó correctamente!"})
    } catch (error) {
        console.error(error)
        res.status(500).json({mensaje:"No se pudo editar el usuario"})
    }
}


export const borrarUsuario = async(req, res) => {
    try {
        const id = req.params.id
        if(!mongoose.isValidObjectId(id)){
            return res.status(400).json({mensaje:"El id no es válido!"})
        }
        const usuarioEncontrado = await Usuario.findByIdAndDelete(id)
        if(!usuarioEncontrado){
            return res.status(404).json({mensaje:"No se pudo encontrar el usuario solicitado"}) 
        }
        res.status(200).json({mensaje:"Se eliminó el usuario correctamente"})
    } catch (error) {
        console.error(error)
        res.status(500).json({mensaje:"No se pudo borrar el archivo"})
    }
}