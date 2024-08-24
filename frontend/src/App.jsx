import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Home from './router/Home';
import Chart from './router/Chart';
import Graph from './router/Graph';
import Settings from './router/Settings';
import Date from './router/Date';

const App = () => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    setTheme((currentTheme) => (currentTheme === 'dark' ? 'light' : 'dark'));
  };

  return (
    <div className={`bg-primary ${theme} h-screen`}>
      <div className=''>
        <Navbar theme={theme} toggleTheme={toggleTheme} />
      </div>
      <div className='flex h-[85%]'>
     
        <Sidebar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/chart' element={<Chart />} />
          <Route path='/graph' element={<Graph />} />
          <Route path='/date' element={<Date />} />
          <Route path='/settings' element={<Settings />} />
        </Routes>
      </div>
    </div>
  );
};
export default App;
