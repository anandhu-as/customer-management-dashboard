import { z } from "zod";
//for input validation....
export const customerSchema = z.object({
    name: z.string().min(3, "Customer name must be atleast 3 characters"),
    email: z.string().email("Invalid email address"),
    phone: z.string().min(10, "phone number is too short!!"),
    company: z.string().min(1, "Company is required"),
    lastContactDate: z.string().min(1, "Last contact date is required"),
    status: z.enum(["Active", "Inactive", "Prospect", "Archive"]).default("Active"),
    notes: z.string().max(50, "Notes cannot exceed 50 characters").optional(),
});

export type CustomerFormData = z.infer<typeof customerSchema>;