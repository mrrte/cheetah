import React from "react";
import AdvertisementImg from "../../assets/images/advertisement.jpg"
import MyTooltip from "../../utils/MyTooltip/MyTooltip";

const AdvertisementSection=()=>{
    return<>
    <div className="col d-flex flex-column mt-4">
        <MyTooltip>
        <img src={AdvertisementImg} alt="advertisement image" className="img-fluid advertisement-img mb-2" />
        </MyTooltip>
        <MyTooltip>
        <img src={AdvertisementImg} alt="advertisement image" className="img-fluid advertisement-img mb-2" />
        </MyTooltip>
    </div>
    </>
}

export default AdvertisementSection;