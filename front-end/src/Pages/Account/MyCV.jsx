import { useState } from "react";
import PopUp from "../../components/PopUp";

function MyCV() {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  return (
    <div>
      <button onClick={handleOpen} className="bg-primary text-white p-2">
        Tạo CV ngay
      </button>
      <PopUp isOpen={isOpen} onClose={handleClose} />
    </div>
  );
}

export default MyCV;
