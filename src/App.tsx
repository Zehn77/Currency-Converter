import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { MainContent } from "./components/MainContent";

function App() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 text-gray-800 font-sans">
      <Header />

      <MainContent />

      <Footer />
    </div>
  );
}

export default App;
