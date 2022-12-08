import React, { useRef } from "react";
import { DynamicForm } from "@oneui/6d-dynamic-form";
import { formFields } from "./constant";
import "@oneui/6d-dynamic-form/dist/index.css";
import {
  SimpleToaster,
  toaster,
} from "@oneui/react-components/src/components/Toasters/SimpleToaster";

function AccessControlDynamicFrom() {
  // const mystyle = {
  //   color: "Red",
  //   backgroundColor: "white",
  //   padding: "10px",
  //   borderColor: "Red",
  //   // borderRradius: "34px",
  //   width: "25%",
  // };

  const formRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    var formData = formRef.current.submit();

    if (formData === undefined) {
      console.log("formdata", formData);
      // alert("Please fill the form fields");
      toaster({
        alertType: "error",
        message: "Please fill the form mandatory fields",
      });
    } else {
      try {
        await fetch("http://localhost:4000/api/access-control/add", {
          method: "POST",
          headers: {
            "Content-Type": "application/json; charset=UTF-8",
          },
          body: JSON.stringify(formData),
        })
          .then((res) => res.json())
          .then((res) => {
            console.log(res);
          });
        toaster({
          alertType: "success",
          message: "Access Control Created Successfully",
        });
      } catch (err) {
        console.log(err);
      }
    }
  };

  const handleReset = () => {
    formRef.current.reset();
  };
  const handleUpdate = () => {
    let formData = formRef.current.submit();
    formRef.current.changeFieldInput(formData);
    console.log("formdata jeevan", formData);
  };
  return (
    <React.Fragment>
      <DynamicForm
        ref={formRef}
        fields={formFields}
        // populateData={populateValues}
      />

      <>
        <button
          //   onClick={handleCancel}
          // style={mystyle}
          type="button"
          className="btn btn-outline-primary"
          onClick={handleUpdate}
        >
          ADD
        </button>
      </>
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
          onClick={handleSubmit}
        >
          Submit
        </button>
        <SimpleToaster type="hollow" closeButton={true} icon={true} />
      </>
    </React.Fragment>
  );
}

export default AccessControlDynamicFrom;
