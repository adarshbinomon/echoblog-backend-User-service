import { HttpStatus } from "../../../utils/enums/http.statuscodes";
import { Dependencies } from "../../../utils/interfaces/dependency.interface";
import { Request, Response } from "express";

export default (dependencies: Dependencies) => {
  const createCheckoutSessionController = async (
    req: Request,
    res: Response
  ) => {
    try {
      const stripe = require("stripe")(
        "sk_test_51PAterSHCEnCTktIWZ0acJdFhN2abOj5dHaDhwQ2QIJvpcIMwQbPBMPy5HUW0dAtUBROgg6jWlGCiAnIK6cNHcY100KVIdJZb8"
      );

      const lineItems = {
        price_data: {
          currency: "inr",
          product_data: {
            name: "One Time Membership",
          },
          unit_amount: 199900,
        },
        quantity: 1,
      };

      const session = await stripe.checkout.sessions.create({ 
        payment_method_types: ["card"],
        line_items: [lineItems],
        mode: "payment",
        success_url: "http://localhost:4001/api/user/premium-success",
        cancel_url: "http://localhost:5173/edit-profile/premium",
      });

      res.status(HttpStatus.OK).json({ id: session.id });
    } catch (error) {
      console.log("error in createCheckoutSessionController ", error);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        status: false,
        message: "error in createCheckoutSessionController",
      });
    }
  };

  return createCheckoutSessionController;
};
