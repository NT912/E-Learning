"use client";

import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Loader2, PlusCircle } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { ChaptersList } from "./chapters-list";
import { Chapter } from './chapters-list'

interface ChaptersFormProps {
  initialData: { chapters: Chapter[] };
  courseId: string;
}

const formSchema = z.object({
  title: z.string().min(1, {
    message: "Title is required",
  }),
});

export const ChaptersForm = ({ initialData, courseId }: ChaptersFormProps) => {
  const [isCreating, setIsCreating] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [chapters, setChapters] = useState(initialData.chapters || []);

  const toggleCreating = () => {
    setIsCreating((current) => !current);
  };
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const response = await axios.post(
        `/api/courses/${courseId}/chapters`,
        values
      );

      // Cập nhật danh sách chương
      setChapters([...chapters, response.data]);
      toast.success("Chapter created");
      toggleCreating();
      router.refresh();
    } catch {
      toast.error("Error creating chapter");
    }
  };

  const onReorder = async (updateData: { id: string; position: number }[]) => {
    try {
      setIsUpdating(true);
      await axios.put(`/api/courses/${courseId}/chapters/reorder`, {
        list: updateData,
      });
      toast.success("Chapters reordered");

      // Cập nhật lại danh sách chương
      // const reorderedChapters = [...chapters].sort((a, b) => {
      //   const posA = updateData.find((item) => item.id === a.id)?.position || 0;
      //   const posB = updateData.find((item) => item.id === b.id)?.position || 0;
      //   return posA - posB;
      // });
      // setChapters(reorderedChapters);
      router.refresh();
    } catch {
      toast.error("Error reordering chapters");
    } finally {
      setIsUpdating(false);
    }
  };

  const onEdit = (id: number) => {
    router.push(`/teacher/courses/${courseId}/chapters/2`);
  };

  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4 relative">
      {/* Loading Overlay */}
      {isUpdating && (
        <div className="absolute h-full w-full bg-slate-500/20 top-0 right-0 flex items-center justify-center rounded-md">
          <Loader2 className="animate-spin h-6 w-6 text-sky-700" />
        </div>
      )}

      {/* Header */}
      <div className="font-medium flex items-center justify-between">
        Course chapters
        <Button onClick={toggleCreating} variant="ghost">
          {isCreating ? (
            <>Cancel</>
          ) : (
            <>
              <PlusCircle className="h-4 w-4 mr-2" />
              Add a chapter
            </>
          )}
        </Button>
      </div>

      {/* Form to create a new chapter */}
      {isCreating && (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 mt-4"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder="Chapter title"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button disabled={!isValid || isSubmitting} type="submit">
              Create
            </Button>
          </form>
        </Form>
      )}

      {/* Chapters List */}
      {!isCreating && (
        <>
          {chapters.length === 0 ? (
            <p className="text-sm mt-2 text-slate-500 italic">No chapters</p>
          ) : (
            <ChaptersList
              items={chapters}
              // onReorder={onReorder}
              onEdit={onEdit}
            />
          )}
          <p className="text-xs text-muted-foreground mt-4">
            Drag and drop to reorder the chapters
          </p>
        </>
      )}
    </div>
  );
};
