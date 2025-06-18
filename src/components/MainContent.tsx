import { ConversionSection } from "./ConversionSection";
import { HistorySection } from "./HistorySection";

export const MainContent = () => {
  return (
    <main className="flex-grow container mx-auto">
      <ConversionSection />
      <HistorySection />
    </main>
  );
};
