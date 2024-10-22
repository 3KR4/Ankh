import { Resend } from "resend";
import EmailTemplate from "../../_components/EmailTemplate";

const resend = new Resend('re_PxZHRwaR_84zTsVLacaTZhs5Gja3hfLQC');

export async function POST(Request) {
  try {
    const { fullName, email, state, planName, option, planFeatures, planExtraPrice, totalprice } = await Request.json();

    // Send email to your company
    const dataForCompany = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: ["mouhamedmahmoud820@gmail.com"], // Company email
      subject: "New Purchase",
      react: EmailTemplate({
        fullName,
        email,
        state,
        planName,
        option,
        planFeatures,
        planExtraPrice,
        totalprice,
        recipientType: "company", // Pass recipient type for company
      }),
    });

    // Send email to the client
    const dataForClient = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: ["mouhamedmahmoud820@gmail.com"], // Client's email
      subject: "Payment Successful!",
      react: EmailTemplate({
        fullName,
        email,
        state,
        planName,
        option,
        planFeatures,
        planExtraPrice,
        totalprice,
        recipientType: "client", // Pass recipient type for client
      }),
    });

    return new Response(JSON.stringify({ dataForCompany, dataForClient }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
