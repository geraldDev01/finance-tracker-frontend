import { Popup } from "../Popup";
import { PropTypes } from "prop-types";
import { deleteTransaction } from "@/services/transaction";
import { showToast } from "@/utils";
import Image from "next/image";
import trashIcon from "@/assets/images/trash.svg";

export const ConfirmAlert = ({
  openAlert,
  toggleOpenAlert,
  loadTransactions,
  id,
}) => {
  const handleRequestClick = async () => {
    const response = await deleteTransaction(id);
    if (response) {
      showToast("Transaction Deleted", "success");
    }
    toggleOpenAlert();
    loadTransactions();
  };

  return (
    <Popup
      buttonLabel="Yes delete"
      isOpen={openAlert}
      setIsOpen={toggleOpenAlert}
      handleClick={handleRequestClick}
    >
      <Image width={50} priority src={trashIcon} alt="trash Icon" />
      <h2 className="text-primary mx-1">Delete this transaction?</h2>
    </Popup>
  );
};

ConfirmAlert.propTypes = {
  id: PropTypes.number,
  openAlert: PropTypes.bool.isRequired,
  toggleOpenAlert: PropTypes.func.isRequired,
  loadTransactions: PropTypes.func.isRequired,
};

export default ConfirmAlert;
