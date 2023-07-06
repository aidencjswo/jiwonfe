import React, { useEffect, useState } from "react";
import axios from "axios";

function Aiden() {
    let[weatherData,setWeatherData] = useState(['0']);

    useEffect(() => {
        console.log('컴포넌트가 화면에 나타남');
        return () => {
            console.log('컴포넌트가 화면에서 사라짐');
        };
    }, []);

    const handleClick = async () => {
        try {
            const response = await axios.get("http://localhost:8080/weather/locations");
            let copy = [weatherData];
            copy = response.data
            setWeatherData(copy);
            console.log(weatherData)
            console.log(weatherData[0].dept1)
        } catch (error) {
            console.log("실패",error.message);
        }
    };

    

    return (
        <div>
            <h4>Aiden</h4>
            <button onClick={handleClick}>클릭</button>
            <select>
                <option>{weatherData[0].dept1}</option>
            </select>
            <h4>{weatherData[0].dept1}</h4>
        </div>
    );
}

export default Aiden;
