"use client"
import axios from "axios";
import toast from "react-hot-toast";
// import { useRouter } from "next/navigation";
import { columns } from "./_components/columns";
import { DataTable } from "./_components/data-table";

const CoursePage = () => {
  // const router = useRouter();

 

  return (
    <div className="p-6">
      <DataTable columns={[]} data={[]} />
    </div>
  );
};

export default CoursePage;
