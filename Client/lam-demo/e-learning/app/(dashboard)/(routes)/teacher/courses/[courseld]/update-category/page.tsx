// import { useRouter } from "next/navigation";
import { CategoryForm } from "../_components/category-form";

const UpdateCategoryPage = ({ params }: { params: { id: string } }) => {
  const { id } = params;

  const categoryOptions = [
    { label: "Programming", value: "1" },
    { label: "Design", value: "2" },
    { label: "Marketing", value: "3" },
    { label: "Business", value: "4" },
  ];

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-2xl font-bold">Update Category for Course {id}</h1>
      <CategoryForm courseId={id} option={categoryOptions} />
    </div>
  );
};

export default UpdateCategoryPage;
