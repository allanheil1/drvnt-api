import { Prisma, Ticket, TicketType } from '@prisma/client';
import { prisma } from '@/config';
import { CreateTicketParams } from '@/services/tickets-service';
//import { Ticket } from '../../../../drivent-api/node_modules/.prisma/client/index'

//tickets
// id
// "ticketTypeId"
// "enrollmentId"
// status
// "createdAt"
// "updatedAt"

async function create(data: CreateTicketParams): Promise<Ticket> {
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

async function getTicketTypeById(ticketId: number): Promise<TicketType> {
  return prisma.ticketType.findFirst({
    where: {
      id: ticketId,
    },
  });
}

async function getTicketsTypes(): Promise<TicketType[]> {
  return prisma.ticketType.findMany();
}

const ticketsRepository = {
  create,
  getTickets,
  getTicketTypeById,
  getTicketsTypes,
};

export default ticketsRepository;
