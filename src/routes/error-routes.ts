import { Router } from 'express';

export const router = Router();

const { getErrorPage } = require('../controllers/error-controller');

router.use(getErrorPage);
