import { useEffect, useRef, useState } from "react";

function Chat() {
    let [serverChat, setServerChat] = useState();
    let [chatLog, setChatLog] = useState([]);
    const socketRef = useRef(null);
    const inputRef = useRef();
    const chatRoomRef = useRef();

    useEffect(() => {
    socketRef.current = new WebSocket(`${process.env.REACT_APP_WEBSOCKET_SERVER_HOST}/socket`);

    socketRef.current.onopen = function () {
    console.log("연결 성공");
    };

    socketRef.current.onmessage = function (e) {
    setChatLog((prevChatLog) => [
        ...prevChatLog,
        { sender: "상대방", message: e.data },
    ]);
    };

    return () => {
    socketRef.current.close();
    console.log("연결 끊어짐");
    };
    }, []);

    const sendMessage = () => {
        if(inputRef.current.value!=""){
            socketRef.current.send(inputRef.current.value);
            let copy = [...chatLog];
            copy.push({ sender: "나", message: inputRef.current.value });
            setChatLog(copy);
            inputRef.current.value = "";
        }
    };

    const handleKeyDown = (e) => {
    if (e.key === "Enter") {
        sendMessage();
    }
    };

    useEffect(() => {
        scrollToBottom();
    }, [chatLog]);

    const scrollToBottom = () => {
        chatRoomRef.current.scrollTop = chatRoomRef.current.scrollHeight;
    };

    return (
    <>
        <div className="chatRoom" ref={chatRoomRef}>
        {chatLog.map((chat, i) => (
            <div
            key={i}
            className={`message ${chat.sender === "나" ? "right" : "left"}`}
            >
            <span className="sender">{chat.sender}:</span> {chat.message}
            </div>
        ))}
        </div>
        <div className="sendArea">
        <input
            id="textInput"
            ref={inputRef}
            onKeyDown={handleKeyDown}
        ></input>
        <button onClick={sendMessage}>→</button>
        </div>
    </>
    );
}

export default Chat;
