// eslint-disable-next-line react/prop-types
const InputTemplate = ({ title, id, type, name, placeholder }) => {
  return (
    <div className="mb-3">
      <label className="block text-gray-700 text-sm font-bold mb-2">
        {title}
      </label>
      <input
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        name={name}
        id={id}
        type={type}
        placeholder={placeholder}
      />
    </div>
  );
};

export default InputTemplate;
