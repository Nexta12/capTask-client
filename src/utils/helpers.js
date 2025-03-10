export const scrollUP = () => {
    return window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  export const extractNumber = (str) => parseInt(str.match(/\d+/)?.[0] || "0", 10);

  export const DateFormatter = (dateString) => {
    if (!dateString || isNaN(new Date(dateString).getTime())) {
      return '-'; // Return '-' for invalid or null dates
    }
    const date = new Date(dateString);
    const day = date.getDate();
    const suffix = ["th", "st", "nd", "rd"][
      (day % 10 > 3 || [11, 12, 13].includes(day % 100)) ? 0 : day % 10
    ];
  
    return date.toLocaleDateString("en-US", { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    }).replace(/\d+/, `${day}${suffix}`);
  };

  // Helper Function to extract Nested object from Table
  export const getNestedValue = (obj, path) => {
    return path.split('.').reduce((acc, key) => acc && acc[key] ? acc[key] : '', obj);
  };


  export const calculateTotalPrice = (startDate, endDate, costPerNight) => {
    // Check if required inputs are provided
    if (!startDate || !endDate || !costPerNight) return 0;
  
    // Parse the dates to ensure they are valid Date objects
    const start = new Date(startDate);
    const end = new Date(endDate);
  
    // Check if the parsed dates are valid
    if (isNaN(start.getTime())) throw new Error("Invalid Check In date");
    if (isNaN(end.getTime())) throw new Error("Invalid Check out date");
  
    // Ensure end date is greater than start date
    if (end <= start) {
      throw new Error("Check Out Date must be in the future");
    }
  
    // Calculate the number of nights
    const millisecondsPerDay = 1000 * 60 * 60 * 24;
    const numberOfNights = Math.ceil((end - start) / millisecondsPerDay);
  
    // Calculate the total price
    return numberOfNights * costPerNight;
  };

  // utils/getGreeting.js
export const getGreeting = () => {
  const hour = new Date().getHours(); // Get the current hour (0-23)

  if (hour >= 5 && hour < 12) {
    return "Good Morning";
  } else if (hour >= 12 && hour < 18) {
    return "Good Afternoon";
  } else {
    return "Good Evening";
  }
};


export const countDataStatus = (data, status) =>{
  const statusType = data.filter(d => d.status === status);

  return statusType.length

}

  
