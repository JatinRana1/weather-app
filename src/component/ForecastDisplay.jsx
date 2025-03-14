import React from 'react'

const ForecastDisplay = ({forecast, dayNames}) => {

  return (
    <div className='d-flex justify-content-around gap-2'>
    {forecast?.forecastday?.map((day, index)=>(
        <div className='d-flex flex-column align-items-center' key={index}>
            <span>{dayNames[new Date(day.date).getDay()].slice(0,3)}</span>
            <img width={40} src={day.day.condition.icon} alt={day.day.condition.text} title={day.day.condition.text}/>
            <div className="d-flex justify-content-between gap-2">
                <span className=''>{day.day.maxtemp_c} <sup><sup>o</sup></sup> </span>
                <span>{day.day.mintemp_c} <sup><sup>o</sup></sup></span>
            </div>
        </div>
    ))}
</div>
  )
}

export default ForecastDisplay;