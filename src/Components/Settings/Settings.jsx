
import { useSettings } from '../context/settingContext';

const SettingsPage = () => {
  const { displayItemCount, setDisplayItemCount, showCompleted, setShowCompleted } = useSettings();

  return (
    
    <div>
      <h2>Application Settings</h2>
      <form>
        <label>
          Number of To-Do Items to Display:
          <input
            type="number"
            value={displayItemCount}
            onChange={(e) => setDisplayItemCount(parseInt(e.target.value))}
          />
        </label>
        <label>
          Show Completed Items:
          <input
            type="checkbox"
            checked={showCompleted}
            onChange={() => setShowCompleted(!showCompleted)}
          />
        </label>
      </form>
    </div>
  );
};

export default SettingsPage;