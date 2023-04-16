import { Payment } from '@prisma/client';
import { prisma } from '@/config';

// async function create(data: Payment): Promise<Payment> {
//   return prisma.payment.create({
//     data,
//   });
// }

async function getPaymentByTicketId(ticketId: number): Promise<Payment> {
  return prisma.payment.findFirst({
    where: { ticketId: ticketId },
  });
}

const paymentsRepository = {
  // create,
  getPaymentByTicketId,
};

export default paymentsRepository;
