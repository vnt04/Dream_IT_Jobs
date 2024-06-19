// eslint-disable-next-line react/prop-types
const Tag = ({name, url}) => {
  return (
    <a
      className="px-2 rounded text-[#1047b2] border bg-blue-100 hover:border-blue-600"
      href={url}
    >
      {name}
    </a>
  );
};

export default Tag;
