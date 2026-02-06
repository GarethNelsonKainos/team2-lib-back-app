import { Router } from 'express';
import * as memberController from '../controllers/memberController';

const router = Router();

router.get('/', memberController.getMembers);
router.get('/:id', memberController.getMemberById);
router.post('/', memberController.createMember);
router.patch('/:id', memberController.updateMember);
router.delete('/:id', memberController.deleteMember);

export default router;
