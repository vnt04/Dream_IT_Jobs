/* eslint-disable react/prop-types */
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";

function PopUp({ isOpen, onClose, content, position }) {
  return (
    <Popup open={isOpen} onClose={onClose} position={position}>
      <div>
        <button onClick={onClose} className="close">
          X
        </button>
        {content}
      </div>
    </Popup>
  );
}

export default PopUp;
