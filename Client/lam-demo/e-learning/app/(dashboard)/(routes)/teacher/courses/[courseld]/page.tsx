import { IconBadge } from "@/components/icon-badge";
import { ChapterDescriptionForm } from "./chapters/[chapterld]/_components/chapter-description-form";
import { ChapterTitleForm } from "./chapters/[chapterld]/_components/chapter-title-form";
import ChapterIdPage from "./chapters/[chapterld]/page";
import { Eye } from "lucide-react";
import { ChapterAccessForm } from "./chapters/[chapterld]/_components/chapter-access-form";

const CourseIdPage = async ({}: { params: { courseId: string } }) => {
  return (
    <div className="p-6">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-y-2">
          <h1 className="text-2xl font-medium">Course setup</h1>
          <span className="text-sm text-slate-700">Complete all fields</span>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
        <div>
          <div className="flex items-center gap-x-2">
            <h2 className="flex-xl">Customize your course</h2>
          </div>
          <ChapterTitleForm
            initialData={{
              title: "",
            }}
          />
          <ChapterDescriptionForm
            initialData={{
              description: "",
            }}
            courseId={""}
          />
        </div>
        <div className="flex items-center gap-x-2">
          <IconBadge icon={Eye} />
          <h2 className="text-xl">Access Settings</h2>
        </div>
        <ChapterAccessForm
          initialData={{
            description: "",
          }}
          courseId={""}
        />
      </div>
    </div>
  );
};

export default CourseIdPage;
