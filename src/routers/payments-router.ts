import { Router } from 'express';
import { authenticateToken, validateBody } from '@/middlewares';
import { paymentSchema } from '@/schemas/payments-schema';
import { getPaymentByTicketId, postPayment } from '@/controllers';

const paymentsRouter = Router();

paymentsRouter.all('/*', authenticateToken);
paymentsRouter.get('/', getPaymentByTicketId);
paymentsRouter.post('/process', validateBody(paymentSchema), postPayment);

export { paymentsRouter };
