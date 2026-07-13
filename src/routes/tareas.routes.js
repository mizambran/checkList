import { Router } from "express";
import { borrarTarea, buscarTarea, crearTarea, editarTarea, listarTareas, tareasPaginado } from "../controllers/tareas.controllers.js";
import validacionTarea from '../middlewares/validacionTarea.js'


const router = Router()

router.route('/').get(listarTareas).post(validacionTarea, crearTarea)

router.route('/paginacion').get(tareasPaginado)

router.route('/:id').get(buscarTarea).put(validacionTarea ,editarTarea).delete(borrarTarea)

export default router