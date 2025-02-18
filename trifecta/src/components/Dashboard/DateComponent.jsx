import React, { useState, useEffect } from "react";
import { useTenantContext } from "../../hooks/useTenantContext";

// GreetingComponent definition
const GreetingComponent = () => {
  const [greeting, setGreeting] = useState("");

  const { companyName } = useTenantContext();

  useEffect(() => {
    const currentDate = new Date();
    const currentHour = currentDate.getHours();

    if (currentHour < 12) {
      setGreeting("Good Morning, " + companyName);
    } else if (currentHour >= 12 && currentHour < 18) {
      setGreeting("Good Afternoon, " + companyName);
    } else {
      setGreeting("Good Evening, " + companyName);
    }
  }, []);

  return <p className="font-bold p-1 text-base">{greeting}</p>;
};

// DateComponent definition
const DateComponent = () => {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000); // 1000 milliseconds = 1 second

    return () => clearInterval(interval);
  }, []);

  // Format the date
  const formattedDate = currentDateTime.toLocaleDateString();

  // Format the time
  const formattedTime = currentDateTime.toLocaleTimeString();

  // Determine the image based on time of the day
  let imageUrl;
  const currentHour = currentDateTime.getHours();
  if (currentHour < 12) {
    imageUrl =
      "https://icon-library.com/images/morning-icon/morning-icon-4.jpg";
  } else if (currentHour >= 12 && currentHour < 18) {
    imageUrl =
      "https://tse2.mm.bing.net/th?id=OIP.sspjc8wGiBylurByiM8l9wHaHa&pid=Api&P=0&h=180";
  } else {
    imageUrl =
      "https://tse2.mm.bing.net/th?id=OIP.gxzgZNEYAX9Y28DJxfYucAHaHa&pid=Api&P=0&h=180";
  }

  return (
    <div className="date-container flex  lg:mx-16 mt-8  lg:px-2 justify-between ">
      <div className="greeting flex p-2 justify-between">
        <img
          src={imageUrl}
          alt="Time of the day"
          style={{ width: "40px", height: "40px" }}
        />
        <GreetingComponent /> {/* Render the GreetingComponent */}
      </div>
      <div className="date p-2 justify-items-end flex ">
        <p className="font-bold p-1 ">{formattedDate}</p>
        <p className="font-bold p-1">{formattedTime}</p>
      </div>
    </div>
  );
};

export default DateComponent;
