import { Router } from 'express';

import {
  getHomepage,
  getContactsPage,
} from '../controllers/single-controller';

const router = Router();

router.get('/', getHomepage);
router.get('/contacts', getContactsPage);

export { router };
