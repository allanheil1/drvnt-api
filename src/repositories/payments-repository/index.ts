import { Payment } from '@prisma/client';
import { prisma } from '@/config';
import { CreatePaymentData } from '@/controllers';

async function create(ticketId: number, paymentInfo: CreatePaymentData, value: number): Promise<Payment> {
  return prisma.payment.create({
    data: {
      ticketId: ticketId,
      cardIssuer: paymentInfo.cardData.issuer,
      cardLastDigits: String(paymentInfo.cardData.number).slice(-4),
      value: value,
    },
  });
}

async function getPaymentByTicketId(ticketId: number): Promise<Payment> {
  return prisma.payment.findFirst({
    where: { ticketId: ticketId },
  });
}

const paymentsRepository = {
  create,
  getPaymentByTicketId,
};

export default paymentsRepository;
