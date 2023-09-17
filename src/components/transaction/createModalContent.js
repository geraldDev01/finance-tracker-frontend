import { useEffect, useState } from "react";
import { getCategories } from "@/services/category";
import { Popup } from "../Popup";
import { PropTypes } from "prop-types";
import { createTransaction } from "@/services/transaction";
import { showToast } from "@/utils";

export const CreateModalContent = ({ openModal, toggleOpenModal }) => {
  const initialState = {
    category: "",
    type: "",
    amount: "",
    description: "",
  };
  const [data, setData] = useState(initialState);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      const categories = await getCategories();
      if (categories) {
        setCategories(categories);
      }
    } catch (error) {
      console.error("Error loading Categories:", error);
    }
  };

  const handleChange = (event) => {
    setData({
      ...data,
      [event.target.name]: event.target.value,
    });
  };

  const handleRequestClick = async (e) => {
    e.preventDefault();

    const response = await createTransaction(data);
    if (response) {
      setData(() => {
        return initialState;
      });
      showToast("Transaction Created", "success");
    }
    toggleOpenModal();
  };

  return (
    <Popup
      buttonLabel="Add Transaction"
      isOpen={openModal}
      setIsOpen={toggleOpenModal}
      handleClick={handleRequestClick}
    >
      <h2 className="text-primary mx-1">Create New Transaction</h2>
      <form onSubmit={(e) => console.log(e)} className="form">
        <div className="form-group">
          <label>Select Category</label>
          <select name="category" onChange={handleChange}>
            {categories.map((category, index) => (
              <option key={index} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Add Description</label>
          <textarea
            name="description"
            placeholder="Description"
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Add Amount</label>
          <input
            name="amount"
            type="number"
            placeholder="Amount"
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <div className="custom-radio-button mt-1">
            <label>
              <input
                name="type"
                type="radio"
                value="1"
                className="radio-input"
              />
              <span className="badge badge-success text-lead">Income</span>
            </label>
            <label>
              <input
                name="type"
                type="radio"
                value="2"
                onChange={handleChange}
                className="radio-input"
              />
              <span className="badge badge-danger text-lead">Expense</span>
            </label>
          </div>
        </div>
      </form>
    </Popup>
  );
};

CreateModalContent.propTypes = {
  openModal: PropTypes.bool.isRequired,
  toggleOpenModal: PropTypes.func.isRequired,
};

export default CreateModalContent;
