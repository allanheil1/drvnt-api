import { Prisma, Ticket, TicketType } from '@prisma/client';
import { prisma } from '@/config';
//import { Ticket } from '../../../../drivent-api/node_modules/.prisma/client/index'

//tickets
// id
// "ticketTypeId"
// "enrollmentId"
// status
// "createdAt"
// "updatedAt"

async function create(data: Prisma.TicketCreateInput) {
  return prisma.ticket.create({
    data,
  });
}

async function getTickets(): Promise<Ticket> {
  return prisma.ticket.findFirst();
}

//types
// id
// name
// price
// "isRemote"
// "includesHotel"
// "createdAt"
// "updatedAt"

async function getTicketsTypes(): Promise<TicketType[]> {
  return prisma.ticketType.findMany();
}

const ticketsRepository = {
  create,
  getTickets,
  getTicketsTypes,
};

export default ticketsRepository;
