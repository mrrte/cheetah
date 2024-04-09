import moment from 'moment'
function generateDayWiseScheduleWithRebase(inputData, studyHours, updatedHours, preStudyRedinessSchedule, everyThreeModule, suggestedFinalReview, eveningReview) {
    const days = {};
    let currentDay = 1;
    let currentDuration = 0;
    let everyThreeModuleIndex = 0;
    let currentDate = moment().subtract(1, 'day');
    let idsList = []
  
    // Process pre-study readiness schedule
    const preStudyRedinessScheduleDetails = preStudyRedinessSchedule["Pre_Study_Readiness_Schedule"]["Activities"]
    if (preStudyRedinessScheduleDetails) {
      const preStudyActivities = preStudyRedinessScheduleDetails;
  
      preStudyActivities.forEach(activity => {
        if (activity.Time) {
          const duration = parseDuration(activity.Time);
  
          if (currentDuration + duration > (activity.status === "Completed" ? studyHours : updatedHours) * 60) {
            currentDay++;
            currentDuration = 0;
          }
  
          if (!days[`Day${currentDay}`]) {
            days[`Day${currentDay}`] = [];
            if(activity.status === "Pending"){
                currentDate = currentDate.add(1, 'days');
                idsList.push({id:activity.id , type:activity.type, date : currentDate.format("MM/DD/YYYY")})
              }
          }
  
          days[`Day${currentDay}`].push({
            title: activity.Activity,
            totalDuration: activity.Time,
            status: activity.status ?? "Pending",
            id: activity.id,
            type: activity.type,
            date: activity.status === "Pending" ? currentDate.format("MM/DD/YYYY") : activity?.date ?? ""
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
            if (currentDuration + duration > (subtopic.status === "Completed" ? studyHours : updatedHours) * 60) {
              currentDay++;
              currentDuration = 0;
            }
  
            if (!days[`Day${currentDay}`]) {
              days[`Day${currentDay}`] = [];
              if(subtopic.status === "Pending"){
                currentDate = currentDate.add(1, 'days');
                idsList.push({id:subtopic.id , type:subtopic.type, date : currentDate.format("MM/DD/YYYY")})
              }
            }
  
            days[`Day${currentDay}`].push({
              title: subtopic.title,
              totalDuration: subtopic.totalDuration,
              activities: [subtopic],
              id: subtopic.id,
              status: subtopic?.status ?? "Pending",
              type: subtopic.type,
              date: subtopic.status === "Pending" ? currentDate.format("MM/DD/YYYY") : subtopic?.date ?? " ",
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
        currentDuration = updatedHours * 60;
        if (!days[`Day${currentDay}`]) {
          days[`Day${currentDay}`] = [];
          if(everyThreeModuleDetails.status === "Pending"){
            currentDate = currentDate.add(1, 'days');
            idsList.push({id:everyThreeModuleDetails.id , type:everyThreeModuleDetails.type, date : currentDate.format("MM/DD/YYYY")})
          }
        }
        days[`Day${currentDay}`].push({
          title: everyThreeModuleDetails.title,
          totalDuration: everyThreeModuleDetails.totalDuration,
          activities: [everyThreeModuleDetails.activities],
          status: everyThreeModuleDetails?.status ?? "Pending",
          type: everyThreeModuleDetails?.type,
          id: everyThreeModuleDetails.id,
          date: everyThreeModuleDetails.status === "Pending" ? currentDate.format("MM/DD/YYYY") : everyThreeModuleDetails?.date ?? " "
        });

      }
    }

    currentDay++;
    if (!days[`Day${currentDay}`]) {
      days[`Day${currentDay}`] = [];
    }
    for (const activityTitle in suggestedFinalReview) {
        if(suggestedFinalReview[activityTitle].status === "Pending"){
            currentDate = currentDate.add(1, 'days');
            idsList.push({id:suggestedFinalReview[activityTitle].id , type:suggestedFinalReview[activityTitle].type, date : currentDate.format("MM/DD/YYYY")})
        }
      if (activityTitle != "TotalTime") {
        days[`Day${currentDay}`].push({
          title: activityTitle.replace(/_/g, ' '),
          totalDuration: suggestedFinalReview[activityTitle].PerModule,
          status: suggestedFinalReview[activityTitle].status ?? "Pending",
          id: suggestedFinalReview[activityTitle].id,
          type: suggestedFinalReview[activityTitle].type,
          date: suggestedFinalReview[activityTitle].status === "Pending" ? currentDate.format("MM/DD/YYYY") : suggestedFinalReview[activityTitle]?.date ?? " "
        });
      }
     
    }
    // console.log("idsListidsListidsList",idsList)
  
    return {days,idsList};
}

  

  // This function will organize task view by topics data into task view by day 
export function topicByDayOrganizerWithRebase(data, updatedHours){
    try {
        const  {topicsList,schedulePlanDetails,preStudyRedinessScheduleDetails,everyThreeModule,suggestedFinalReview,eveningReview} = data

        const organizeData = generateDayWiseScheduleWithRebase(topicsList,schedulePlanDetails["studyHours"],updatedHours,preStudyRedinessScheduleDetails,everyThreeModule,suggestedFinalReview,eveningReview)
        const transfromedOrganizedData = transformData(organizeData.days)
        // console.log("transfromedOrganizedData",JSON.stringify(transfromedOrganizedData.idsList))
        return {transfromedOrganizedData,idsList:organizeData.idsList} ?? [];
        
    } catch (error) {
        console.error("error while organizing day by topic", error);
        return {}
        
    }
}


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

function parseDuration(timeString) {
    const [hours, minutes] = timeString.split(':').map(Number);
    return hours * 60 + minutes;
  }
  