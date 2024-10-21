import { Resend } from "resend";
import { EmailTemplate } from "../../_components/EmailTemplate";

const resend = new Resend('re_PxZHRwaR_84zTsVLacaTZhs5Gja3hfLQC');

export async function POST() {
  try {
    // Static or predefined values for email content
    const clientInfo = {
      name: "John Doe",
      email: "mouhamedmahmoud820@gmail.com",
      state: "NY",
    };

    const selectedPlan = {
      planName: "Gold Plan",
      option: { name: "1 Agent", discount: 10 },
      features: {
        feature1: { name: "Feature A", price: 20 },
        feature2: { name: "Feature B", price: 30 },
      },
      extraPrice: [
        { name: "Extra Support", price: 15 },
      ],
    };

    // Render EmailTemplate as a string
    const emailContent = EmailTemplate({ clientInfo, selectedPlan });

    const data = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: ["mouhamedmahmoud820@gmail.com"],
      subject: "New Payment From Ankh",
      react: emailContent, 
    });

    return Response.json(data);
  } catch (error) {
    return Response.json({ error });
  }
}
