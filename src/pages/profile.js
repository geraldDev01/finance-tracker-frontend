import { useState, useEffect, useCallback } from "react";
import FeatherIcon from "feather-icons-react";
import Navbar from "@/components/Navbar";
import { Table } from "@/components/Table";
import Summary from "@/components/Summary";
import { CreateModalContent } from "@/components/transaction/CreateModalContent";

export default function Profile() {
  const [,] = useState([]);
  const [openModal, setOpenModal] = useState(false);

  const toggleOpenModal = () => setOpenModal((prevState) => !prevState);

  return (
    <div>
      <Navbar username="Username" />
      <section>
        <div className="my-1">
          <Summary />

          <section className="historical-container">
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

            <Table />
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
