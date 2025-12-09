import Stripe from "stripe";
import Application from "../models/application.model.js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const createSession = async (req, res) => {
  const { scholarshipId, amount, currency = "usd" } = req.body;
  const amountInCents = amount * 100;

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: currency || "usd",
            product_data: {
              name: `Scholarship Application - ${scholarshipId}`,
            },
            unit_amount: amountInCents,
          },
          quantity: 1,
        },
      ],
      success_url: `${process.env.FRONTEND_URL}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.FRONTEND_URL}/payment-cancel`,
    });

    res.json({ url: session.url });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Something went wrong" });
  }
};

export const checkSession = async (req, res) => {
  const { sessionId } = req.params;
  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    // Optionally fetch application by metadata
    const appId = session.metadata?.applicationId;
    const application = appId ? await Application.findById(appId) : null;
    return res.json({ session, application });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};
// https://chatgpt.com/s/t_6937f29c5b448191aac5271fc07f805c
