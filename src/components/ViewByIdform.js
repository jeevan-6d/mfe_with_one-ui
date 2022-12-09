import React, { useEffect, useRef, useState } from "react";
import { DynamicForm } from "@oneui/6d-dynamic-form";
import { formFields } from "./constant";
import "@oneui/6d-dynamic-form/dist/index.css";

function ViewByIdform() {
  const formRef = useRef();

  const [populate, setpopulate] = useState({});

  const R_ID = localStorage.getItem("REC_ID");

  useEffect(() => {
    fetch(`http://localhost:4000/api/access-control/fetch/${R_ID}`)
      .then((response) => response.json())
      .then((result) => {
        console.log("this Value return by api", result.data);
        setpopulate(result.data); // whatever value return by api here I'm set the state
      })
      .catch((error) => console.log("error", error));
  }, []);

  console.log("popValue", populate);
  const populateValues = {
    ACCESS_CONTROL_TYPE: populate.ACCESS_CONTROL_TYPE,
    PARAM_NAME: populate.PARAM_NAME,
    PARAM_VALUE: populate.PARAM_VALUE,
    COMPARISION_TYPE: populate.COMPARISION_TYPE,
    PERMIT_TYPE: populate.PERMIT_TYPE,
    STATUS: populate.STATUS,
  };

  return (
    <React.Fragment>
      {populateValues.ACCESS_CONTROL_TYPE ? (
        <DynamicForm
          ref={formRef}
          fields={formFields}
          populateData={populateValues}
        />
      ) : null}
    </React.Fragment>
  );
}

export default ViewByIdform;
