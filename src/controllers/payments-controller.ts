import { Response } from 'express';
import httpStatus from 'http-status';
import paymentsService from '@/services/payments-service';
import { AuthenticatedRequest } from '@/middlewares';
import { badRequestError } from '@/errors';

export async function getPaymentByTicketId(req: AuthenticatedRequest, res: Response) {
  const ticketId = Number(req.query.ticketId);
  const userId: number = req.userId;

  try {
    if (!ticketId) throw badRequestError();
    const payment = await paymentsService.getPaymentByTicketId(ticketId, userId);
    return res.status(httpStatus.OK).send(payment);
  } catch (error) {
    if (error.name === 'BadRequestError') {
      return res.sendStatus(httpStatus.BAD_REQUEST);
    }
    if (error.name === 'NotFoundError') {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }
    if (error.name === 'UnauthorizedError') {
      return res.sendStatus(httpStatus.UNAUTHORIZED);
    }
    return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  }
}

export type CreatePaymentData = {
  ticketId: number;
  cardData: {
    issuer: string;
    number: number;
    name: string;
    expirationDate: Date;
    cvv: number;
  };
};

export async function postPayment(req: AuthenticatedRequest, res: Response) {
  const userId: number = req.userId;
  const paymentInfo: CreatePaymentData = req.body;
  try {
    const payment = await paymentsService.postPayment(paymentInfo, userId);
    return res.status(httpStatus.OK).send(payment);
  } catch (error) {
    if (error.name === 'NotFoundError') {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }
    if (error.name === 'UnauthorizedError') {
      return res.sendStatus(httpStatus.UNAUTHORIZED);
    }
    return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  }
}
