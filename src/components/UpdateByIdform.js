import React, { useEffect, useRef, useState } from "react";
import { DynamicForm } from "@oneui/6d-dynamic-form";
import { formFields } from "./constant";
import "@oneui/6d-dynamic-form/dist/index.css";
import {
  SimpleToaster,
  toaster,
} from "@oneui/react-components/src/components/Toasters/SimpleToaster";

function UpdateByIdform() {
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

  const handleReset = () => {
    formRef.current.reset();
  };

  const handleUpdate = async (e) => {
    var updateData = [];
    e.preventDefault();
    let formData = formRef.current.submit();
    formRef.current.changeFieldInput(formData);

    console.log("formdata", formData);

    updateData.push({
      ACCESS_CONTROL_TYPE: formData.ACCESS_CONTROL_TYPE,
      COMPARISION_TYPE: formData.COMPARISION_TYPE,
      PARAM_NAME: formData.PARAM_NAME,
      PARAM_VALUE: formData.PARAM_VALUE,
      PERMIT_TYPE: formData.PERMIT_TYPE,
      STATUS: formData.STATUS,
      REC_ID: localStorage.getItem("REC_ID"),
    });
    try {
      await fetch("http://localhost:4000/api/access-control/update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify(updateData[0]),
      })
        .then((res) => res.json())
        .then((res) => {
          console.log(res);
        });
      toaster({
        alertType: "success",
        message: "Access Control Updated Successfully",
      });
    } catch (err) {
      console.log(err);
    }
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

      <>
        <button
          type="button"
          className="btn btn-outline-primary"
          onClick={handleReset}
        >
          Reset
        </button>
      </>
      <>
        <button
          type="button"
          className="btn btn-outline-primary"
          onClick={handleUpdate}
        >
          Update
        </button>
        <SimpleToaster type="hollow" closeButton={true} icon={true} />
      </>
    </React.Fragment>
  );
}

export default UpdateByIdform;
