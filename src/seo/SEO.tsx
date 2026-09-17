import React from "react";
export const SEO: React.FC<{ title: string; description: string }> = ({ title, description }) => {
  React.useEffect(() => {
    document.title = `${title} | Techno World BD`;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute("content", description);
  }, [title, description]);
  return null;
};
