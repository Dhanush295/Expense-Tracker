import { PrismaClient } from '@prisma/client'
import express, {Request, Response} from "express";
import { hashPassword, comparePasswords } from "../middlewear/hash";
import  jwt  from "jsonwebtoken";
import { authenticateJwt, SECRET } from "../middlewear/auth";
import { z } from 'zod/lib';
import { userCred, expense } from '../zod/validator';

const prisma = new PrismaClient()
const router = express.Router();

interface IUserdetails {
    email: string,
    password: string
}

interface  Iexpense {
  title :  string,     
  description :  string,          
  amount:   number,
  date: string,
  type:  string, 
  category:   string
}

router.post('/signup', async (req: Request, res: Response) => {
    try{
      const parsedUser = userCred.safeParse(req.body);
      if (!parsedUser.success || !parsedUser.data.email || !parsedUser.data.password) {
        return res.status(400).json({ message: "Email and Password Required!" });
    }
      const userDetails: IUserdetails = parsedUser.data;
      const userexist = await prisma.user.findFirst({
        where:{
            email: userDetails.email
        }
    });
      if(userexist){
        return res.status(400).json({message: "email Already exist"});
      }
      const hashedPassword = hashPassword(userDetails.password);
      const newUser = await prisma.user.create({
            data:{
                email: userDetails.email,
                password: hashedPassword
            }
        });
      return res.status(200).json({message: "User created successfully!", user: {newUser}});
    } catch (error: any){
      return res.status(400).json({message : error.message});
    }
      
    });
    
    router.post('/login', async (req: Request, res: Response) => {
      try {

        const parsedUser = userCred.safeParse(req.body);
        if (!parsedUser.success || !parsedUser.data.email || !parsedUser.data.password) {
          return res.status(400).json({ message: "Email and Password Required!" });
        }
        const userdetails: IUserdetails = parsedUser.data;
        const userexist = await prisma.user.findFirst({ 
            where:{
                email: userdetails.email
            }
         });
    
        if (!userexist) {
          return res.status(400).json({ message: "User Not Found!" });
        }
    
        const isPasswordMatch = await comparePasswords(userdetails.password, userexist.password);
    
        if (isPasswordMatch) {
          const token = jwt.sign({ id: userexist.id }, SECRET, { expiresIn: '1h' });
          return res.status(200).json({ message: "Logged In Successfully!", token: token });
        } else {
          return res.status(401).json({ message: "Authentication Failed" });
        }
      } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error" });
      }
    });

    router.post('/createexpense',authenticateJwt ,async(req:Request, res: Response)=>{
      try{
        const userId  = req.headers["userId"] as string;
        console.log(userId)
        const parsedExpense = expense.safeParse(req.body);

        if(! parsedExpense.success || !parsedExpense.data || !userId){
          return res.status(400).json({message: "All Filed are required to create expense!"});
        }
        const newExpense: Iexpense = parsedExpense.data;

        const user = await prisma.user.findUnique({
          where: {
            id: parseInt(userId),
          },
        });
    
        if (!user) {
          return res.status(404).json({ message: "User not found" });
        }
    
        const expenseExist = await prisma.expenses.findFirst({
          where: {
            authorId: parseInt(userId),
            title: newExpense.title,
          },
        });
    
        if (expenseExist) {
          return res.status(400).json({ message: "Expense already exists" });
        }
    
        const createExpense = await prisma.expenses.create({
          data: {
            title: newExpense.title,
            description: newExpense.description,
            date: newExpense.date,
            category: newExpense.category,
            amount: newExpense.amount,
            type: newExpense.type,
            author: {
              connect: { id: parseInt(userId) }, 
            },
          },
        });
    
        return res.status(200).json({ message: "Expense created successfully" });
      } catch (error: any) {
        res.status(500).json({ message: error.message });
      }
    });

    router.put('/update/:expenseid',authenticateJwt ,async (req: Request, res: Response) => {
      try{
        const userId  = req.headers["userId"] as string;
        console.log(userId);
        const expenseId = req.params.expenseid ;

        const parsedExpense = expense.safeParse(req.body);

        if(! parsedExpense.success ){
          return res.status(400).json({message: "All Filed are required to create expense!"});
        }
        const newExpense: Iexpense = parsedExpense.data;

        const user = await prisma.user.findUnique({
          where: {
            id: parseInt(userId),
          },
        });
    
        if (!user) {
          return res.status(404).json({ message: "User not found" });
        }

        const updateExpense = await prisma.expenses.findFirst({
          where: {
            id : parseInt(expenseId),
            authorId: parseInt(userId)
            }
        }); 

        if(!updateExpense){
          res.status(404).json({message: "Expense Not Found"})
        }
        const update = await prisma.expenses.update({
          where: { id: parseInt(expenseId) },
          data: {
            title: newExpense.title,
            description: newExpense.description,
            date: newExpense.date,
            category: newExpense.category,
            amount: newExpense.amount,
            type: newExpense.type,
            author: {
              connect: { id: parseInt(userId) }, 
            },
          },
        });
        return res.status(200).json({ message: "Expense Updated successfully" });


      }catch(error: any){
        res.status(400).json({message: error.message})
      }
    });

export default router;