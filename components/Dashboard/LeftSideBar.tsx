"use client";
import React, { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { Button } from "../ui/button";
import {
  BarChart,
  FileText,
  LayoutDashboard,
  MessageCircle,
  Settings,
} from "lucide-react";
import Link from "next/link";
import ToggleMode from "../Home/ToggleMode";

const LeftSideBar = () => {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button variant={"outline"} className="md:hidden m-4">
            <LayoutDashboard className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-[250px]">
          <SheetTitle className="hidden">Dashboard</SheetTitle>
          <SheetDescription className="sr-only">
            Sidebar navigation for blog dashboard.
          </SheetDescription>
          <DashboardSidebar />
        </SheetContent>
      </Sheet>
      <div className="hidden md:block h-screen  w-[250px] border-r bg-background">
        <DashboardSidebar />
      </div>
    </div>
  );
};

export default LeftSideBar;

const DashboardSidebar = () => {
  return (
    <div className="h-full px-4 py-6">
      <div className="flex justify-between items-center gap-2 mb-6 px-2">
        <Link href={"/"}>
          <span className="text-xl font-bold">BlogNest</span>
        </Link>
        <div className="mt-5">
          <ToggleMode />
        </div>
      </div>
      <nav>
        <Link href={"/dashboard"}>
          <Button variant={"ghost"} className="w-full justify-start ">
            <LayoutDashboard className="h-5 w-5 mr-2" />
            Overview
          </Button>
        </Link>
        <Link href={"/dashboard/articles/all"}>
          <Button variant={"ghost"} className="w-full justify-start ">
            <FileText className="h-5 w-5 mr-2" />
            Articles
          </Button>
        </Link>
      </nav>
    </div>
  );
};
