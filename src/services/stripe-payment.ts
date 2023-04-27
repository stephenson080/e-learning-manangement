import { Stripe } from "stripe";
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const stripePaymentInstance = new Stripe(process.env.SECRET_KEY as string, {
  apiVersion: "2022-11-15",
});

export default class StripePaymentService {
  async initiatePayment(email: string, amount: number) {
    const customer = await stripePaymentInstance.customers.create();
    const ephemeralKey = await stripePaymentInstance.ephemeralKeys.create({
      customer: customer.id,
    });
    const paymentIntent = await stripePaymentInstance.paymentIntents.create({
      amount: amount,
      currency: "usd",
      customer: customer.id,
      automatic_payment_methods: {
        enabled: true,
      },
    });

    return {
      paymentIntent: paymentIntent.client_secret,
      ephemeralKey: ephemeralKey.secret,
      customer: customer.id,
      publishableKey: process.env.PUBLIC_KEY as string,
    };
  }
}
