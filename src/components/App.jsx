import { useEffect, useRef, useState } from "react"

function App() {
    const inputTime = useRef()
    const [currentTime, setCurrentTime] = useState('')
    const [alarms, setAlarms] = useState([]) 

    function addAlarm(time) {
        let id = Date.now()
        setAlarms((prevAlarms) => [...prevAlarms, {id, time}])
        addInterval(time, id)
    }

    useEffect(() => {
        setInterval(() => {
            setCurrentTime(new Date().toLocaleTimeString())
        }, 1000)
    }, [])

    function removeAlarm(id) {
        setAlarms((prevAlarms) => {
            return prevAlarms.filter((alarm) => alarm.id !== id)
        })
    }
    
    function isAlarmExist(id) {
        for (let alarm of alarms) {
            if (alarm.id === id) return true
        } 
        return false
    }

    function addInterval(time, id) {
        let alarmInteval = setInterval(() => {
            if (isAlarmExist(id)) {
                clearInterval(alarmInteval)
            }
            let hour = parseInt(time.slice(0, 2))
            let minute = parseInt(time.slice(3, 5))
            let currentHour = new Date().getHours()
            let currentMinute = new Date().getMinutes()
            console.log(hour, minute, currentHour, currentMinute)
            if (hour === currentHour && minute === currentMinute) { 
                removeAlarm(id)
                alert(`${hour}:${minute} ring`)
                clearInterval(alarmInteval)
            }
        }, 1000)

    }

    useEffect(() => {
        inputTime.current.value = '00:00'
    }, [alarms])

    return (
        <>
        <div>
            <p>{currentTime}</p>
            <input type="time" ref={inputTime} />
            <br />
            <button onClick={() => addAlarm(inputTime.current.value)}>Add Alarm</button>
        </div>
        <div>
            {alarms.map((alarm, index) => {
                return <p key={index}>{alarm.time}</p>
            })}
        </div>
        </>
    )
}

export default App