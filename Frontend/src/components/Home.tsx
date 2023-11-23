import React from "react";
import { useRecoilValueLoadable } from "recoil";
import { transactionQuery } from "../store/selector/transSelector";

interface Transaction {
  id: number; 
  title: string;
}
export function Home() {
  const transHistoryLoadable = useRecoilValueLoadable<Transaction[]>(transactionQuery);

  const transHistory = transHistoryLoadable.state === 'hasValue' ? transHistoryLoadable.contents : [];

  const renderTransaction = () => {
    if (transHistory.length > 0) {
      return transHistory.map((trans: Transaction) => (
        <div key={trans.id}>
          <div>ID: {trans.id}</div>
          <div>Title: {trans.title}</div>
          {/* <div>Description: {trans.description}</div>
          <div>Date: {trans.date}</div>
          <div>Amount: {trans.amount}</div>
          <div>Type: {trans.type}</div>
          <div>Category: {trans.category}</div> */}
        </div>
      ));
    } else {
      return <div>No transaction data available</div>;
    }
  };

  return (
    <div>
      <h1>Transaction History</h1>
      {transHistoryLoadable.state === 'loading' ? <div>Loading...</div> : renderTransaction()}
      {transHistoryLoadable.state === 'hasError' && <div>Error fetching data</div>}
    </div>
  );
}
