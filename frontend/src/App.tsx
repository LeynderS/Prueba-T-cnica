import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UploadProvider } from "./contexts/UploadContext";
import "./index.css";
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import UploadPage from "./pages/UploadPage";

function App() {
  return (
    <UploadProvider>
      <BrowserRouter>
        <div className="flex flex-col min-h-screen">
          <Header />
          <Navbar />
          <main className="flex-1 p-4">
            <Routes>
              <Route path="/upload" element={<UploadPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </UploadProvider>
  );
}

export default App;
