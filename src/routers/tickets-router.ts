import { Router } from 'express';
import { getTickets, getTicketsTypes, postTickets } from '@/controllers';
import { authenticateToken, validateBody } from '@/middlewares';
import { createTicketSchema } from '@/schemas/tickets-schema';

const ticketsRouter = Router();

ticketsRouter.all('/*', authenticateToken);
ticketsRouter.get('/', getTickets);
ticketsRouter.get('/types', getTicketsTypes);
ticketsRouter.post('/', validateBody(createTicketSchema), postTickets);

export { ticketsRouter };
