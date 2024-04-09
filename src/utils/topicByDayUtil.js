// This function will transform day data according to frontend requirements 
function transformData(inputData) {
    const transformedData = [];

    for (const day in inputData) {
        const data = inputData[day]
        transformedData.push({
            day : day,
            data : data
        })
    }

    return transformedData;
}


// This function will organize task view by topics data into task view by day 
export function topicByDayOrganizer(data){
    try {
        const  {topicsList,schedulePlanDetails,preStudyRedinessScheduleDetails,everyThreeModule,suggestedFinalReview,eveningReview} = data

        const organizeData = generateDayWiseSchedule(topicsList,schedulePlanDetails["studyHours"],preStudyRedinessScheduleDetails,everyThreeModule,suggestedFinalReview,eveningReview)
        const transfromedOrganizedData = transformData(organizeData)
        // console.log("transfromedOrganizedData",JSON.stringify(transfromedOrganizedData))
        return transfromedOrganizedData ?? [];
        
    } catch (error) {
        console.error("error while organizing day by topic", error);
        return {}
        
    }
}

export function topicOrganizer(data){
  try {
      const  {topicsList,schedulePlanDetails,preStudyRedinessScheduleDetails,everyThreeModule,suggestedFinalReview,eveningReview} = data

      const organizeData = generateTopicWiseSchedule(topicsList,schedulePlanDetails["studyHours"],preStudyRedinessScheduleDetails,everyThreeModule,suggestedFinalReview,eveningReview)
      console.log("organizeData",organizeData)
      const transfromedOrganizedData = transformData(organizeData)
      // console.log("transfromedOrganizedData",JSON.stringify(transfromedOrganizedData))
      return transfromedOrganizedData ?? [];
      
  } catch (error) {
      console.error("error while organizing day by topic", error);
      return {}
      
  }
}
/**
 * 
 * This function is responsible for tansforming below data : 
 *  - Pre study rediness schedule
 *  -  Topics List
 *  - Evening review
 *  - Every three module
 *  - Final Schedule details
 * 
 * into task View by Day Data
 **/ 
function generateDayWiseSchedule(inputData, studyHours, preStudyRedinessSchedule,everyThreeModule,suggestedFinalReview,eveningReview) {
    const days = {};
    let currentDay = 1;
    let currentDuration = 0;
    let everyThreeModuleIndex = 0;
  
    // Process pre-study readiness schedule
    const preStudyRedinessScheduleDetails = preStudyRedinessSchedule["Pre_Study_Readiness_Schedule"]["Activities"]
    if (preStudyRedinessScheduleDetails) {
      const preStudyActivities = preStudyRedinessScheduleDetails;
  
      preStudyActivities.forEach(activity => {
        if (activity.Time) {
          const duration = parseDuration(activity.Time);
  
          if (currentDuration + duration > studyHours * 60) {
            currentDay++;
            currentDuration = 0;
          }
  
          if (!days[`Day${currentDay}`]) {
            days[`Day${currentDay}`] = [];
          }
  
          days[`Day${currentDay}`].push({
            title: activity.Activity,
            totalDuration: activity.Time,
            status: activity.status ?? "Pending",
            id : activity.id,
            type: activity.type,
            date : activity?.date  ?? ""
          });
  
          currentDuration += duration;
        }
      });
    }
  
    // Process study plan inputData
    for (let i = 0; i < inputData.length; i++) {
      const plan = inputData[i];
      for (const topicKey in plan) {
        const topic = plan[topicKey];
  
        for (const subtopicKey in topic) {
          const subtopic = topic[subtopicKey];
          if (subtopic.totalDuration && subtopic.totalDuration != undefined) {
            const duration = parseDuration(subtopic.totalDuration);
            if (currentDuration + duration > studyHours * 60) {
              currentDay++;
              currentDuration = 0;
            }
  
            if (!days[`Day${currentDay}`]) {
              days[`Day${currentDay}`] = [];
            }
  
            days[`Day${currentDay}`].push({
              title: subtopic.title,
              totalDuration: subtopic.totalDuration,
              activities: [subtopic],
              id : subtopic.id,
              status: subtopic?.status ?? "Pending",
              type: subtopic.type,
              date: subtopic?.date ?? " ",
              eveningReview: eveningReview['Evening_Review'],
            });
  
            currentDuration += duration;
          }
        }
      }
      const everyThreeModuleDetails = everyThreeModule[everyThreeModuleIndex]['Every_Three_Topics_-_Take_a_baseline_Mock_Exam']
      // console.log("everyThreeModuleDetails",everyThreeModuleDetails)
      if ((i + 1) % 3 == 0) {
        currentDay++;
        currentDuration = studyHours * 60;
        if (!days[`Day${currentDay}`]) {
          days[`Day${currentDay}`] = [];
        }
        days[`Day${currentDay}`].push({
          title: everyThreeModuleDetails.title,
          totalDuration: everyThreeModuleDetails.totalDuration,
          activities: [everyThreeModuleDetails.activities],
          status: everyThreeModuleDetails?.status ?? "Pending",
          type: everyThreeModuleDetails?.type,
          id : everyThreeModuleDetails.id,
          date : everyThreeModuleDetails?.date ?? " "
        });
      }
    }

    currentDay++;
    if (!days[`Day${currentDay}`]) {
      days[`Day${currentDay}`] = [];
    }
    for (const activityTitle in suggestedFinalReview) {
      if(activityTitle !="TotalTime"){
        days[`Day${currentDay}`].push({
          title: activityTitle.replace(/_/g, ' '),
          totalDuration: suggestedFinalReview[activityTitle].PerModule,
          status: suggestedFinalReview[activityTitle].status ??"Pending",
          id : suggestedFinalReview[activityTitle].id,
          type :  suggestedFinalReview[activityTitle].type,
          date : suggestedFinalReview[activityTitle]?.date ?? " "
        });
      }
    }
  
    return days;
  }



  // This function convert HH:MM:SS to hours 
  export function parseDuration(duration) {
    // console.log("reached",duration)
    const [hours, minutes, seconds] = duration.split(':').map(Number);
    return hours * 60 + minutes + seconds / 60;
  }
  
  function generateTopicWiseSchedule(inputData, studyHours, preStudyRedinessSchedule,everyThreeModule,suggestedFinalReview,eveningReview) {

    try {
      
        const days = {};
        let everyThreeModuleIndex = 0;
        let currentDuration = 0;

      
        // Process pre-study readiness schedule
        const preStudyRedinessScheduleDetails = preStudyRedinessSchedule["Pre_Study_Readiness_Schedule"]["Activities"]
        if (preStudyRedinessScheduleDetails) {
          const preStudyActivities = preStudyRedinessScheduleDetails;
          days["Pre_Study_Readiness_Schedule"] = [];
          preStudyActivities.forEach(activity => {
            if (activity.Time) {
              const duration = parseDuration(activity.Time);
      
              // if (currentDuration + duration > studyHours * 60) {
              //   currentDay++;
              //   currentDuration = 0;
              // }
      
              
                
              
      
              days["Pre_Study_Readiness_Schedule"].push({
                title: activity.Activity,
                totalDuration: activity.Time,
                status: activity.status ?? "Pending",
                id : activity.id,
                type: activity.type
              });
      
            // currentDuration += duration;
            }
          });
        }
      
        //Process study plan inputData
        for (let i = 0; i < inputData.length; i++) {
          const plan = inputData[i];
          for (const topicKey in plan) {
            const topic = plan[topicKey];
            let spaces = ' '.repeat(i)
            days[`${topicKey}${spaces}`] = [];
            for (const subtopicKey in topic) {
              const subtopic = topic[subtopicKey];
              if (subtopic.totalDuration && subtopic.totalDuration != undefined) {
                const duration = parseDuration(subtopic.totalDuration);
                if (currentDuration + duration > studyHours * 60) {
                  currentDay++;
                  currentDuration = 0;
                }
      
                // if (!days[`Day${currentDay}`]) {
                //   days[`Day${currentDay}`] = [];
                // }
      
                days[`${topicKey}${spaces}`].push({
                  title: subtopic.title,
                  totalDuration: subtopic.totalDuration,
                  activities: [subtopic],
                  id : subtopic.id,
                  status: subtopic?.status ?? "Pending",
                  type: subtopic.type,
                  eveningReview: eveningReview['Evening_Review'],
                });
      
              
              }
            }
          }
          const everyThreeModuleDetails = everyThreeModule[everyThreeModuleIndex]['Every_Three_Topics_-_Take_a_baseline_Mock_Exam']
          // // console.log("everyThreeModuleDetails",everyThreeModuleDetails)
        
          if ((i + 1) % 3 == 0) {
            console.log("i",i)
            // currentDay++;
            // currentDuration = studyHours * 60;
            let spaces = ' '.repeat(i)
              days[`Every 3 modules${spaces}`] = [];
            
            days[`Every 3 modules${spaces}`].push({
              title: everyThreeModuleDetails.title,
              totalDuration: everyThreeModuleDetails.totalDuration,
              activities: [everyThreeModuleDetails.activities],
              status: everyThreeModuleDetails?.status ?? "Pending",
              type: everyThreeModuleDetails?.type,
              id : everyThreeModuleDetails.id,
            });
            everyThreeModuleIndex ++
          }
        }
    
        // currentDay++;
      
          days["suggestedFinalReview"] = [];
        
        for (const activityTitle in suggestedFinalReview) {
          if(activityTitle !="TotalTime"){
            days["suggestedFinalReview"].push({
              title: activityTitle.replace(/_/g, ' '),
              totalDuration: suggestedFinalReview[activityTitle].PerModule,
              status: suggestedFinalReview[activityTitle].status ??"Pending",
              id : suggestedFinalReview[activityTitle].id,
              type :  suggestedFinalReview[activityTitle].type,
            });
          }
        }
      
        return days;
    } catch (error) {
       console.log("eeeeeeeeeeeeeeeeeeeeeeeeee", error)
    }
   
  }