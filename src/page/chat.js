import { useEffect, useRef, useState } from "react"

function Chat(){
    let [serverChat,setServerChat] = useState()
    let [chatLog,setChatLog] = useState([])

    const inputRef = useRef()

    useEffect(()=>{
        socket.onopen = function(){
            console.log("연결 성공")
        }

        return()=>{
            socket.close();
            console.log("연결 끊어짐")
        }
    },[])

    var socket = new WebSocket("ws://localhost:8080/socket");

    const sendMessage = (e) =>{
        socket.send(inputRef.current.value)
        let copy = [...chatLog]
        copy.push(inputRef.current.value)
        setChatLog(copy)
        inputRef.current.value = ""; // input 요소의 값 비우기
    }

    socket.onmessage = function(e) {
        let copy = [...chatLog]
        console.log(e.data)
        copy.push(e.data)
        setChatLog(copy)
        
    }

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            sendMessage()
        }
    };

    return(
        <>
            <div className = "chatRoom">
            <input 
                id="textInput" 
                ref={inputRef}
                onKeyDown={handleKeyDown}
                ></input>
            <button onClick={()=>{
                sendMessage()
                
            }}>보내기</button>
            </div>
        </>
    )
}

export default Chat