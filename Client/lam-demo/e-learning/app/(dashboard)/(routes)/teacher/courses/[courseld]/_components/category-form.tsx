"use client";

import * as z from "zod";
import axios from "axios";
import { Pencil } from "lucide-react";
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
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "@/lib/utils";
import { Combobox } from "@/components/ui/combobox";

interface CategoryFormProps {
  courseId: string;
  option: { label: string; value: string }[];
}

const formSchema = z.object({
  categoryId: z.string().min(1),
});

export const CategoryForm = ({ courseId, option }: CategoryFormProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      categoryId: "",
    },
  });

  const toggleEdit = () => setIsEditing((current) => !current);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.patch(`/api/courses/${courseId}`, values);
      toast.success("Course category updated successfully!");
      toggleEdit();
      router.refresh();
    } catch (error) {
      console.error("Error updating category:", error);
      toast.error("Failed to update course category. Please try again.");
    }
  };

  const selectedOption = option.find((option) => option.value === courseId);

  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Course Category
        <Button onClick={toggleEdit} variant="ghost">
          {isEditing ? (
            "Cancel"
          ) : (
            <>
              <Pencil className="h-4 w-4 mr-2" />
              Edit Category
            </>
          )}
        </Button>
      </div>

      {/* Display current category when not editing */}
      {!isEditing && (
        <p className={cn("text-sm mt-2", !courseId && "text-slate-500 italic")}>
          {selectedOption?.label || "No category"}
        </p>
      )}

      {/* Display form when editing */}
      {isEditing && (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 mt-4"
          >
            <FormField
              control={form.control}
              name="categoryId"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Combobox options={option} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center gap-x-2">
              <Button
                disabled={
                  form.formState.isSubmitting || !form.formState.isValid
                }
                type="submit"
              >
                Save
              </Button>
            </div>
          </form>
        </Form>
      )}
    </div>
  );
};
