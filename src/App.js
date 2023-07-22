import './App.css';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Weather from './page/weather';
import London from './page/london';
import Chat from './page/chat';
import Bus from './page/bus';
import Main from './page/main';
import Join from './page/join';


function App() {
  let navigate = useNavigate();
  const hasAccessToken = getCookie('access_token');

  function getCookie(name){
    const cookieString = document.cookie
    const cookies = cookieString.split('; ');
    for(const cookie of cookies){
      const [cookieName, cookieValue] = cookie.split('=');
      if(cookieName === name){
        return decodeURIComponent(cookieValue)
      }
    }
    return '';
  }

  return (
    <div className="App">
      <div className = "Nav">
        <li onClick={()=>{navigate('/')}}>Project</li>
        {hasAccessToken ? (
          <>
            <li onClick={() => { navigate('weather'); }}>날씨</li>
            <li onClick={() => { navigate('bus'); }}>버스</li>
            <li onClick={() => { navigate('chat'); }}>채팅</li>
            <li onClick={() => { navigate('london'); }}>재홍</li>
          </>
        ) : null}
        <li onClick={()=>{navigate('notice')}}>공지사항</li>
      </div>

      <Routes>
        <Route path='/' element={<Main></Main>}></Route>
        <Route path='weather' element={<Weather></Weather>}/>
        <Route path='bus' element={<Bus></Bus>}/>
        <Route path='chat' element={<Chat></Chat>}/>
        <Route path='london' element={<London></London>}/>
        <Route path='notice' element={<h4>공지사항</h4>}/>
        <Route path='join' element={<Join></Join>}/>
        <Route path='*' element={<div>404</div>}/>
      </Routes>
      
    </div>
  );
}

export default App;
