import { z } from "zod";

export const registerTripSchema = z.object({
  vehicleNumber: z.string().min(1, "Vehicle number is required")
   .length(10, "Vehicle number must be exactly 10 characters")
   .refine(
     (value) => /^[A-Z]{2}\d{2}[A-Z]{2}\d{4}$/.test(value),
     { message: "Vehicle number must be in format XX00XX0000 (e.g., DL01AB1234)" }
   )
   .refine(
     (value) => /^[A-Z0-9]+$/.test(value),
     { message: "Vehicle number can only contain uppercase letters and numbers" }
   ),
  entryDate: z.string().min(1, "Entry date & time is required"),
  exitDate: z.string().optional(),
  rcDoc: z.string().min(1, "RC document is required"),
  pucDoc: z.string().min(1, "PUC document is required"),
  insuranceDoc: z.string().min(1, "Insurance document is required"),
  driverName: z.string().min(1, "Driver name is required")
   .min(3, "Driver name is too short")
   .max(50, "Driver name is too long")
   .refine(
     (value) => /^[a-zA-Z\s]+$/.test(value),
     { message: "Driver name can only contain letters and spaces" }
   ),
  driverEmail: z.string().email("Invalid email"),
  driverPhone: z.string()
    .min(1, "Phone number is required")
    .min(10, "Phone number is too short")
    .max(11, "Phone number is too long")
    .refine(
      (value) => /^[0-9+]+$/.test(value),
      { message: "Phone number can only contain numbers and '+' symbol" }
    ),
  driverLicenseNumber: z.string()
    .min(1, "Driver's license number is required")
    .length(14, "Driver's license number must be exactly 14 characters")
    .refine(
      (value) => /^DL-\d{11}$/.test(value),
      { message: "Driver's license number must be in format DL-00000000000" }
    )
    .refine(
      (value) => /^[A-Z0-9-]+$/.test(value),
      { message: "Driver's license number can only contain letters, numbers, and hyphen" }
    ),
  declaration: z.boolean().refine(val => val === true, {
    message: "You must agree to the declaration"
  }),
}).refine((data) => {
  // Skip validation if exitDate is not provided
  if (!data.exitDate) return true;
  
  // Compare dates only if both dates are provided
  if (data.entryDate && data.exitDate) {
    const entryDate = new Date(data.entryDate);
    const exitDate = new Date(data.exitDate);
    
    // Check if exit date is strictly greater than entry date
    // This ensures they can't be equal
    const timeDifference = exitDate.getTime() - entryDate.getTime();
    return timeDifference > 0;
  }
  
  return true;
}, {
  message: "Exit date & time must be after entry date & time",
  path: ["exitDate"], // This will show the error on the exitDate field
});
