import { useRef } from "react"
import { useState } from "react"
import { Navigate, useNavigate } from "react-router-dom"

function Join(){
    let [pw,setPw] = useState()
    const checkPwSpan = useRef()
    let navigate = useNavigate()

    const checkPw = (e) => {
        console.log(e)
        console.log(pw)
        if(pw == e){
            checkPwSpan.current.innerText = '비밀번호가 일치합니다.'
            checkPwSpan.current.className = 'pwSuccess'
        }else{
            checkPwSpan.current.innerText = '비밀번호가 일치하지 않습니다.'
            checkPwSpan.current.className = 'pwFail'
        }
    }

    return(
        <div className="joinContainer">
            <h4>회원가입</h4>
            <div>
            <div>아이디:</div>
            <input type="text"></input>
            </div>
            <div>
            <div>비밀번호:</div>  
            <input type="password" onChange={(e)=>{
            setPw(e.target.value)
            console.log(e.target.value)
            }}></input>
            </div>
            <div>
            <div>비밀번호 확인:</div>
            <input  onChange={(e)=>{
            checkPw(e.target.value)
            }} type="password"></input>
            <br></br>
            <span ref={checkPwSpan}> </span>
            </div>
            <div>
            <div>이름:</div>
            <input type="text"></input>
            <div>
            </div>
            <button>제출</button>
            <button onClick={()=>{
                navigate("/")
            }}>메인화면</button>
            </div>
        </div>
    )
}

export default Join