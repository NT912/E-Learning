"use client";

import * as z from "zod";
import axios from "axios";
import { Pencil } from "lucide-react";
import { useState, useEffect } from "react";
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

interface Category {
  label: string;
  value: string;
}

interface CategoryFormProps {
  courseId: string;
}

const formSchema = z.object({
  categoryId: z.string().min(1),
});

export const CategoryForm = ({ courseId }: CategoryFormProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  // Fetch categories from API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const url = `${process.env.NEXT_PUBLIC_SERVER_URL}/course/category/getall`;
        console.log(url);
        const response = await fetch(
          url
        );

        const data = await response.json();
        console.log(data);
        // const formattedCategories = response.data.map((cat: any) => ({
        //   label: cat.name,
        //   value: cat.id.toString(),
        // }));

        // setCategories(formattedCategories);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
        toast.error("Failed to load categories.");
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      categoryId: "",
    },
  });

  const toggleEdit = () => setIsEditing((current) => !current);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.patch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/courses/${courseId}`,
        values
      );
      toast.success("Course category updated successfully!");
      toggleEdit();
      router.refresh();
    } catch (error) {
      console.error("Error updating category:", error);
      toast.error("Failed to update course category. Please try again.");
    }
  };

  const selectedOption = categories.find(
    (option) => option.value === form.getValues("categoryId")
  );

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
        <p className={cn("text-sm mt-2", !selectedOption && "text-slate-500 italic")}>
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
                    {loading ? (
                      <p className="text-sm italic">Loading categories...</p>
                    ) : (
                      <Combobox options={categories} {...field} />
                    )}
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center gap-x-2">
              <Button
                disabled={
                  form.formState.isSubmitting ||
                  !form.formState.isValid ||
                  loading
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
