import { Prisma, Ticket, TicketType } from '@prisma/client';
import enrollmentsService from '../enrollments-service';
import ticketsRepository from '@/repositories/tickets-repository';
import { invalidDataError, notFoundError } from '@/errors';

async function getTickets() {
  const tickets = await ticketsRepository.getTickets();

  if (!tickets) throw notFoundError();

  return tickets;
}

async function getTicketsTypes() {
  const ticketsTypes = await ticketsRepository.getTicketsTypes();

  if (!ticketsTypes) throw notFoundError();

  return ticketsTypes;
}

async function postTickets(ticketTypeId: number, userId: number) {
  const userEnrollment = await enrollmentsService.getOneWithAddressByUserId(userId);

  if (!userEnrollment) throw notFoundError();

  const data: CreateTicketParams = {
    ticketTypeId,
    enrollmentId: userEnrollment.id,
    status: 'RESERVED',
  };

  const ticketType: TicketType = await ticketsRepository.getTicketTypeById(ticketTypeId);

  const ticket: Ticket = await ticketsRepository.create(data);

  return {
    id: ticket.id,
    status: ticket.status,
    ticketTypeId,
    enrollmentId: userEnrollment.id,
    TicketType: ticketType,
    createdAt: ticket.createdAt,
    updatedAt: ticket.updatedAt,
  };
}

export type CreateTicketParams = Pick<Ticket, 'ticketTypeId' | 'enrollmentId' | 'status'>;

const ticketsService = {
  getTickets,
  getTicketsTypes,
  postTickets,
};

export default ticketsService;
