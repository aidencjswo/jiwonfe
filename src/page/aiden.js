import React, { useEffect, useState } from "react";
import axios from "axios";

function Aiden() {
    let[selectLocation1,setSelectLocation1] = useState()
    let[selectLocation2,setSelectLocation2] = useState()
    let[selectLocation3,setSelectLocation3] = useState()
    let[dept1,setDept1] = useState([])
    let[dept2,setDept2] = useState([])
    let[dept3,setDept3] = useState([])

    let[weather,setWeather] = useState([])

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
        let copy = selectLocation1
        copy = event
        setSelectLocation1(copy)
        const response = await axios.post("http://localhost:8080/weather/locations/dept2",{"dept1":event});
        try{
            let copy = [dept2];
            copy = response.data.data
            setDept2(copy);
            console.log(response.data)
        } catch (error) {
            console.log(error.message)
        }
    }

    const dept3select = async(event)=>{
        let copy = selectLocation2
        copy = event
        setSelectLocation2(copy)
        const response = await axios.post("http://localhost:8080/weather/locations/dept3",{"dept1":selectLocation1,"dept2":event});
        try{
            let copy = [dept3];
            copy = response.data.data
            setDept3(copy);
            console.log(response.data.data)
        } catch (error) {
            console.log(error.message)
        }
    }

    const showWeather = async(event)=>{
        let copy = selectLocation3
        copy = event
        setSelectLocation3(copy)
        const response = await axios.post("http://localhost:8080/weather/show",{"dept1":selectLocation1,"dept2":selectLocation2,"dept3":event});
        try{
            let copy = [...weather]
            copy = response.data.data
            setWeather(copy)
            console.log(response.data)
        }catch(error){
            console.log(error.message)
        }
    }

    

    return (
        <div>
            <h4>Aiden</h4>
            <button onClick={dept1select}>클릭</button>
            <select onChange={(event) => dept2select(event.target.value)}>
                <option aria-readonly>Dept1</option>
                {
                    dept1.map((a,i)=>(
                        <option key={a}>{a}</option>
                    ))
                }
            </select>
            <select onChange={(event) => dept3select(event.target.value)}>
                <option aria-readonly>Dept2</option>
                {
                    dept2.map((a,i)=>(
                        <option key={a}>{a}</option>
                    ))
                }
            </select>
            <select onChange={(event) => showWeather(event.target.value)}>
                <option aria-readonly>Dept3</option>
                {
                    dept3.map((a,i)=>(
                        <option key={a}>{a}</option>
                    ))
                }
            </select>
            {
                weather.map((a,i)=>(
                    <div>{a}</div>
                ))
            }
        </div>
    );
}



export default Aiden;
