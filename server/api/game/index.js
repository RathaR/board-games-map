import express from 'express';
import controller from './game.controller';

const router = express.Router();

router.get('/initial-state', controller.initialState);

export default router;
