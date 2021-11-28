import Header from "./components/Header";
import MainContent from "./components/MainContent";
import Footer from "./components/Footer";

function App(): JSX.Element {
  return (
    <div className="h-screen flex flex-col">
      <Header />
      <MainContent />
      <Footer />
    </div>
  );
}

export default App;
