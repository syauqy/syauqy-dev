import * as React from "react";

export const Page: React.FC = ({ children }) => {
  return (
    <section className="flex flex-col flex-1 pt-8 pb-2 bg-gray-100">
      {children}
    </section>
  );
};
