import React, { useState } from 'react';
import './popup.css'

function Popup({individual, closePopup }) {
    const [ selectedDate, assignDate ] = useState(individual.activity_periods)
    const [ optedDate, optDate ] = useState('')

    function clearFilter(user){
        assignDate(user.activity_periods)
        optDate('')
    }

    function setDateInterval(date){
        let selectedDates = []
        let dateVar = new Date(date)
        individual.activity_periods.map((eachDate) => {
            let dt = new Date(eachDate.start_time.split(new Date(dateVar).getFullYear())[0]+ new Date(dateVar).getFullYear())
            if(dt.getFullYear() === dateVar.getFullYear() &&
            dt.getMonth() === dateVar.getMonth() &&
            dt.getDay() === dateVar.getDay())
            {
                selectedDates.push(eachDate)
            }
        })
        optDate(date)
        if(selectedDates.length >= 1)
            assignDate(selectedDates)
        else assignDate(null)
    }

    return(
            <div className="modal"> 
                <div className="modal-content">
                <span className="close" onClick={closePopup}>&times;</span>
                {individual && <>
                <div className='content'><div className='keys'>User Id - </div><div className='values'>{individual.id}</div></div>
                <div className='content'><div className='keys'>User Name - </div><div className='values'>{individual.real_name}</div></div>
                <div className='content'><div className='keys'>User Timezone - </div><div className='values'>{individual.tz}</div></div>
                <div className='content'>
                    <div className='keys'>Select Date -</div>
                    <div>
                    <input type="date" id="date" name="date" value={optedDate} onChange={(e) => setDateInterval(e.target.value)} />
                    <button className='clear-filter' onClick={()=> clearFilter(individual)}>Clear Filter</button>
                    </div>
                </div>
                <hr />
                {optedDate && <div className='content'><div className='keys'>Selected Date -</div><div className='values'>{optedDate}</div></div>}
                <div>
                    {selectedDate ? selectedDate.map((date) => {
                        let day = date.start_time.split(' ')
                        let endDay = date.end_time.split(' ')
                        return(
                            <div className='each-day'>
                            <div className='day'>{`Day : ${day[0]} ${day[1]} ${day[2]}`}</div>
                            <div>Start Time - {day[3]}</div>
                            <div>End Time - {endDay[3]}</div>
                            </div>
                        )
                    }):<div>No Records Found!</div>}
                </div>
                </>}
                </div>
            </div>
    )
}

export default Popup