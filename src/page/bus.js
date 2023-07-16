import axios from "axios";
import React, { useEffect, useRef, useState } from "react";

function Bus() {
  var [busNum,setBusNum] = useState()
  var [routeId,setRouteId] = useState()
  useEffect(()=>{
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.REACT_APP_KAKAO_API_KEY}&autoload=false`;
    document.head.appendChild(script);

    script.onload = () => {
      window.kakao.maps.load(function(){
      var container = document.getElementById('map'); //지도를 담을 영역의 DOM 레퍼런스
      var options = { //지도를 생성할 때 필요한 기본 옵션
          center: new window.kakao.maps.LatLng(33.450701, 126.570667), //지도의 중심좌표.
          level: 3 //지도의 레벨(확대, 축소 정도)
      };
      var map = new window.kakao.maps.Map(container, options);
    })
  }

    return()=>{
      script.remove();
    }
  
  },[routeId])

  const searchBusNum = async(event)=>{
    console.log(`${process.env.REACT_APP_SERVER_HOST}/bus/routeId`)
    let response = await axios.post(`${process.env.REACT_APP_SERVER_HOST}/bus/routeId`,{"route":event})
    try{
      let copy = routeId
      copy = response.data
      setRouteId(copy)
    }catch(error){
      console.log(error.message)
    }
  }

  const searchBusInfo = async(event)=>{
    let response = await axios.post(`${process.env.REACT_APP_SERVER_HOST}/bus/info`,{"routeId":event})
    
    try{
      
    }catch(error){
      console.log(error.message)
    }
  }
  
  return (
    <div>
        <h4 style={{
          margin:"0"
        }}>{routeId}</h4>
        <input onChange={(e)=>{
          searchBusNum(e.target.value)
        }} type="text" placeholder="버스번호를 입력하세요"></input>
        <button onClick={()=>{
        
        }}>조회하기</button>
        <div id="map" style={{
          width:"100%",
          height:"400px"
        }}></div>
    </div>
  );
}

export default Bus;