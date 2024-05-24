import React, { useState, useEffect } from 'react';

function Redirect() {
const [seconds, setSeconds] = useState(3);

useEffect(() => {
    const timer = setInterval(() => {
    setSeconds((prevSeconds) => prevSeconds - 1);
    }, 1000); // 1000 milliseconds = 1 second

    return () => clearInterval(timer); // Cleanup on component unmount
}, []);

useEffect(() => {
    if (seconds === 0) {
    // Navigate back one page using window.history
    window.history.back();
    }
}, [seconds]);

return (
    <div className='w-full h-full flex justify-center items-center backdrop-blur-sm'>
    <h1>Please Wait! Redirecting back in {seconds} seconds...</h1>
    </div>
);
}

export default Redirect;
