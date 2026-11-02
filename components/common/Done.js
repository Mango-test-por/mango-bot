import React, { useContext } from "react";
import SendData from "../../hooks/SendData.js";
import { DataContext } from "../../pages";
import CompletionScreen from "../porsche/CompletionScreen.jsx";

function Done() {
  let { AllData } = useContext(DataContext);

  React.useEffect(() => {
    const params = {
      ...AllData,
      currentStep: "Done",
    };

    SendData(params);
  }, []);

  return <CompletionScreen meeting={AllData} />;
}

export default Done;
