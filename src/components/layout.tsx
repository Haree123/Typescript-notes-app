import { ReactNode } from "react";

type LayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="my-6 px-4 sm:px-6 md:px-8 lg:px-24 xl:px-48 2xl:px-60">
      {children}
    </div>
  );
};

export default Layout;
