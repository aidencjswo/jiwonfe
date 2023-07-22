import axios from "axios"
import { useState } from "react"
import { Route, json, useNavigate } from "react-router-dom"

function Main(){

    let navigate = useNavigate()

    let [id , setId] = useState()
    let [pw , setPw] = useState()
    const hasAccessToken = getCookie('access_token');

    const loginFunc = async (e) => {
        let accessToken = ''
        const data = {
            "memberId":id,
            "memberPw":pw
        }
        const json = JSON.stringify(data)
        try{
            let response = await axios.post(`${process.env.REACT_APP_SERVER_HOST}/login`,json)
            accessToken = response.data.accessToken;
            setCookie("access_token", accessToken);
            navigate('/')
        }catch(e){
            alert('아이디와 비밀번호를 확인해주세요')
        }
        
        function setCookie(name, value){
            //도메인 설정은 생략 -> localhost:3000에서만 서버에 쿠키 전송
            document.cookie = name + "=" + value + ";path=/"; //세션쿠키를 사용하므로 expired 기간은 설정하지 않음.
        }
        // AccessToken 저장
    }
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
        

    return(
        <div className="mainContainer">
            {hasAccessToken?
            <>

            </>
            :            
            <>
            <h3 style={{margin:"5px"}}>어서오세요!</h3>
            <div>
                <input type="text" onChange={
                    (e)=>{
                        setId(e.target.value)
                    }
                }></input>
            </div>
            <div>
                <input type="password" onChange={(e)=>{
                    setPw(e.target.value)
                }}></input>
            </div>
            <div>
                <button onClick={()=>{
                    loginFunc()
                    }
                }>로그인</button>
                <button onClick={()=>{
                    navigate("/join")
                }}>회원가입</button>
            </div>
            </>
        }
        </div>
    )
}

export default Main