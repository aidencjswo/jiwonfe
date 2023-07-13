import React, { useEffect, useRef, useState } from "react";

function Bus() {
  var [test,setTest] = useState(0)
  useEffect(()=>{
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.REACT_APP_KAKAO_API_KEY}&autoload=false`;
    document.head.appendChild(script);
    console.log('mount')

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
      console.log('dismount')
    }
  
  },[test])


  return (
    <div>
        <div id="map" style={{
          width:"500px",
          height:"400px"
        }}></div>
    </div>
  );
}

export default Bus;
