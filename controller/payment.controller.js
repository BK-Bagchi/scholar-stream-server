import Stripe from "stripe";
import Application from "../models/application.model.js";
import Scholarship from "../models/scholarship.model.js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const createSession = async (req, res) => {
  const { scholarshipId, currency = "usd" } = req.body;
  const scholarship = await Scholarship.findById(scholarshipId);

  if (!scholarship)
    return res.status(404).json({ error: "Scholarship not found" });

  const { applicationFees, tuitionFees, serviceCharge } = scholarship;
  const amount =
    Number(applicationFees) + Number(tuitionFees) + Number(serviceCharge);
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
      success_url: `${process.env.FRONTEND_URL}/payment/success?sessionId={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.FRONTEND_URL}/payment/failed`,
    });

    const payment = {
      amount: amountInCents,
      currency,
      stripeSessionId: session.id, // 🔥 Save session ID here
      stripePaymentStatus: "unpaid", // initial
    };

    req.body.payment = payment;
    await Application.create(req.body);

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

    if (session.payment_status === "paid") {
      const application = await Application.findOneAndUpdate(
        { "payment.stripeSessionId": sessionId },
        {
          $set: {
            paymentStatus: "paid",
            "payment.stripePaymentStatus": "paid",
          },
        },
        { new: true }
      ).populate("scholarshipId");

      return res.json({ success: true, application });
    }

    res.json({ success: false });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};
