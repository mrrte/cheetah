// import moment from "moment";
// import Cookies from "js-cookie";
// import { COOKIE_DOMAIN } from "../constants/envConstants";
const moment  = require("moment")
const Cookies = require("js-cookie")
const {COOKIE_DOMAIN} = require("../constants/envConstants")

export function removePublicFromURL(url) {
    // Check if "public" exists in the URL
    if (url.includes('/public/')) {
      // Replace "public" with an empty string
      return url.replace('/public/', '/');
    }
    // If "public" is not found, return the original URL
    console.log("urllllllllllllllll",url)
    return url;
  }


  export function isDateGreaterThan(date1, date2) {
    // Parse the date strings using moment
    const momentDate1 = moment(date1, 'YYYY-MM-DD');
    const momentDate2 = moment(date2, 'YYYY-MM-DD');

    // Check if the first date is greater than the second date
    return momentDate1.isAfter(momentDate2);
  }


  export const isDateGreater = (startDate, endDate) => {
    // Replace these dates with your actual date values
    const start = moment(startDate);
    const end = moment(endDate);

    if (start.isBefore(end)) {
      console.log('Date 1 is greater than Date 2');
       return true
    } 
    return false
  };



  export const countCompletedAndPending=(data)=> {
    let completedItems = 0;
    let pendingItems = 0;

    data.forEach(day => {
        day.data.forEach(item => {
          if (item.status === "Completed") {
            completedItems++;
        } else if (item.status === "Pending") {
            pendingItems++;
        }
            // item.activities.forEach(activity => {
            //     if (activity.status === "Completed") {
            //         completedItems++;
            //     } else if (activity.status === "Pending") {
            //         pendingItems++;
            //     }
            // });
        });
    });

    return { completedItems, pendingItems };
}


// FOr subactivities
// export const filterCompletedTaskList = (data) => {
//   let completedTasks = [];
//   data.forEach(day => {
//     let completedActivities = [];
//     day.data.forEach(item => {
//       let completed = item.activities.filter(activity => activity.status === "Completed");
//       completedActivities = completedActivities.concat(completed);
//     });
//     if (completedActivities.length > 0) {
//       completedTasks.push({ day: day.day, activities: completedActivities });
//     }
//   });
//   return completedTasks;
// }

export const filterCompletedTaskList = (data) => {
  let completedTasks = [];
  data.forEach(day => {
    let completedActivities = [];
    day.data.forEach(item => {
      // Check if the main activity itself is completed
      if (item?.status === "Completed") {
        completedActivities.push(item);
      }
      // } else {
      //   // Check only main activities for completion
      //   let completed = item.activities.filter(activity => activity.status === "Completed");
      //   // If any main activity is completed, add it to the list
      //   if (completed.length > 0) {
      //     completedActivities.push({ ...item, activities: completed });
      //   }
      // }
    });
    if (completedActivities.length > 0) {
      completedTasks.push({ day: day.day, activities: completedActivities, totalDuration : day?.totalDuration ?? "" });
    }
  });
  return completedTasks;
}



export const setCookie = (key, value) => {
  try {
    Cookies.set(key,value, {
      path: "/",
      domain: COOKIE_DOMAIN,
    });
    return true;
  } catch (err) {
    console.log("error while setting cookie in domain", err);
    return false;
  }
};

export const getCookie = (key) => {
  try {
    const cookieDetails = Cookies.get(key);
    return cookieDetails;
  } catch (error) {
    console.log("error while getting cookie details", error);
    return false;
  }
};

export const removeCookie = (key) => {
  try {
    const cookieDetails = Cookies.remove(key);
    return cookieDetails;
  } catch (error) {
    console.log("error while getting cookie details", error);
    return false;
  }
};

export const userIsLoggedIn=()=>{
  try {
    const userID = localStorage.getItem("userId")
    const accessToken = window.localStorage.getItem("accessToken")
    if(userID && accessToken){
      return true;
    }
    return false;
  } catch (error) {
    console.log("error while checking if user is loggedIn or not", {error})
  }
}


export const ProgressCalculator=(taskViewByDayData)=>{
  try {
    const {completedItems,pendingItems} = countCompletedAndPending(taskViewByDayData)

    const totalTasks = completedItems + pendingItems;
    const percentageCompleted = (completedItems / totalTasks) * 100;
    const finalPercentage  = percentageCompleted ?? 0
    return finalPercentage

  } catch (error) {
      console.error("error while calculating progress bar percentage",error);
      return 0
  }
}


export function convertToHours(timeString) {
  // Split the time string into hours, minutes, and seconds
  const [hours, minutes, seconds] = timeString.split(':').map(Number);
  
  // Calculate total hours
  const totalHours = hours + (minutes / 60) + (seconds / 3600);
  return totalHours;
}