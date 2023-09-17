import { useState, useEffect, useCallback } from "react";
import FeatherIcon from "feather-icons-react";
import Navbar from "@/components/Navbar";
import { Table } from "@/components/Table";
import Summary from "@/components/Summary";
import { getAllTransactions } from "@/services/transaction";
import { CreateModalContent } from "@/components/transaction/CreateModalContent";

export default function Profile() {
  const columns = ["Date", "Description", "Category", "Type", "Amount"];
  const [expenses, setExpenses] = useState([]);
  const [openModal, setOpenModal] = useState(false);

  const loadTransactions = useCallback(async () => {
    try {
      const transactions = await getAllTransactions();
      if (transactions) {
        setExpenses(transactions);
      }
    } catch (error) {
      console.error("Error loading transactions:", error);
    }
  }, []);
  
  useEffect(() => {
    loadTransactions();
  }, [loadTransactions]);

  const toggleOpenModal = () => setOpenModal((prevState) => !prevState);

  return (
    <div>
      <Navbar username="Username" />
      <section className="">
        <div className="my-1">
          <Summary />

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
      <CreateModalContent
        openModal={openModal}
        toggleOpenModal={toggleOpenModal}
      />
    </div>
  );
}
