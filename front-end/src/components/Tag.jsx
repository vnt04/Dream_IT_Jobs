/* eslint-disable react/prop-types */

const Tag = ({ name }) => {
  return (
    <a
      className="cursor-pointer rounded-xl border bg-white px-3 text-sm font-semibold text-primary hover:bg-gray-100"
      href={`http://localhost:5173/viec-lam-it?tech=${name}`}
      title={name}
    >
      {name}
    </a>
  );
};

export default Tag;
