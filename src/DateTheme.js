import React, { useState, useEffect } from 'react'
import './calendar.css'
const DateTheme = ({year,month,absentDates}) => {

  const [calendarDates, setCalendarDate] = useState([])
  const [hols, setHols] = useState([])
  const [absent, setAbsent]= useState([])
  var sundays = [];
  var dates = []
  var date = '';
  var absents = [];
  useEffect(() => {
    date = new Date(year, month-1, 1);
    console.log(date.getMonth(), parseInt(month-1))
    while (date.getMonth() === parseInt(month-1)) {
      console.log(month-1)
      if (date.getDay() === 0) {
        sundays.push(date.toDateString());
      }
      dates.push(date.toDateString())
      date.setDate(date.getDate() + 1);
    }
    setCalendarDate(dates)
    setHols(sundays)
    absentDates.map((item,index)=>{
      absents.push(new Date(item).toDateString())
    })
    setAbsent(absents)
 
    return()=>{
      setAbsent([])
      absents = []
      sundays = []
      dates = []
      setCalendarDate(dates)
    }
  }, [month,absentDates,year])


  // for (let i = 1; i <= limit; i++) {
  //   calendarDates.push(i)
  // }

  // function daysInMonth(mo, year) {
  //   console.log(dates)
  //   return new Date(year, mo, 0).getDate();
  // }

  return (
    <div>

      <div className="current-month"></div>
      <table id="calendar">
        <tbody>
          {calendarDates.map((row, index) => {
            console.log(sundays)
            if(absent.includes(row)){
              if(hols.includes(row)){
                return(
                  <td style={{"background":"grey"}} key={index} onClick={()=>console.log(row)}>

                {new Date(row).getDate()}
              </td>
                )
              }
              else{
                return(
                  <td style={{"background":"red","color":"white"}} key={index} onClick={()=>console.log(row)}>

                {new Date(row).getDate()}
              </td>
                )
              }
            }
            else{
              if(hols.includes(row)){
                return(
                  <td style={{"background":"grey"}} key={index} onClick={()=>console.log(row)}>

                {new Date(row).getDate()}
              </td>
                )
              }
              else{
                return(
                  <td key={index} onClick={()=>console.log(row)}>

                {new Date(row).getDate()}
              </td>
                )
              }
            }
          }
          )}
        </tbody>
      </table>
    </div>
  )
}

export default DateTheme