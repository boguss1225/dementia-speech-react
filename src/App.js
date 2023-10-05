import './App.css';
import MenuNav from './pages/menu';
import Home from './pages/home';
import Rank from './pages/rank';
import Contact from './pages/contact';
import { useState } from 'react';

function App() {
  const [mode, setMode] = useState(1);

  // define mode items
  const mode_items_init =[
    {id:1, title:'home', loc:'/', class:'fa fa-home', active:'active'},
    {id:2, title:'rank', loc:'/rank', class:'fa fa-globe', active:null},
    {id:3, title:'contact', loc:'/contact', class:'fa fa-envelope', active:null}
  ]
  const [mode_items, setMode_items] = useState(mode_items_init);
  
  
  let contextControl = null;
  if(mode === 1) {
    contextControl = <Home onChangeMode={(mode)=>{
      setMode(mode);
    }} />
  }
  if(mode === 2) {
    contextControl = <Rank />
  }
  if(mode === 3) {
    contextControl = <Contact />
  }

  return (
    <div>
      <MenuNav modes={mode_items} onChangeMode={(mode)=>{
        setMode(mode);
      }} />
      {contextControl}
    </div>
  );
}

export default App;
