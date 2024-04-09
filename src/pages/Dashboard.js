import React, { useEffect } from "react";
import AdvertisementSection from "../components/Advertisement/AdvertisementSection";
import Quotes from "../components/Quotes/Quotes";
import StudyPlanDetails from "../components/StudyPlanDetails/StudyPlanDetails";

const Dashboard=()=>{

  useEffect(()=>{
    const proeficiencyFormData = sessionStorage.getItem('proeficiencyFormData')
    if(proeficiencyFormData){
      sessionStorage.removeItem('proeficiencyFormData')
    }
  },[])
    return(<>
    <Quotes/>
    <div className="row">
      <StudyPlanDetails/>
      <AdvertisementSection />
    </div>
    </>)

}

export default Dashboard