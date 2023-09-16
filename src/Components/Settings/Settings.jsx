// SettingsPage.js
import React, { useEffect, useState } from 'react';
import { useSettings } from '../../context/SettingContext';
import './Settings.scss';
const SettingsPage = () => {
    const { settings, setSettings } = useSettings();
    const [formData, setFormData] = useState({});
    const [updated, setUpdated] = useState(false);
    const [updatedValues, setUpdatedValues] = useState({});

    useEffect(() => {
        setFormData(settings);
    }, [settings]);

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        const newValue = type === 'checkbox' ? checked : value;

        setFormData({
            ...formData,
            [name]: newValue,
        });
    };

    const handleSaveSettings = () => {
        const changedValues = {};

        for (const key in formData) {
            if (formData[key] !== settings[key]) {
                changedValues[key] = formData[key];
            }
        }

        setSettings(formData);

        setUpdated(true);
        setUpdatedValues(changedValues);
    };

    return (
        <div className='container'>
            <header>Manage Settings</header>
            <div className='Settingcontainer'>
                <form className='updatesetting'>

                    <h2>Update Settings</h2>
                    <label>
                        Show Completed Todos:
                        <input
                            type="checkbox"
                            name="showCompleted"
                            checked={formData.showCompleted}
                            onChange={handleInputChange}
                        />
                    </label>
                    <label>
                        Items Per Page:
                        <input
                            type="number"
                            name="itemsToShow"
                            value={formData.itemsToShow}
                            onChange={handleInputChange}
                        />
                    </label>
                    <button type="button" onClick={handleSaveSettings}>
                        Show new Setting
                    </button>
                </form>
                <form>
                    {updated && (
                        <div>
                            <p>Updated Settings</p>
                            <pre>{JSON.stringify(updatedValues, null, 2)}</pre>
                        </div>
                    )}


                </form>
            </div>


        </div>
    );
};

export default SettingsPage;
