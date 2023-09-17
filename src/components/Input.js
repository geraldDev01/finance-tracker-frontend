import PropTypes from "prop-types";

export const Input = ({ type, label, name, onChange, value }) => {
  const renderControl = () => {
    if (type === "password") {
      return (
        <input type={type} name={name} value={value} onChange={onChange} />
      );
    }
    if (type === "textarea") {
      return <textarea name={name} onChange={onChange} />;
    }
    return <input name={name} type="text" value={value} onChange={onChange} />;
  };

  return (
    <span>
      <label className="font-lead">{label}</label>
      {renderControl()}
    </span>
  );
};

Input.defaultProps = {
  onChange: () => {},
};

Input.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  type: PropTypes.oneOf(["text", "textarea", "password"]).isRequired,
  onChange: PropTypes.func,
  value: PropTypes.string,
};
