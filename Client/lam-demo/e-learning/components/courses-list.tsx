// import { Category, Course } from "@prisma/client";

import Category from '@/Model/Category'
import CourseList from '@/Model/CourseList'
import { CourseCard } from "@/components/course-card";

interface CoursesListProps {
  items: CourseList[];
}

export const CoursesList = ({ items }: CoursesListProps) => {
  return (
    <div>
      <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-4">
        {items.map((item) => (
          <CourseCard
            key={0}
            id={item.CourseID}
            title={item.name}
            imageUrl={item.avatar}
            chaptersLength={item.Chapter}
            price={item.cost}
            progress={100}
            category={""}
          />
        ))}
      </div>
      {items.length === 0 && (
        <div className="text-center text-sm text-muted-foreground mt-10">
          No courses found
        </div>
      )}
    </div>
  );
};
