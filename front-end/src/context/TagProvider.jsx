/* eslint-disable react/prop-types */
import { createContext, useState } from "react";

export const TagContext = createContext();

export const TagProvider = ({ children }) => {
  const [tags, setTags] = useState([]);

  const addTag = (tag) => {
    setTags([...tags, tag]);
  };

  const removeTag = (tagIndex) => {
    setTags(tags.filter((_, index) => index !== tagIndex));
  };

  return (
    <TagContext.Provider value={{ tags, addTag, removeTag }}>
      {children}
    </TagContext.Provider>
  );
};
