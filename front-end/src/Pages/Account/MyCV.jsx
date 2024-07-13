import { useState } from "react";

function MyCV() {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  return (
    <div>
      <button onClick={handleOpen} className="bg-primary text-white p-2">
        Tạo CV ngay
      </button>
    </div>
  );
}

export default MyCV;
