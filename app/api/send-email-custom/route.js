import { Resend } from "resend";
import CustomPlanTemplate from '../../_components/CustomPlanTemplate'
const resend = new Resend('re_PxZHRwaR_84zTsVLacaTZhs5Gja3hfLQC');

export async function POST(Request) {
  try {
    const { name, email, state, message, agents, dataTeam } = await Request.json();

    const dataForCompany = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: ["mouhamedmahmoud820@gmail.com"],
      subject: "New Custom Order",
      react: CustomPlanTemplate({
        name,
        email,
        state,
        message,
        agents,
        dataTeam,
        recipientType: "company",
      }),
    });

    const dataForClient = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: ["mouhamedmahmoud820@gmail.com"],
      subject: "Your request has reached us",
      react: CustomPlanTemplate({
        name,
        agents,
        dataTeam,
        recipientType: "client",
      }),
    });

    return new Response(JSON.stringify({ dataForCompany, dataForClient }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
