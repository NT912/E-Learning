import { NextRequest, NextResponse } from "next/server";

// Mock database for courses
export const mockCourses = [
  { id: "1", title: "Math 101", description: "Introduction to Mathematics" },
  { id: "2", title: "Physics 101", description: "Introduction to Physics" },
];

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  // Find the course with the given ID
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

// Handler for POST requests (Create a new course)
export async function POST(request: NextRequest) {
  try {
    // Parse the body of the request
    const body = await request.json();
    const { title, description } = body;

    // Validate input
    if (!title) {
      return NextResponse.json(
        { success: false, message: "Name and description are required." },
        { status: 400 }
      );
    }

    // Create a new course
    const course = {
      id: String(Date.now()),
      title,
      description,
    };

    mockCourses.push(course);

    return NextResponse.json({
      course,
    });
  } catch (error) {
    console.error("Error creating course:", error);
    return NextResponse.json(
      {
        success: false,
        message: "An error occurred while creating the course.",
      },
      { status: 500 }
    );
  }
}
