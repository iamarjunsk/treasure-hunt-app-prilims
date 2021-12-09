import React, { useEffect, useState } from 'react'

function Timer() {
    const [timeCount, setTimeCount] = useState(0)
    useEffect(() => {
        function timer(){
            setInterval(() => {
              setTimeCount(timeCount+1)
            }, 6000);
          }
    }, [])
    return (
        <div>
            {timeCount}
        </div>
    )
}

export default Timer
