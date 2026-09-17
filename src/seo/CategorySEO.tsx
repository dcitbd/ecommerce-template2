import React from "react";
export const CategorySEO: React.FC<{ categoryName: string }> = ({ categoryName }) => {
  React.useEffect(() => {
    document.title = `${categoryName} কালেকশন ও প্রাইস | Techno World BD`;
  }, [categoryName]);
  return null;
};
