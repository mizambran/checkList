import { Router } from "express";
import { borrarUsuario, buscarUsuario, crearUsuario, editarUsuario, listarUsuarios, usuarioPaginado } from "../controllers/usuarios.controllers.js";
import validacionUsuario from "../middlewares/validacionUsuario.js";



const router = Router()

// validacionUsuario toma la contraseña en texto plano y valida si cumple la regex, luego recien pasar a crearUsuario que la hashea
router.route('/').get(listarUsuarios).post(validacionUsuario, crearUsuario)

router.route('/paginacion').get(usuarioPaginado)

router.route('/:id').get(buscarUsuario).put(validacionUsuario, editarUsuario).delete(borrarUsuario)

export default router