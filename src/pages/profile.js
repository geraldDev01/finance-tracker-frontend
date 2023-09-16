import { useState } from "react";
import Navbar from "../components/Navbar";

export default function Profile() {
  // const { user } = useSelector((state) => state.user);
  const [expenses, setExpenses] = useState([
    {
      id: 1,
      date: "2023-09-01",
      description: "Groceries",
      category: "Food",
      amount: 50.0,
    },
  ]);
  return (
    <div>
      <Navbar username="Username" />
      <section className="">
        <div className="my-1">
          {/* <div className="bg-primary p-2">
          <h1 className="text-large">Gerald Solano</h1>
          <p className="text-lead">user</p>
        </div> */}

          <section className="balance-container flex flex-col py-2">
            <p className="text-lead">Your Balance</p>
            <h1 className="text-large">0 us</h1>
            <div className="balance-incomes border bg-light">
              <div>
                <p className="bold">Total Incomes</p>
                <p className="success-color text-large">0.00</p>
              </div>
              <div>
                <p className="bold">Total Expenses</p>
                <p className="danger-color text-large">0.00</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-primary my-1">Historical</h2>
            {/* <div className="my-1 p-1">
            <ul>
              <li className="badge badge-success">Balance: 500 us</li>
              <li className="badge badge-danger">Date: 19/23/2013</li>
              <li className="badge badge-dark">expense:400</li>
            </ul>
          </div> */}

            <table>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Description</th>
                  <th>Category</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                {expenses.map((expense) => (
                  <tr key={expense.id}>
                    <td>{expense.date}</td>
                    <td>{expense.description}</td>
                    <td>{expense.category}</td>
                    <td>{expense.amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        </div>
      </section>
    </div>
  );
}
