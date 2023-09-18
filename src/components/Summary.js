import PropTypes from "prop-types";

const Summary = ({ totalIncome, totalExpense, balance }) => {
  return (
    <section className="balance-container flex flex-col py-2">
      <p className="text-lead">Your Balance</p>
      <h1 className="text-large">
        {balance ? balance.toLocaleString() : 0} US
      </h1>
      <div className="balance-incomes border bg-light">
        <div>
          <p className="bold">Total Incomes</p>
          <p className="success-color text-large">
            {totalIncome ? totalIncome.toLocaleString() : 0}
          </p>
        </div>
        <div>
          <p className="bold">Total Expenses</p>
          <p className="danger-color text-large">
            {totalExpense ? totalExpense.toLocaleString() : 0}
          </p>
        </div>
      </div>
    </section>
  );
};

Summary.propTypes = {
  totalIncome: PropTypes.number.isRequired,
  totalExpense: PropTypes.number.isRequired,
  balance: PropTypes.number.isRequired,
};

export default Summary;
