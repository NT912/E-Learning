import { NextRequest, NextResponse } from "next/server";
import { mockCourses } from "../create/route";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  console.log(id);
  const course = mockCourses.find((course) => course.id === id);

  if (!course) {
    return NextResponse.json(
      { success: false, message: `Course with ID ${id} not found.` },
      { status: 404 }
    );
  }

  return NextResponse.json({
    success: true,
    course,
  });
}
