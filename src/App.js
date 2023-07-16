import './App.css';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Weather from './page/weather';
import London from './page/london';
import Chat from './page/chat';
import Bus from './page/bus';


function App() {
  let navigate = useNavigate();

  return (
    <div className="App">
      <div className = "Nav">
        <li onClick={()=>{navigate('/')}}>Project</li>
        <li onClick={()=>{navigate('weather')}}>날씨</li>
        <li onClick={()=>{navigate('bus')}}>버스</li>
        <li onClick={()=>{navigate('chat')}}>채팅</li>
        <li onClick={()=>{navigate('london')}}>재홍</li>
        <li onClick={()=>{navigate('notice')}}>공지사항</li>
      </div>

      <Routes>
        <Route path='/' element={<div>메인화면</div>}></Route>
        <Route path='weather' element={<Weather></Weather>}/>
        <Route path='bus' element={<Bus></Bus>}/>
        <Route path='chat' element={<Chat></Chat>}/>
        <Route path='london' element={<London></London>}/>
        <Route path='notice' element={<h4>공지사항</h4>}/>
        <Route path='*' element={<div>404</div>}/>
      </Routes>
      
    </div>
  );
}

export default App;
