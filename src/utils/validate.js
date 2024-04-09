export const handleDateChangeUtils=(inputDate)=>{
    const currentDate = new Date().toISOString().split('T')[0]; // Get today's date in YYYY-MM-DD format
  if (inputDate < currentDate) {
    return{
        message:"Please select a date that is equal to or later than today's date",
        boolValue:false
       }
  } else {
    return{
        message:"",
        boolValue:true
       }
  }

}
export const openNotificationWithIcon = (type, header, message) => {
    notification[type]({
      message: header,
      description: message,
    });
    notification.config({
      duration: 10,
    });
  };
