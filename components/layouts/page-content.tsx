import React from "react";

interface PageContentProps {
  children: React.ReactNode;
}

export const PageContent: React.FC<PageContentProps> = ({ children }) => {
  return <div className="flex-1">{children}</div>;
};
