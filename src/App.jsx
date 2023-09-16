import React from 'react';

import Home from './Components/Home/Home';
import SettingsPage from './Components/Settings/Settings';
import { SettingsProvider } from './context/SettingContext';
import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";
import {AuthProvider} from './context/AuthContext';

export default class App extends React.Component {
  render() {
    return (
      <>
      <AuthProvider >
      <Header />
      <SettingsProvider>
      <Home />
    <SettingsPage />
      </SettingsProvider>
      </AuthProvider>
     <Footer />
         </>
 
     
    );
  }
}
