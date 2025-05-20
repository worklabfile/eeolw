
import MainLayout from "@/components/layout/MainLayout";
import Hero from "@/components/home/Hero";
import LatestRelease from "@/components/home/LatestRelease";
import UpcomingShows from "@/components/home/UpcomingShows";

const Index = () => {
  return (
    <MainLayout>
      <Hero />
      <LatestRelease />
      <UpcomingShows />
    </MainLayout>
  );
};

export default Index;
