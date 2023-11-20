import express from "express";
import cors from "cors";
import expenseroutes from "./routes/expense"
const app = express();

app.use(cors());
app.use(express.json());

app.use('/', expenseroutes);

app.listen(3000, ()=> console.log("Server listening on port 3000"));