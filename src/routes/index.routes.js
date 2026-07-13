import { Router } from "express";
import tareasRoutes from './tareas.routes.js'


const router = Router()

router.use('/tareas', tareasRoutes)

export default router