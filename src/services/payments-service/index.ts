import { Ticket, Payment, Enrollment, TicketType } from '@prisma/client';
import { notFoundError, unauthorizedError } from '@/errors';
import ticketsRepository from '@/repositories/tickets-repository';
import paymentsRepository from '@/repositories/payments-repository';
import enrollmentRepository from '@/repositories/enrollment-repository';
import { CreatePaymentData } from '@/controllers';

async function getPaymentByTicketId(ticketId: number, userId: number) {
  const ticket: Ticket = await ticketsRepository.getTicketById(ticketId);
  if (!ticket) throw notFoundError();

  const enrollment: Enrollment = await enrollmentRepository.getEnrollmentById(ticket.enrollmentId);
  if (!enrollment) throw notFoundError();
  if (enrollment.userId !== userId) throw unauthorizedError();

  const payment: Payment = await paymentsRepository.getPaymentByTicketId(ticketId);

  return payment;
}

async function postPayment(paymentInfo: CreatePaymentData, userId: number) {
  const ticketId: number = paymentInfo.ticketId;
  const ticket: Ticket = await ticketsRepository.getTicketById(ticketId);
  if (!ticket) throw notFoundError();

  const enrollment: Enrollment = await enrollmentRepository.getEnrollmentById(ticket.enrollmentId);
  if (!enrollment) throw notFoundError();

  if (userId !== enrollment.userId) throw unauthorizedError();

  const ticketType: TicketType = await ticketsRepository.getTicketTypeById(ticket.ticketTypeId);

  await ticketsRepository.updateTicketToPaid(ticketId);

  return await paymentsRepository.create(ticketId, paymentInfo, ticketType.price);
}

const paymentsService = {
  getPaymentByTicketId,
  postPayment,
};

export default paymentsService;
