import React from "react";
import UserTable from "../../components/UserTable";

const AdminPage = () => {
  return (
    <div>
      <h1
        className="padding-x text-darker-gray-medium font-bold text-2xl
      my-4"
      >
        User details and permission
      </h1>
      <UserTable />
    </div>
  );
};

export default AdminPage;
