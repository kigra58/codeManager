import { z } from "zod";

export const registerTripSchema = z.object({
  vehicleNumber: z.string().min(1, "Vehicle number is required"),
  entryDate: z.string().min(1, "Entry date & time is required"),
  exitDate: z.string().optional(),
  rcDoc: z.string().min(1, "RC document is required"),
  pucDoc: z.string().min(1, "PUC document is required"),
  insuranceDoc: z.string().min(1, "Insurance document is required"),
  driverName: z.string().min(1, "Driver name is required"),
  driverEmail: z.string().email("Invalid email"),
  driverPhone: z.string().min(10, "Phone number is required"),
  declaration: z.boolean().refine(val => val === true, {
    message: "You must agree to the declaration"
  }),
});
