import { z } from "zod";

export const registerTripSchema = z.object({
  vehicleNumber: z.string().min(1, "Vehicle number is required")
   .min(5, "Vehicle number is too short")
   .max(7, "Vehicle number is too long"),
  entryDate: z.string().min(1, "Entry date & time is required"),
  exitDate: z.string().optional(),
  rcDoc: z.string().min(1, "RC document is required"),
  pucDoc: z.string().min(1, "PUC document is required"),
  insuranceDoc: z.string().min(1, "Insurance document is required"),
  driverName: z.string().min(1, "Driver name is required")
   .min(3, "Driver name is too short")
   .max(50, "Driver name is too long"),
  driverEmail: z.string().email("Invalid email"),
  driverPhone: z.string()
    .min(1, "Phone number is required")
    .min(10, "Phone number is too short")
    .max(11, "Phone number is too long")
    .refine(
      (value) => /^[0-9+]+$/.test(value),
      { message: "Phone number can only contain numbers and '+' symbol" }
    ),
  declaration: z.boolean().refine(val => val === true, {
    message: "You must agree to the declaration"
  }),
});
