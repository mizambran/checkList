import { Router } from "express";
import tareasRoutes from './tareas.routes.js'
import usuariosRoutes from './usuarios.routes.js'

const router = Router()

router.use('/tareas', tareasRoutes)
router.use('/usuarios', usuariosRoutes)

export default router