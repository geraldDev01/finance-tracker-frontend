import PropTypes from "prop-types";
import FeatherIcon from "feather-icons-react";

export const Popup = ({
  isOpen,
  setIsOpen,
  children,
  buttonLabel,
  handleClick,
}) => {
  if (!isOpen) {
    return null;
  }

  const closePopup = () => {
    setIsOpen(false);
  };

  return (
    <div className="popup-container">
      <div className="popup-content">
        <div onClick={closePopup} className="popup-close cursor-pointer">
          <FeatherIcon strokeWidth="1.5" icon="x" />
        </div>
        <section>
          <div className="popup-inner">{children}</div>

          <div className="popup-button">
            <button
              type="submit"
              onClick={handleClick}
              className="btn btn-success bold"
            >
              {buttonLabel}
            </button>
            <button
              type="submit"
              onClick={closePopup}
              className="btn btn-danger bold"
            >
              Cancel
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

Popup.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
  isOpen: PropTypes.bool.isRequired,
  setIsOpen: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  handleClick: PropTypes.func.isRequired,
};
