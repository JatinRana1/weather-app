import React from 'react'

function WeatherDisplay({current, location, dayNames}) {
    
    return (
        <div className='d-flex justify-content-between'>
            <div className=''>
                <span className='d-block fs-5 fw-bold'>{`${location?.name}, ${location?.region}`}</span>
                <img className='' width={80} src={current?.condition?.icon} alt={current?.condition?.text} />
                <span className='ms-1 fs-2'>{current?.temp_c} <sup><sup>o</sup>C</sup> </span>
            </div>
            <div className='ms-auto '>
                <span className='d-block text-end fs-5 fw-bold'>{dayNames[new Date().getDay()]}</span>
                <span>{current?.condition?.text}</span>
            </div>
        </div>
    )
}

export default WeatherDisplay