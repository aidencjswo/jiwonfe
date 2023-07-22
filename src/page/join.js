import axios from "axios"
import { useRef } from "react"
import { useState } from "react"
import { Navigate, useNavigate } from "react-router-dom"

function Join(){
    let [id,setId] = useState('')
    let [pw,setPw] = useState('')
    let [nm,setNm] = useState('')

    let [idChk, setIdChk] = useState(0)
    let [pwChk, setPwChk] = useState(0)
    let [nmChk, setNmChk] = useState(0)

    const checkPwSpan = useRef()
    const checkIdSpan = useRef()
    let navigate = useNavigate()

    const checkPw = (e) => {
        if(pw == e){
            checkPwSpan.current.innerText = '비밀번호가 일치합니다.'
            checkPwSpan.current.className = 'chkSuccess'
            setPwChk(1)
        }else{
            checkPwSpan.current.innerText = '비밀번호가 일치하지 않습니다.'
            checkPwSpan.current.className = 'chkFail'
            setPwChk(0)
        }
    }

    const checkId = async(e) =>{
        let response = await axios.get(`${process.env.REACT_APP_SERVER_HOST}/member/id?id=`+e)
        try{
            if(response.data.status == 'SUCCESS'){
                checkIdSpan.current.innerText = response.data.msg
                checkIdSpan.current.className = 'chkSuccess'
                setIdChk(1)
            }else{
                checkIdSpan.current.innerText = response.data.msg
                checkIdSpan.current.className = 'chkFail'
                setIdChk(0)
            }
        }catch(e){
            console.log(e.response.status)
        }
    }

    const submit = async(e) => {
        if(idChk == 1 && pwChk == 1 && nmChk == 1){
            try{
                const dataMap = {
                    'id':id,
                    'pw':pw,
                    'nm':nm
                }
                let response = await axios.post(`${process.env.REACT_APP_SERVER_HOST}/member/id`,{'member':dataMap})
                console.log(response)
                navigate('/')
            }catch(e){
                alert('제대로!')
            }
        }else{
            alert('모든 항목을 정상적으로 입력해주세요')
        }
    }

    return(
        <div className="joinContainer">
            <h4>회원가입</h4>
            <div>
            <div>아이디:</div>
            <input onChange={(e)=>{
                checkId(e.target.value)
                setId(e.target.value)
            }} type="text"></input>
            <br></br>
            <span ref={checkIdSpan}> </span>
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
            <input onChange={(e)=>{
            checkPw(e.target.value)
            }} type="password"></input>
            <br></br>
            <span ref={checkPwSpan}> </span>
            </div>
            <div>
            <div>이름:</div>
            <input onChange={(e)=>{
                setNm(e.target.value)
                if(nm != ''){
                    setNmChk(1)
                }else{
                    setNmChk(0)
                }
            }} type="text"></input>
            <div>
            </div>
            <button onClick={(e)=>{
                submit()
            }}>제출</button>
            <button onClick={()=>{
                navigate("/")
            }}>메인화면</button>
            </div>
        </div>
    )
}

export default Join