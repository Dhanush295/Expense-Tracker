import { selector } from "recoil";
import axios from 'axios';

export  const transactionQuery = selector({
    key: "transactionQuery",
    get: async() =>{
        const transHistory = await axios.get("http://localhost:3000/getexpenses", {
            headers: {
                "authorization": "Bearer " + localStorage.getItem("key"),
            },
            });
            return transHistory.data.history || [];
    }
}) ; 