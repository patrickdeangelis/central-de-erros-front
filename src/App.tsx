import React from "react";
import Routes from "./routes/routes";
import GlobalStyles from "./global/styles";
import {AuthProvider} from './hooks/AuthContext'

import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <>
      <AuthProvider>
        <Routes />
        <GlobalStyles />
      </AuthProvider>
    </>
  );
}

export default App;
