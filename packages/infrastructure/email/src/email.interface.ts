export interface IConfirmationCodeEmail {
  to: string;
  data: {
    confirmationCode: string;
  };
}

export interface IResetPasswordEmail {
  to: string;
  data: {
    resetCode: string;
  };
}


export interface IOrderCreatedEmail {
  to: string;
  data: {
    exchangeOrderId: string;
    exchangeOrderMessage: string;
    symbol: string;
    action: string;
    type: string;
    quantity: string;
    price: string;
    triggerTime: string;
    executedTime: string;
    strategyId: string;
  };
}

export interface IOrderCreatedFailEmail {
  to: string;
  data: {
    exchangeOrderId: string;
    exchangeOrderMessage: string;
    symbol: string;
    action: string;
    type: string;
    quantity: string;
    price: string;
    triggerTime: string;
    executedTime: string;
    strategyId: string;
  };
}

export interface IEmailService {
  sendConfirmationCodeEmail(email: IConfirmationCodeEmail): Promise<boolean>;
  sendResetPasswordEmail(email: IResetPasswordEmail): Promise<boolean>;
  sendOrderCreatedEmail(email: IOrderCreatedEmail): Promise<boolean>;
  sendOrderCreatedFailEmail(email: IOrderCreatedFailEmail): Promise<boolean>;
}

export const IEmailService = Symbol('IEmailService');
