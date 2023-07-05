import './App.css';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Aiden from './page/aiden';
import London from './page/london';

function App() {
  let navigate = useNavigate();

  return (
    <div className="App">
      <div className = "Nav">
        <li onClick={()=>{navigate('/')}}>Project</li>
        <li onClick={()=>{navigate('aiden')}}>상영</li>
        <li onClick={()=>{navigate('london')}}>재홍</li>
      </div>

      <Routes>
        <Route path='/' element={<div>메인화면</div>}></Route>
        <Route path='aiden' element={<Aiden></Aiden>}/>
        <Route path='london' element={<London></London>}/>
        <Route path='*' element={<div>404</div>}/>
      </Routes>
      
    </div>
  );
}

export default App;
