import { Dependencies } from "../../../utils/interfaces/dependency.interface";
const stripe = require("stripe")(
  "sk_test_51PAterSHCEnCTktIWZ0acJdFhN2abOj5dHaDhwQ2QIJvpcIMwQbPBMPy5HUW0dAtUBROgg6jWlGCiAnIK6cNHcY100KVIdJZb8"
);
export const createCheckoutSessionUseCase = (dependencies: Dependencies) => {
  const {
    repository: { userRepository },
  } = dependencies;

  const executeFunction = async () => {
    const lineItems = {
      price_data: {
        currency: "inr",
        product_data: {
          name: "Monthly Plan",
        },
        unit_amount: 199,
      },
      quantity: 1,
    };
  };
};
