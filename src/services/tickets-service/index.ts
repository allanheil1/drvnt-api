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

  const enrollmentId = userEnrollment.id;

  await ticketsService.postTickets(ticketTypeId, enrollmentId);
}

const ticketsService = {
  getTickets,
  getTicketsTypes,
  postTickets,
};

export default ticketsService;
