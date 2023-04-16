import { Ticket, Payment, Enrollment } from '@prisma/client';
import { notFoundError, unauthorizedError } from '@/errors';
import ticketsRepository from '@/repositories/tickets-repository';
import paymentsRepository from '@/repositories/payments-repository';
import enrollmentRepository from '@/repositories/enrollment-repository';

async function getPaymentByTicketId(ticketId: number, userId: number) {
  const ticket: Ticket = await ticketsRepository.getTicketById(ticketId);
  if (!ticket) throw notFoundError();

  const enrollment: Enrollment = await enrollmentRepository.getEnrollmentById(ticket.enrollmentId);
  if (!enrollment) throw notFoundError();
  if (enrollment.userId !== userId) throw unauthorizedError();

  const payment: Payment = await paymentsRepository.getPaymentByTicketId(ticketId);

  return payment;
}

// async function postPayment() {

// }

const paymentsService = {
  getPaymentByTicketId,
  // postPayment,
};

export default paymentsService;
