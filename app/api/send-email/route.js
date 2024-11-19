import { Resend } from "resend";
import EmailTemplate from "../../_components/EmailTemplate";

const resend = new Resend('re_GwvpQ5dE_CjFsCByDxcXFQcjeGtvWownC');

export async function POST(Request) {
  try {
    const { fullName, email, state, planName, agent, dataTeam, resources, acquisitionTeam, totalprice } = await Request.json();

    // Send email to your company
    const dataForCompany = await resend.emails.send({
      from: "Ankhcallcenter@ankhcallcenter.com",
      to: ["info@ankhcallcenter.com"],
      subject: "New Purchase",
      react: EmailTemplate({
        fullName,
        email,
        state,
        planName,
        agent,
        dataTeam,
        resources,
        acquisitionTeam,
        totalprice,
        recipientType: "company",
      }),
    });


    const dataForClient = await resend.emails.send({
      from: "Ankhcallcenter@ankhcallcenter.com",
      to: [email],
      subject: "Payment Successful!",
      react: EmailTemplate({
        planName,
        agent,
        dataTeam,
        resources,
        acquisitionTeam,
        totalprice,
        recipientType: "client",
      }),
    });

    return new Response(JSON.stringify({ dataForCompany, dataForClient }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
