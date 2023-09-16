import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Todo from "../Todo";
import { SettingsProvider } from "../../context/SettingContext";

function Home() {
  return (
    <div> <Header />
      <SettingsProvider> 
        <Todo />
      </SettingsProvider>
      <Footer />

    </div>
  );
}

export default Home;