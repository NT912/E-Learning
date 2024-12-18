"use client";

import * as z from "zod";
import axios from "axios";
import { ImageIcon, Pencil, PlusCircle } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import { FileUpload } from "@/components/file-upload";

// Định nghĩa kiểu cho thuộc tính của component
interface ImageFormProps {
  initialData: { id: string; imageUrl: string }; // Thay thế 'course' bằng kiểu dữ liệu phù hợp
}

interface Category {
  label: string;
  value: string;
}

const formSchema = z.object({
  imageUrl: z.string().min(1, {
    message: "Image URL cannot be empty",
  }),
});

export const ImageForm = ({ initialData }: ImageFormProps) => {
  const [isEditing, setIsEditing] = useState(false); // Trạng thái chỉnh sửa
  const router = useRouter();

  // Chuyển đổi trạng thái chỉnh sửa
  const toggleEdit = () => setIsEditing((current) => !current);

  // Gửi dữ liệu khi chỉnh sửa
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      // await axios.patch(`/api/courses/${initialData.id}`, values);
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("No token found. Please log in.");
        return;
      }

      const url = `${process.env.NEXT_PUBLIC_SERVER_URL}/course/${initialData.id}/update/avatar`;
      // const response = await axios.patch(url,
      //   { values }
      // )
      toast.success("Course updated successfully");
      toggleEdit(); // Tắt chế độ chỉnh sửa
      router.refresh(); // Làm mới trang
    } catch {
      toast.error("An error occurred while updating the course");
    }
  };

  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        <span>Course Image</span>
        <Button onClick={toggleEdit} variant="ghost">
          {isEditing && <>Cancel</>}
          {!isEditing && !initialData.imageUrl && (
            <>
              <PlusCircle className="h-4 w-4 mr-2" />
              Add an Image
            </>
          )}
          {!isEditing && initialData.imageUrl && (
            <>
              <Pencil className="h-4 w-4 mr-2" />
              Edit
            </>
          )}
        </Button>
      </div>

      {!isEditing && (
        <>
          {!initialData.imageUrl ? (
            <div className="flex items-center justify-center h-60 bg-slate-200 rounded-md">
              <ImageIcon className="h-10 w-10 text-slate-500" />
            </div>
          ) : (
            <div className="relative aspect-video mt-2">
              <Image
                alt="Uploaded Image"
                fill
                className="object-cover rounded-md"
                src={ `${process.env.NEXT_PUBLIC_SERVER_URL}${initialData.imageUrl}` }
              />
              <p className="mt-2 text-sm">Current Image</p>
            </div>
          )}
        </>
      )}

      {isEditing && (
        <div>
          <FileUpload
            endpoint="courseImage"
            onChange={(url) => {
              if (url) {
                onSubmit({ imageUrl: url });
              }
            }}
          />
          <div className="text-xs text-muted-foreground mt-4">
            Recommended image size: 16:9
          </div>
        </div>
      )}
    </div>
  );
};
