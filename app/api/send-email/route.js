import { Resend } from "resend";
import EmailTemplate from "../../_components/EmailTemplate";

const resend = new Resend('re_PxZHRwaR_84zTsVLacaTZhs5Gja3hfLQC');

export async function POST(Request) {
  try {
    const { fullName, email, state, planName, option, planFeatures, planExtraPrice, totalprice } = await Request.json();

    const data = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: "mouhamedmahmoud820@gmail.com",
      subject: "New Payment From Ankh",
      react: EmailTemplate({ fullName, email, state, planName, option, planFeatures, planExtraPrice, totalprice }),
    });

    return new Response(JSON.stringify(data), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
