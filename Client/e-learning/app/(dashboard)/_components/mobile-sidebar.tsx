import { Menu, Sidebar } from "lucide-react"; // Icon Menu và Sidebar từ lucide-react
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export const MobileSidebar = () => {
  return (
    <Sheet>
      {/* Icon Menu được dùng làm nút trigger */}
      <SheetTrigger className="md:hidden pr-4 hover:opacity-75 transition">
        <Menu />
      </SheetTrigger>
      {/* SheetContent để hiển thị nội dung sidebar */}
      <SheetContent side="left" className="p-0 bg-white">
        <Sidebar /> {/* Icon Sidebar từ lucide-react */}
      </SheetContent>
    </Sheet>
  );
};
