import { z } from "zod";

interface ValidationConfig {
  nameMinLength: number;
  nameMinError: string;
  emailInvalidError: string;
  messageMinLength: number;
  messageMinError: string;
  companyMinLength: number;
  companyRequiredError: string;
  phoneMinLength: number;
  phoneRequiredError: string;
  countryMinLength: number;
  countryRequiredError: string;
  honeypotMaxLength: number;
}

export const createGeneralEnquirySchema = (config: ValidationConfig) =>
  z.object({
    name: z.string().min(config.nameMinLength, config.nameMinError),
    email: z.email(config.emailInvalidError),
    phone: z.string().optional(),
    message: z.string().min(config.messageMinLength, config.messageMinError),
    honeypot: z.string().max(config.honeypotMaxLength).optional(),
  });

export const createTradeEnquirySchema = (config: ValidationConfig) =>
  z.object({
    name: z.string().min(config.nameMinLength, config.nameMinError),
    company: z.string().min(config.companyMinLength, config.companyRequiredError),
    role: z.string().optional(),
    email: z.email(config.emailInvalidError),
    phone: z.string().min(config.phoneMinLength, config.phoneRequiredError),
    country: z.string().min(config.countryMinLength, config.countryRequiredError),
    productInterest: z.array(z.string()).optional(),
    quantity: z.string().optional(),
    message: z.string().min(config.messageMinLength, config.messageMinError),
    honeypot: z.string().max(config.honeypotMaxLength).optional(),
  });

export type GeneralEnquiryInput = z.infer<ReturnType<typeof createGeneralEnquirySchema>>;
export type TradeEnquiryInput = z.infer<ReturnType<typeof createTradeEnquirySchema>>;
