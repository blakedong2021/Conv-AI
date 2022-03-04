import * as React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import AppContainer from './components/AppContainer';
import Landing from './components/Landing';
import SignIn from './components/SignIn';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/app" element={<AppContainer />} />
        <Route path="/start" element={<Landing />} />
        <Route path="/" element={<SignIn />} />
      </Routes>    
    </BrowserRouter>
  );
}
