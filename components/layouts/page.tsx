import * as React from "react";

interface PageProps {
  children: React.ReactNode;
}

export const Page: React.FC<PageProps> = ({ children }) => {
  return (
    <section className="flex flex-col flex-1 pt-8 pb-2 bg-gray-100">
      {children}
    </section>
  );
};
