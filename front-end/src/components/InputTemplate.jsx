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
      <label className="label-input-style">{title}</label>

      {isTextArea ? (
        <textarea
          className="input-style"
          name={name}
          id={id}
          title={title}
          type={type}
          placeholder={placeholder}
          cols={cols}
          rows={rows}
        ></textarea>
      ) : (
        <input
          className="input-style"
          name={name}
          id={id}
          title={title}
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
