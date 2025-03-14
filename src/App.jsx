import React from "react";
import WeatherDisplay from "./component/WeatherDisplay";
import ForecastDisplay from "./component/ForecastDisplay";
import SearchWeather from './component/SearchWeather'
import {Container, Row, Col, Card} from 'react-bootstrap'
import { useGetWeatherDataQuery } from "./service/weather";
import { getLocation } from "./utils/navigator";

const DEFAULT_QUERY = {
    q: 'new delhi',
    days: '4'
};

const weatherGradients = {
    Clear: 'linear-gradient(135deg, #f7b733, #fc4a1a)', // Warm Sunset
    Sunny: 'linear-gradient(135deg, #ffb347, #ffcc33)', // Bright Sun
    Cloudy: 'linear-gradient(135deg, #bdc3c7, #2c3e50)', // Cloudy Gray
    Overcast: 'linear-gradient(135deg, #6c757d, #343a40)', // Dark Gray Overcast
    Mist: 'linear-gradient(135deg, #a0aec0, #718096)', // Foggy Mist
    Rain: 'linear-gradient(135deg, #1e3a8a, #1e90ff)', // Deep Rain Blue
    Drizzle: 'linear-gradient(135deg, #00aaff, #66ccff)', // Light Drizzle Blue
    Thunderstorm: 'linear-gradient(135deg, #4a5568, #232526)', // Stormy Dark
    Snow: 'linear-gradient(135deg, #ffffff, #dfe6e9)', // Snowy White
    Default: 'linear-gradient(135deg, #2196F3, #6DD5FA)', // Default Sky Blue
};

export const App = () => {

    const [query, setQuery] = React.useState(null);
    const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    
    React.useEffect(() => {
        getLocation((pos) => {
            const query = pos.coords.latitude.toFixed(4) + ',' + pos.coords.longitude.toFixed(4)
            setQuery({
                q: query,
                days: '4'
            })
        })
    }, [])
    
    const { data, error, isLoading } = useGetWeatherDataQuery(query || DEFAULT_QUERY)

    if (isLoading) return <p className="text-center">Loading weather...</p>;
    if (error) return <p className="text-center">Error loading weather data</p>;

    const condition = data?.current?.condition?.text || 'Default';
    const bgGradient = weatherGradients[condition];
    
    if(data){
        console.log(data)
    }

    return (
        <div className="vh-100 d-flex align-items-center">
            {data && (
                <Container className="">
                    <Row className="justify-content-center mt-4">
                        <Col xs={12} md={5}>
                        <Card className='p-3 gap-4 shadow' style={{'background': bgGradient}}>
                            <WeatherDisplay dayNames={dayNames} current={data.current} location={data.location}/>
                            <h2 className="fs-5">Forecast </h2>
                            <ForecastDisplay dayNames={dayNames} forecast={data.forecast}/>
                            <Col xs={12}>
                                <SearchWeather setQuery={setQuery}/>
                            </Col>
                        </Card>
                        </Col>
                    </Row>
                </Container>
            )}
        </div>
    )
}