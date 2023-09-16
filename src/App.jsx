import React from 'react';

import Home from './Components/Home/Home';
import SettingsPage from './Components/Settings/Settings';
import { SettingsProvider } from './context/SettingContext';

export default class App extends React.Component {
  render() {
    return (
      <>
      <SettingsProvider>
      <Home />
    <SettingsPage />
      </SettingsProvider>
         </>
 
     
    );
  }
}
