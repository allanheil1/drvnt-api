import { Ticket, TicketType } from '@prisma/client';
import { prisma } from '@/config';
import { CreateTicketParams } from '@/services/tickets-service';

async function create(data: CreateTicketParams): Promise<Ticket> {
  return prisma.ticket.create({
    data,
  });
}

async function getTickets(): Promise<Ticket> {
  return prisma.ticket.findFirst();
}

async function getTicketById(ticketId: number): Promise<Ticket> {
  return prisma.ticket.findFirst({
    where: {
      id: ticketId,
    },
  });
}

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

async function updateTicketToPaid(ticketId: number): Promise<Ticket> {
  return await prisma.ticket.update({
    where: {
      id: ticketId,
    },
    data: {
      status: 'PAID',
    },
  });
}

const ticketsRepository = {
  create,
  getTickets,
  getTicketById,
  getTicketTypeById,
  getTicketsTypes,
  updateTicketToPaid,
};

export default ticketsRepository;
