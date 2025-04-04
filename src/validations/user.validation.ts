import { z } from "zod";

const registerUserValidation = z.object({
  name: z.string().min(2, { message: "Name must be 2 or more charecters long"}),
  email: z.string().email({ message: "Invalid email address"}),
  password: z.string().min(8, { message: "Password must be 8 or more charecters long"}),
  role: z.enum(["CUSTOMER", "ADMIN"], { required_error: "Role is required"})
});

const loginUserValidation = z.object({
  email: z.string().email(),
  password: z.string()
});

export { 
  registerUserValidation,
  loginUserValidation
};