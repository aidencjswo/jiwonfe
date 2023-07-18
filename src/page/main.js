import axios from "axios"
import { useState } from "react"

function Main(){

    let [id , setId] = useState()
    let [pw , setPw] = useState()

    const loginFunc = async (e) => {
        let response = await axios.post()
        try{

        }catch(e){

        }
    }


    return(
        <div className="mainContainer">
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
                    
                        
                    }
                }>로그인</button>
                <button>회원가입</button>
            </div>
        </div>
    )
}

export default Main