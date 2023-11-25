import { selector } from "recoil";
import axios from 'axios';
import { allExpenseState } from "../atom/transAtom";

export  const transactionQuery = selector({
    key: "transactionQuery",
    get: ({get})=>{
        const state = get(allExpenseState);
        if(state.expenses){
            return state.expenses
        }
        else
        {
            return []
        }
       
    }
}) ; 