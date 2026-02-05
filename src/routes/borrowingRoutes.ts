import { Router } from 'express';
import * as borrowingController from '../controllers/borrowingController';

const router = Router();

router.post('/borrow', borrowingController.borrowBook);
router.patch('/return/:id', borrowingController.returnBook);

export default router;
