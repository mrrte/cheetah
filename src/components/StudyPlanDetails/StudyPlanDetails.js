import React from "react";
import { STYLE_PLAN_TITLE } from "../../constants";
import StudyPlanCheckBox from "./StudyPlanCheckBox";

const StudyPlanDetails = () => {
  return (
    <div className="col-md-10 container mt-4 px-3">
      <div className="study-plan-details p-4 mx-3">
        <div className="alert alert-style d-flex justify-content-center" role="alert">
          {STYLE_PLAN_TITLE}
        </div>
        <StudyPlanCheckBox />
      </div>

    </div>
  );
};

export default StudyPlanDetails;
