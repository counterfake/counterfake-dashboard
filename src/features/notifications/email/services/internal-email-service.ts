import { sendEmail } from "../server/actions/internal-email";

import { BETA_FEEDBACK_EMAIL_RECIPIENTS } from "../config/internal-email";

export class InternalEmailService {
  sendBetaFeedback = async (
    feedback: string,
    user: { name: string; brandName: string }
  ) => {
    try {
      const html = `
    <h1>This email is sent from Counterfake Beta Feedback Form for New Counterfake App</h1>
    <br />
    <p><strong>Username:</strong> ${user.name}</p>
    <p><strong>User Brand:</strong> ${user.brandName}</p>
    <br />
    <p><strong>User Feedback Message:</strong> ${feedback}</p>
    `;

      await sendEmail({
        to: BETA_FEEDBACK_EMAIL_RECIPIENTS,
        subject: "Counterfake Beta Feedback",
        text: `${user.name} from ${user.brandName} - ${feedback}`,
        html,
      });

      return {
        success: true,
      };
    } catch (error) {
      console.error("Error sending feedback:", error);

      return {
        success: false,
      };
    }
  };
}

export const internalEmailService = new InternalEmailService();
