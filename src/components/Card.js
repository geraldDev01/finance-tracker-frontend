import { PropTypes } from "prop-types";

export const Card = ({ data }) => {
  const { id, description, category, amount, type } = data;
  const colorValidation =
    type === "Expense" ? "danger-color bold" : "success-color";

  return (
    <div
      className={`card ${
        type === "Expense" ? "border-danger" : "border-success"
      }`}
    >
      <div className="card-header">
        <div>
          <p className={`bold ${colorValidation}`}>{type}</p>
          <span className="bold"> ID: {id}</span>

          <p className="card-description">Description: {description}</p>

          <p className="card-category bold primary-color">
            Category: {category}
          </p>
        </div>
        <span className="card-date bold">
          <p className={colorValidation}>${amount} US</p>
        </span>
      </div>
    </div>
  );
};

Card.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.number.isRequired,
    date: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    amount: PropTypes.number.isRequired,
    type: PropTypes.string.isRequired,
  }).isRequired,
};
