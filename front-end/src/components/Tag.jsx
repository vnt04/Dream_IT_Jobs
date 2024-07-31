/* eslint-disable react/prop-types */

const Tag = ({ name, url }) => {
  return (
    <a
      className="cursor-pointer rounded-xl border bg-white px-3 text-sm font-semibold text-primary hover:bg-gray-100"
      href={url}
      title={name}
    >
      {name}
    </a>
  );
};

export default Tag;
