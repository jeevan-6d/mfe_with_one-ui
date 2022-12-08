import React, { useEffect, useRef, useState } from "react";
import { DynamicForm } from "@oneui/6d-dynamic-form";
import { formFields } from "./constant";
import "@oneui/6d-dynamic-form/dist/index.css";

function ViewByIdform() {
  const formRef = useRef();

  const [populate, setpopulate] = useState({});

  const R_ID = localStorage.getItem("REC_ID");

  // console.log("RD come from Local", R_ID);

  useEffect(() => {
    fetch(`http://localhost:4000/api/access-control/fetch/${R_ID}`)
      .then((response) => response.json())
      .then((result) => {
        console.log("this Value return by api", result.data);
        setpopulate(result.data); // whatever value return by api here I'm set the state
      })
      .catch((error) => console.log("error", error));
  }, []);

  const populateValues = {
    ACCESS_CONTROL_TYPE: populate.ACCESS_CONTROL_TYPE,
    PARAM_NAME: populate.PARAM_NAME,
    PARAM_VALUE: populate.PARAM_VALUE,
    COMPARISION_TYPE: populate.COMPARISION_TYPE,
    PERMIT_TYPE: populate.PERMIT_TYPE,
    REC_ID: populate.REC_ID,
    STATUS: populate.STATUS,
  };

  // const popData = {
  //   // api return same format data like this...........
  //   ACCESS_CONTROL_TYPE: 1,
  //   PARAM_NAME: 2,
  //   PARAM_VALUE: 98,
  //   COMPARISION_TYPE: 2,
  //   PERMIT_TYPE: 1,
  //   STATUS: "A",
  // };

  return (
    <React.Fragment>
      {console.log("in side the return", populateValues)}
      <DynamicForm
        ref={formRef}
        fields={formFields}
        populateData={populateValues}
      />
      {/* <h2>Clicked REC ID:-{populate.REC_ID}</h2>
      <h5>ACCESS_CONTROL_TYPE:-{populate.ACCESS_CONTROL_TYPE}</h5>
      <h5>COMPARISION_TYPE:-{populate.COMPARISION_TYPE}</h5>
      <h5>PARAM_NAME:-{populate.PARAM_NAME}</h5>
      <h5>PARAM_VALUE:-{populate.PARAM_VALUE}</h5>
      <h5>PERMIT_TYPE:-{populate.PERMIT_TYPE}</h5>
      <h5>REC_ID:-{populate.REC_ID}</h5> */}
    </React.Fragment>
  );
}

export default ViewByIdform;
