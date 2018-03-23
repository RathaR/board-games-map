import express from 'express';
import controller from './state.controller';

const router = express.Router();

router.get('/all', controller.getAll);
router.get('/:id', controller.getState);

export default router;
