import { Resend } from "resend";

export const resend = new Resend(process.env.RESEND_API_KEY);

// Until custom domain is verified, Resend only allows sending from onboarding@resend.dev
export const FROM_EMAIL = "La Tabla <onboarding@resend.dev>";
