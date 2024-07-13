/* eslint-disable react/prop-types */

function CustomModal({ title, body, footerActions, show, handleClose }) {
  if (!show) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div
        className="fixed inset-0 bg-black opacity-50"
        onClick={handleClose}
      ></div>
      <div className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-all max-w-lg w-full animate-slide-down">
        <div className="border-b px-4 py-2 flex justify-between items-center">
          <h2 className="text-xl font-semibold">{title}</h2>
          <button
            onClick={handleClose}
            className="text-black hover:text-red-500 text-2xl"
          >
            &times;
          </button>
        </div>
        <div className="p-4">{body}</div>
        <div className="border-t px-4 py-2 flex justify-end">
          {footerActions.map((action, index) => (
            <button
              key={index}
              className={`ml-2 px-4 py-2 rounded ${
                action.variant === "primary"
                  ? "bg-primary text-white"
                  : "bg-gray-300 text-black"
              }`}
              onClick={action.onClick}
            >
              {action.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CustomModal;
