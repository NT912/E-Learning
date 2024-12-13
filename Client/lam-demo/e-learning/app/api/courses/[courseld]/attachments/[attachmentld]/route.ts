import { NextResponse } from "next/server";

export async function DELETE(
  req: Request,
  { params }: { params: { courseI: string; attachmentId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unathorized", { status: 401 });
    }
    if (!courseOwner) {
      return new NextResponse("Unathorized", { status: 500 });
    }
  } catch (error) {
    console.log("ATTACHMENT_ID", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
