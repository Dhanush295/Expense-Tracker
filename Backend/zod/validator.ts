import { z } from "zod";

export const userCred = z.object({
    email : z.string().email({ message: "Invalid email address" }).max(25),
    password: z.string().min(5).max(20)
})

export const expense = z.object({
  title :  z.string().min(5 ,{ message: "Must be 5 or more characters long" }).max(50),     
  description :  z.string().min(5, { message: "Must be 5 or more characters long" }).max(50),          
  amount: z.number().int(),
  type: z.string().min(5, { message: "Must be 5 or more characters long" }).max(50), 
  date: z.string().datetime(),
  category: z.string().min(5, { message: "Must be 5 or more characters long" }). max(55),
})