/* eslint-disable react/prop-types */
const InputTemplate = ({
  title,
  id,
  type,
  name,
  placeholder,
  isTextArea,
  cols,
  rows,
  value,
}) => {
  return (
    <div className="mb-3">
      <label className="mb-2 block text-sm font-bold text-gray-700">
        {title}
      </label>
      {isTextArea ? (
        <textarea
          className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
          name={name}
          id={id}
          type={type}
          placeholder={placeholder}
          cols={cols}
          rows={rows}
        ></textarea>
      ) : (
        <input
          className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
          name={name}
          id={id}
          type={type}
          placeholder={placeholder}
          required
          value={value}
        />
      )}
    </div>
  );
};

export default InputTemplate;
