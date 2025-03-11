import React, { useEffect, useState } from 'react'

const App = () => {

  const [time , setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [recordedTime, setRecordedTime] = useState([]);

  useEffect(() => {

    let timer;

    if(isRunning) {
      timer = setInterval(() => {
        setTime((prev) => (prev+10), 10);
      })
    }
    else{
      clearInterval(timer);
    }

    return () => clearInterval(timer);

  },[isRunning]);

  const formateTime = (time) => {

    const minutes = Math.floor(time/60000).toString().padStart(2, '0');

    const seconds = Math.floor(time%60000/1000).toString().padStart(2,'0');

    const centiSecs = Math.floor(time%1000/10).toString().padStart(2, '0');

    return `${minutes} : ${seconds} : ${centiSecs}`;

  }

  function deleteRecordedTime( timer){
    setRecordedTime((prev) => prev.filter((time) => time !== timer));
  }

  return (
    <div className=' flex flex-col items-center min-h-screen bg-gradient-to-br from-gray-900 to-black text-white relative py-20'>

      <div className=" bg-zinc-300 bg-opacity-20 backdrop-blur-lg p-12 rounded-3xl shadow-2xl border border-gray-300/30 text-center w-[600px] relative">

        <h1 className=' text-4xl font-mono font-semibold mb-6 tracking-widest text-black'>
          STOP WATCH
        </h1>

        <div className=" bg-gradient-to-br from-gray-900 to-black p-4 rounded-2xl shadow-2xl text-6xl font-mono font-semibold mb-6">

          {formateTime(time)}
        </div>

        <div className=" space-x-2">

          <button onClick={() => {
            setIsRunning(true);
          }}
          className=' bg-blue-500 p-4 px-6 text-3xl rounded-2xl'
          >
            Start
          </button>

          <button onClick={() => {
            setIsRunning(false);
          }}
          className=' bg-red-500 p-4 px-6 text-3xl rounded-2xl'
          >
            Stop
          </button>

          <button onClick={() => {
            setIsRunning(false);
            setTime(0);
            setRecordedTime([]);
          }}
          className=' bg-green-500 p-4 px-6 text-3xl rounded-2xl'
          >
            Reset
          </button>

          <button onClick={() => {
            if( time !== 0 ){
              setRecordedTime((prev) => (
                [formateTime(time), ...prev]
              ));
            }
          }}
          className=' bg-pink-500 p-4 px-6 text-3xl rounded-2xl'
          >
            Record
          </button>

        </div>

      </div>

      { recordedTime.length!==0 && <div className=" bg-zinc-300 bg-opacity-20 backdrop-blur-lg p-4 rounded-3xl shadow-2xl border border-gray-300/30 text-center w-[600px] relative mt-10">
          {
            recordedTime.map((timer) => (
              <div key={timer} className=" bg-gradient-to-br from-gray-900 to-black p-2 rounded-2xl shadow-2xl text-3xl font-mono font-semibold mb-2 relative" >
                {timer}

                <button
                onClick={() => {
                  deleteRecordedTime(timer);
                }}
                className=' absolute flex items-center justify-center right-4 text-lg top-[25%] bg-red-700 px-2 rounded-md'
                >
                  Delete
                </button>

              </div>
            ))
          }
      </div>}

      <p className=' absolute right-2 top-2 text-white/10'>
        Created by Jitendriya Meher
      </p>


    </div>
  )
}

export default App