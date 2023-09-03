import './App.css';
import Menu_nav from './pages/menu';
import Home from './pages/home';
import Rank from './pages/rank';
import Contact from './pages/contact';
import { useState } from 'react';

function App() {
  const [mode, setMode] = useState(1);
  // define mode items
  const [mode_items, setMode_items] = useState([
    {id:1, title:'home', loc:'/'},
    {id:2, title:'rank', loc:'/rank'},
    {id:3, title:'contact', loc:'/contact'}
  ]);
  
  let contextControl = null;
  if(mode === 1) {
    contextControl = <Home />
  }
  if(mode === 2) {
    contextControl = <Rank />
  }
  if(mode === 3) {
    contextControl = <Contact />
  }

  return (
    <div>
      <Menu_nav modes={mode_items} onChangeMode={(mode)=>{
        setMode(mode);
      }} />
      {contextControl}
    </div>
  );
}

export default App;
