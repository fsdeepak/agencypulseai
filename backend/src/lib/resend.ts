import "dotenv/config";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API);

const sender = "Agency Pulse AI <hello@velisvital.com>";

export { resend, sender };
