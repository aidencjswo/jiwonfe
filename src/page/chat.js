import { useEffect, useRef, useState } from "react"

function Chat(){
    let [serverChat,setServerChat] = useState()
    let [chatLog,setChatLog] = useState([])
    const socketRef = useRef(null);
    const inputRef = useRef()
    const chatRoomRef = useRef();


    useEffect(()=>{
        socketRef.current = new WebSocket("ws://localhost:8080/socket");

        socketRef.current.onopen = function(){
            console.log("연결 성공")
        }

        socketRef.current.onmessage = function (e) {
            setChatLog((prevChatLog) => [...prevChatLog, e.data]); // 이전 상태를 사용하여 chatLog 업데이트
        };

        return()=>{
            socketRef.current.close();
            console.log("연결 끊어짐")
        }
    },[])

    const sendMessage = (e) =>{
        socketRef.current.send(inputRef.current.value)
        let copy = [...chatLog]
        copy.push(inputRef.current.value)
        setChatLog(copy)
        inputRef.current.value = ""; // input 요소의 값 비우기
    }

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            sendMessage()
        }
    };

    useEffect(() => {
        scrollToBottom();
    }, [chatLog]);
    
    const scrollToBottom = () => {
        chatRoomRef.current.scrollTop = chatRoomRef.current.scrollHeight;
    };

    return(
        <>  
            <div className = "chatRoom" ref={chatRoomRef}>
                

                {
                    console.log(chatLog)
                }
                {
                    
                    chatLog.map((a,i)=>(
                        <div key={i}>{a}</div>
                    ))
                }
            </div>
            <div className = "sendArea">
                <input 
                id="textInput" 
                ref={inputRef}
                onKeyDown={handleKeyDown}
                ></input>
                <button onClick={sendMessage}>보내기</button>
            </div>
        </>
    )
}

export default Chat