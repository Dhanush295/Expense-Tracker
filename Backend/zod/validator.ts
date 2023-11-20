import { z } from "zod";

export const userCred = z.object({
    email : z.string().email({ message: "Invalid email address" }).max(25),
    password: z.string().min(5).max(20)
})

export const expense = z.object({
  title :  z.string().min(5).max(20),     
  description :  z.string().min(5).max(30),          
  amount: z.number(),
  type: z.string().min(2).max(10), 
})