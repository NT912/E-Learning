// import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import { CheckCircle, Clock } from "lucide-react";

import { InfoCard } from "./_components/info-card";
import { CoursesList } from "@/components/courses-list";
import axios from "axios";
import CourseList from "@/Model/CourseList";

const getAlcourse = async () => {
  const url = `${process.env.NEXT_PUBLIC_SERVER_URL}/course/getall`

  const respone = await axios.get(url);

  return respone.data
}

export default async function Dashboard() {
  // if (!userId) {
  //   return redirect("/");
  // }

  const courses : CourseList[] = await getAlcourse();

  return (
    <div className="p-6 space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <InfoCard icon={Clock} label="In Progress" />
        <InfoCard
          icon={CheckCircle}
          label="Completed"
          // numberOfItems={}
          variant="success"
        />
      </div>
      <CoursesList items={ courses } />
    </div>
  );
}
