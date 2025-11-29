"use client";

import AutoCarousel from "@/components/ui/autocarousel";
import TaskCarousel from "@/components/ui/task-carousel"; 
import calendarheatmap from "@/components/ui/calendarheatmap" // <-- Add this
import TaskCardPreview from "@/components/ui/taskcardpreview"

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import CalendarHeatmap from "@/components/ui/calendarheatmap";

export default function HomePage() {
  const sample = [
  { date: "2025-11-28", count: 3 },
  { date: "2025-11-27", count: 1 },
  // ...
];
  return (
    
    <div className="px-6 text-white max-w-full min-h-screen pb-20 overflow-x-auto pb-4">
      {/* Title */}
      <h1 className="text-4xl font-bold mb-4">Welcome Back 👋</h1>
      <p className="text-lg text-gray-300 max-w-2xl mb-10">
        This is your all-in-one productivity hub. Manage your tasks, track
        goals, and stay focused.
      </p>

      {/* Carousel */}
      <div className="bg-gradient-to-r from-[#0f1117] to-[#111827] rounded-2xl p-6 shadow-lg mb-20">
        <AutoCarousel />
      </div>

      {/* Calendar Heatmap */}
      <div className="flex justify-center mt-10 mb-20 w-full " >
        <CalendarHeatmap data={sample} />
      </div>
    </div>
  );
}
