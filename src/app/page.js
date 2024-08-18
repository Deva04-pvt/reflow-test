// src/app/page.js
import DataTable from "../components/DataTable";

const Page = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Data Table</h1>
      <DataTable />
    </div>
  );
};

export default Page;
