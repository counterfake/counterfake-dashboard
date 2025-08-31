import "server-only";

// Import the Nodemailer library
import nodemailer from "nodemailer";

const service = process.env.EMAIL_SERVICE;
const host = process.env.EMAIL_HOST;
const port = Number(process.env.EMAIL_PORT);
const user = process.env.EMAIL_USER;
const pass = process.env.EMAIL_PASSWORD;

const transportOptions = {
  service,
  host,
  port,
  secure: false, // use false for STARTTLS; true for SSL on port 465
  requireTLS: true,
  auth: {
    user,
    pass,
  },
};

// Create a transporter object
export const emailTransporter = nodemailer.createTransport(transportOptions);
