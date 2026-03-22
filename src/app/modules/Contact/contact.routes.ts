// Contact Routes
import express from 'express';
import { ContactController } from './contact.controller';
import validateRequest from '../../middlewares/validateRequest';
import { ContactValidation } from './contact.validation';
import { contactRateLimiter } from '../../middlewares/rateLimiter';

const router = express.Router();

// POST /api/contact - Contact form submit (rate limited)
router.post(
    '/',
    contactRateLimiter,
    validateRequest(ContactValidation.contactSchema),
    ContactController.submitContact
);

export const contactRoutes = router;
