import React, { useEffect, useState } from "react";
import axios from "axios";

function Aiden() {
    let[dept1,setDept1] = useState([]);
    let[dept2,setDept2] = useState([]);
    let[dept3,setDept3] = useState([]);


    useEffect(() => {
        return () => {
            console.log('컴포넌트가 화면에서 사라짐');
        };
    }, []);

    const dept1select = async () => {
        try {
            const response = await axios.get("http://localhost:8080/weather/locations/dept1");
            let copy = [dept1];
            copy = response.data
            setDept1(copy);
        } catch (error) {
            console.log("실패",error.message);
        }
    };

    const dept2select = async(event)=>{
        console.log(event)
        const response = await axios.post("http://localhost:8080/weather/locations/dept2",{"dept1":event});
        try{
            let copy = [dept2];
            copy = response.data
            setDept2(copy);
        } catch (error) {
            console.log(error.message)
        }
    }

    

    return (
        <div>
            <h4>Aiden</h4>
            <button onClick={dept1select}>클릭</button>
            <select onChange={(event) => dept2select(event.target.value)}>
                {
                dept1.map((a,i)=>(
                    <option key={a}>{a}</option>
                ))
                }
            </select>
        </div>
    );
}



export default Aiden;
