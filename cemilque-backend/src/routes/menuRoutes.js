// src/routes/menuRoutes.js
import express from 'express';
import * as menuController from '../controllers/menuController.js';

const router = express.Router();

router.get('/menus', menuController.getAllMenusHandler);
router.get('/menus/:id', menuController.getMenuByIdHandler);
router.post('/menus', menuController.createMenuHandler);
router.put('/menus/:id', menuController.updateMenuHandler);
router.delete('/menus/:id', menuController.deleteMenuHandler);


export default router;
