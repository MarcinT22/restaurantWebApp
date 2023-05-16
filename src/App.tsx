import React from 'react';
import './scss/auth.scss'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Login from './views/auth/Login';
import Dashboard from './views/dashboard/Dashboard';
import NotFound from './views/NotFound';
import Content from './views/dashboard/Content';


const App: React.FC = () => {

  return <Router>
    <Routes>
      <Route path="/" element={<Login /> } />
      <Route path="/dashboard/*" element={<Dashboard />}>
        <Route index element={<Content />}></Route>
         <Route path="*" element={ <NotFound />} />
      </Route>
      <Route path="*" element={ <NotFound />} />
      </Routes>
  </Router>
}

export default App;