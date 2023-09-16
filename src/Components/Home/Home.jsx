
import Todo from "../Todo";
import { SettingsProvider } from "../../context/SettingContext";

function Home() {
  return (
    <div> 
      <SettingsProvider> 
        <Todo />
      </SettingsProvider>

    </div>
  );
}

export default Home;