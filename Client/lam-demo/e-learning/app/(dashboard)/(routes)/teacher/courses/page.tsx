import axios from "axios";
import toast from "react-hot-toast";
// import { useRouter } from "next/navigation";
import { columns } from "./_components/columns";
import { DataTable } from "./_components/data-table";

const CoursePage = () => {
  // const router = useRouter();

  const Click = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("No token found. Please log in.");
        return;
      }

      const response = await axios.post(
        "https://97b6-118-71-221-87.ngrok-free.app/course/create",
        {}, // Empty body (if needed, you can add data here)
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include token in headers
          },
        }
      );

      console.log(response);

      // router.push(`/teacher/courses/${response.data.courseID}/create`);

      toast.success("Course created");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="p-6">
      <DataTable columns={[]} data={[]} />
    </div>
  );
};

export default CoursePage;
