import { IconBadge } from "@/components/icon-badge";
import {
  CircleDollarSign,
  LayoutDashboard,
  ListChecks,
  File,
} from "lucide-react";
import { TitleForm } from "../_components/title-form";
import { CategoryForm } from "../_components/category-form";
import { PriceForm } from "../_components/price-form";
// import { ChaptersForm } from "../_components/chapters-form";
// import { ImageForm } from "../_components/image-form";
import { AttachmentForm } from "../_components/attachment-form";
import { DescriptionForm } from "../_components/description-form";
import { ImageForm } from "../_components/image-form";

export const CourseIdPage = async ({
  params,
}: {
  params: { courseld: string };
}) => {
  const { courseld } = params;
  // const url = `/api/courses/${courseld}`;
  // console.log(url);
  // const response = await axios.get(url);

  // const course = response.data.course;

  const category = [
    { label: "Programming", value: "1" },
    { label: "Design", value: "2" },
    { label: "Marketing", value: "3" },
    { label: "Business", value: "4" },
  ];

  return (
    <div className="p-6">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-y-2">
          <h1 className="text-2xl font-medium">Course setup</h1>
          <span className="text-sm text-slate-700">Complete all field</span>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
        <div>
          <div className="flex items-center gap-x-2">
            <IconBadge size="sm" icon={LayoutDashboard} />
            <h2 className="text-xl">Customize your course</h2>
          </div>
          <TitleForm initialData={{ title: "",courseId: courseld }} />
          <DescriptionForm
            initialData={{
              description: "",
            }}
            courseId={""}
          />
          {/* <ImageForm initialData={undefined} imageUrl={""} /> */}
          <CategoryForm courseId={courseld} option={category} />
        </div>
        <div className="space-y-6">
          <div>
            <div className="flex items-center gap-x-2">
              <IconBadge icon={ListChecks} />
              <h2 className="text-xl">Course Chapter</h2>
            </div>
          </div>
          {/* <ChaptersForm
            initialData={{
              description: "",
            }}
            courseId={""}
          /> */}
        </div>
        <div>
          <div className="flex items-center gap-x-2">
            <IconBadge icon={CircleDollarSign} />
            <h2 className="text-xl">Sell your course</h2>
          </div>
          <PriceForm initialData={{ title: "" }} courseId={courseld} />
        </div>
        <div>
          <div className="flex items-center gap-x-2">
            <IconBadge icon={File} />
            <h2 className="text-xl">File dinh kem</h2>
          </div>
          {/* <ImageForm initialData={undefined} imageUrl={""} /> */}
          <AttachmentForm
            courseId={""}
            initialData={{
              attachments: [],
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default CourseIdPage;