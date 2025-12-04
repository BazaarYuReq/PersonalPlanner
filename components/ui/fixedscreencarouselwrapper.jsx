import { getAppRoutes } from "@/app/lib/getRoutes";
import FixedScreenCarousel from "./FixedScreenCarousel";

export default function FixedScreenCarouselWrapper() {
  const routes = getAppRoutes();

  return <FixedScreenCarousel routes={routes} />;
}
