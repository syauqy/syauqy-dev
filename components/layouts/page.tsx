import * as React from "react";

export const Page: React.FC = ({ children }) => {
  return (
    <section className="flex flex-col flex-1 pb-16 pt-16 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
      {children}
    </section>
  );
};
