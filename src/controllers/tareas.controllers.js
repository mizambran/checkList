import mongoose, { mongo } from "mongoose"
import Tarea from "../models/tarea.js"



export const crearTarea = async(req, res) => {
    try {
        // A revisar porque el usuario se baña todos los días 
        const existeLaTarea = await Tarea.findOne({nombre: req.body.nombre})
        if(existeLaTarea){
            return res.status(400).json({mensaje:"Ya existe una tarea con este nombre"})
        }
        const nuevaTarea = new Tarea(req.body)
        await nuevaTarea.save()
        res.status(201).json({mensaje:"Se creó la tarea con éxito!"})
    } catch (error) {
        console.error(error)
        res.status(500).json({mensaje:"No se pudó crear la tarea"})
    }
}

export const listarTareas = async(req, res) => {
    try {
        const tareas = await Tarea.find()
        res.status(200).json(tareas)
    } catch (error) {
        console.error(error)
        res.status(500).json({mensaje:"No se pudo listar las tareas"})
    }
}

export const buscarTarea = async(req, res) => {
    try {
        const id = req.params.id
        if(!mongoose.isValidObjectId(id)){
            return res.status(400).json({mensaje:"El id no es válido"}) 
        }
        const tareaEncontrada = await Tarea.findById(id)
        if(!tareaEncontrada){
            return res.status(404).json({mensaje:"No se encontró la tarea solicitada"})
        }
        res.status(200).json(tareaEncontrada)
    } catch (error) {
        console.error(error)
        res.status(500).json({mensaje:"No se pudo buscar la tarea"})
    }
}

export const tareasPaginado = async(req, res) => {
    try {
        const page = req.query.page || 1;
        const limit = req.query.limit || 10;
        const skip = (page - 1) * limit;

        const [tareas, cantidadTareas] = await Promise.all([
            Tarea.find().skip(skip).limit(limit),
            Tarea.countDocuments()
        ])
        res.status(200).json({
            tareas,
            paginaActual: page,
            cantidadTareas,
            cantPaginas: Math.ceil(cantidadTareas / limit)
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({mensaje:"No se pudo hacer el paginado"})
    }
}

export const borrarTarea = async(req,res) => {
    try {
        const id = req.params.id
        if(!mongoose.isValidObjectId(id)){
            return res.status(400).json({mensaje:"El id no es válido"})
        }
        const tareaEncontrada = await Tarea.findByIdAndDelete(id)
        if(!tareaEncontrada){
            return res.status(404).json({mensaje:"No se encontró la tarea"})
        }
        res.status(200).json({mensaje:"Se eliminó la tarea correctamente!"})
    } catch (error) {
        console.error(error)
        res.status(500).json({mensaje:"No se pudo eliminar la tarea"})
    }
}

export const editarTarea = async(req, res) => {
    try {
        const id = req.params.id;
        if(!mongoose.isValidObjectId(id)){
            return res.status(400).json({mensaje:"El id no es válido"})
        }
        const existeLaTarea = await Tarea.findOne({nombre:req.body.nombre})
        if(existeLaTarea && existeLaTarea._id.toString() !== id){
            return res.status(400).json({mensaje:"Hay otra tarea con ese nombre"})
        }
        const tareaEncontrada = await Tarea.findByIdAndUpdate(id, req.body, {returnDocument:'after', runValidators:true})
        if(!tareaEncontrada){
            return res.status(404).json({mensaje:"No se encontró la tarea solicitada"})
        }
        res.status(200).json({mensaje:"Se editó correctamente!"})
    } catch (error) {
        console.error(error)
        res.status(500).json({mensaje:"No se pudo editar la tarea"})
    }
}