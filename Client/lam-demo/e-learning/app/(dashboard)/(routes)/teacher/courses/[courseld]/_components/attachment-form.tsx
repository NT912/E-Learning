"use client";

import * as z from "zod";
import axios from "axios";
import { PlusCircle, File, X, Loader2 } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import { FileUpload } from "@/components/file-upload";

// Định nghĩa schema cho form
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const formSchema = z.object({
  url: z.string().min(1), // Yêu cầu URL phải có ít nhất 1 ký tự
});

interface AttachmentForm {
  courseId: string; // ID của khóa học
  initialData: { attachments: { id: string; name: string }[] }; // Dữ liệu đính kèm của khóa học
}

export const AttachmentForm = ({ courseId, initialData }: AttachmentForm) => {
  const [isEditing, setIsEditing] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const router = useRouter();

  // Hàm chuyển đổi trạng thái chỉnh sửa
  const toggleEdit = () => setIsEditing((current) => !current);

  // Hàm xử lý submit form
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      // Sử dụng template literals với backticks `` ` `` để tạo URL chính xác
      await axios.post(`/api/courses/${courseId}/attachments`, values);
      toast.success("Attachment added successfully!");
      toggleEdit();
      router.refresh();
    } catch {
      toast.error("An error occurred while adding the attachment.");
    }
  };

  // Hàm xử lý xóa tệp đính kèm
  const onDelete = async (id: string) => {
    try {
      setDeletingId(id);
      // Sử dụng template literals với backticks `` ` `` để tạo URL chính xác
      await axios.delete(`/api/courses/${courseId}/attachments/${id}`);
      toast.success("Attachment deleted successfully.");
      router.refresh();
    } catch {
      toast.error("Something went wrong while deleting the attachment.");
    } finally {
      setDeletingId(null); // Reset lại trạng thái xóa
    }
  };

  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        <span>Course attachments</span>
        <Button onClick={toggleEdit} variant="ghost">
          {isEditing ? (
            <>Cancel</>
          ) : (
            <>
              {" "}
              <PlusCircle className="h-4 w-4 mr-2" /> Add a file{" "}
            </>
          )}
        </Button>
      </div>

      {!isEditing && (
        <>
          {initialData?.attachments?.length === 0 && (
            <p className="text-sm mt-2 text-slate-500 italic">
              No attachments available
            </p>
          )}
          {initialData?.attachments?.length > 0 && (
            <div className="space-y-2">
              {initialData.attachments.map((attachment) => (
                <div
                  key={attachment.id}
                  className="flex items-center p-3 w-full bg-sky-100 border-sky-200 border text-sky-700 rounded-md"
                >
                  <File className="h-4 w-4 mr-2 flex-shrink-0" />
                  <p className="text-xs line-clamp-1">{attachment.name}</p>
                  {deletingId === attachment.id && (
                    <div>
                      <Loader2 className="h-4 w-4 animate-spin" />
                    </div>
                  )}
                  {deletingId !== attachment.id && (
                    <button
                      onClick={() => onDelete(attachment.id)}
                      className="ml-auto hover:opacity-75 transition"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}
        </>
      )}

      {/* Hiển thị form để thêm tệp đính kèm nếu đang ở chế độ chỉnh sửa */}
      {isEditing && (
        <div>
          <FileUpload
            endpoint="courseAttachment" // Đặt endpoint upload của bạn ở đây
            onChange={(url) => {
              if (url) {
                onSubmit({ url }); // Gọi onSubmit khi URL có giá trị
              }
            }}
          />
          <div className="text-xs text-muted-foreground mt-4">
            Add a new attachment
          </div>
        </div>
      )}
    </div>
  );
};
