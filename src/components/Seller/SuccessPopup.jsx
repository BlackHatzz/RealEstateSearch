import React, { useEffect, useState } from "react";
import "./success-popup.css";
import CheckCircleOutlineOutlinedIcon from "@material-ui/icons/CheckCircleOutlineOutlined";
import {
//   Audio,
//   BallTriangle,
//   Bars,
//   Circles,
//   Grid,
//   Hearts,
//   Oval,
//   Puff,
//   Rings,
//   SpinningCircles,
  TailSpin,
//   ThreeDots,
} from "@agney/react-loading";

const SuccessPopup = ({ close, title }) => {
  var [isLoading, setIsLoading] = useState(true);

  const renderContent = () => {
    if (isLoading) {
        setInterval(() => {setIsLoading(false);}, 3500);
      return (
        <React.Fragment>
          <div className="success-popup-icon-container">
            <div className="loading-indicator-container">
              <TailSpin className="loading-indicator" />
            </div>
          </div>
          <span>{title}</span>
        </React.Fragment>
      );
    }
    return (
      <React.Fragment>
        <div className="success-popup-icon-container">
          <CheckCircleOutlineOutlinedIcon className="icon" />
        </div>
        <span>{title}</span>
      </React.Fragment>
    );
  };
//   if()
  
  return (
    <React.Fragment>
      <div className="success-popup-container">
        {renderContent()}
        <div onClick={close} className="noselect confirm">
          <span>OK</span>
        </div>
      </div>
    </React.Fragment>
  );
};

export default SuccessPopup;
