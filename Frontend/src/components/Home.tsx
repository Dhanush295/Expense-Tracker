import React from "react";
import { useRecoilValueLoadable} from "recoil";
import { transactionQuery } from "../store/selector/transSelector";



export function Home() {
    const transHistory = useRecoilValueLoadable(transactionQuery);
  
    const renderTransaction = () => {
      switch (transHistory.state) {
        case "hasValue":
          return transHistory.contents.map((trans) => {
            return <div>h1{trans.id}</div>;
          });
        default:
        case "loading":
        case "hasError":
          return <div>Loading...</div>;
      }
    };
  
    return <h1>hiii</h1>;
}