import { useState, useEffect } from "react";
import FeatherIcon from "feather-icons-react";
import Navbar from "@/components/Navbar";
import { Popup } from "@/components/Popup";
import { Table } from "@/components/Table";
import { getCategories } from "../services/category";

export default function Profile() {
  // const { user } = useSelector((state) => state.user);
  const [selectedOption, setSelectedOption] = useState("");

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect( () => {
    const test =  loadCategories();
    console.log(test);
  }, []);

  const [openModal, setOpenModal] = useState(false);
  const categories = [
    { name: "Education", icon: "/icons/education.svg" },
    { name: "Food", icon: "/icons/food.svg" },
    { name: "Gas", icon: "/icons/gas.svg" },
    { name: "Home", icon: "/icons/home.svg" },
    // Add more categories as needed
  ];

  const loadCategories = async () => {
    const { data } = await getCategories();
    console.log("data", data);
    if (!data) return;

    // const { results } = data;
    // console

    // if (results && results[0]) {
    //   setCharacter(results[0]);
    // }
  };

  const columns = ["Date", "Description", "Category", "Amount"];

  const toggleOpenModal = () => setOpenModal((prevState) => !prevState);

  const [expenses, setExpenses] = useState([
    // {
    //   id: 1,
    //   date: "2023-09-01",
    //   description: "Groceries",
    //   category: "Food",
    //   amount: 50.0,
    // },
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

          <section className="px-3">
            <div className="flex flex-items-center">
              <h2 className="text-primary mx-1">Historical transaction</h2>
              <button
                onClick={toggleOpenModal}
                className="btn btn-success my-1"
              >
                <span className="flex flex-items-center">
                  <FeatherIcon size="22" icon="plus" />
                  Add
                </span>
              </button>
            </div>

            <Table columns={columns} data={expenses} />
          </section>
        </div>
      </section>
      <Popup
        buttonLabel="Add Transaction"
        isOpen={openModal}
        setIsOpen={toggleOpenModal}
      >
        <h2 className="text-primary mx-1">Create New Transaction</h2>
        <form className="form">
          <div className="form-group">
            <div className="custom-radio-button">
              <label>
                <input
                  type="radio"
                  value="income"
                  checked={selectedOption === "income"}
                  onChange={handleOptionChange}
                  className="radio-input"
                />
                <span className="badge badge-success text-lead">Income</span>
              </label>
              <label>
                <input
                  type="radio"
                  value="expense"
                  checked={selectedOption === "expense"}
                  onChange={handleOptionChange}
                  className="radio-input"
                />
                <span className="badge badge-danger text-lead">Expense</span>
              </label>
            </div>
          </div>

          <div className="form-group">
            <label>Select Category</label>
            <select>
              {categories.map((category, index) => (
                <option key={index} value={category}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label>Add Description</label>
            <textarea name="description" placeholder="Description" />
          </div>
          <div className="form-group">
            <label>Add Amount</label>
            <input name="amount" type="number" placeholder="Amount" />
          </div>
        </form>
      </Popup>
    </div>
  );
}
