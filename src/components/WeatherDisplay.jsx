const WeatherDisplay = (prop) => {

  // Create date in format as stated in wire frame
  const rawDateStr = customDate.toString();
  const day = rawDateStr.slice(0, 3);
  const month = rawDateStr.slice(4, 7);
  let date = rawDateStr.slice(8, 10);
  date = date.replace(/^0+/, "");
  let dateSuffix = "th";
  if (date === "1" || date === "21" || date === "31") dateSuffix = "st";
  if (date === "2" || date === "22") dateSuffix = "nd";
  if (date === "3" || date === "23") dateSuffix = "rd";
  const year = rawDateStr.slice(11, 15);
  const displayDate = `${day}, ${date}${dateSuffix} ${month}, ${year}`
  
  return (
    <div>
      <p>{displayDate}</p>
      {/* Weather icon */}
      {/* Temperature */}
      {/* Weather desc */}      
    </div>
  )
}

export default WeatherDisplay
