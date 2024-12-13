import React from "react";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full">
      <main className="md:pl-56 pt-20 h-full">{children}</main>
    </div>
  );
};

export default DashboardLayout;
