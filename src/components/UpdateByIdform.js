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

  const [populate, setpopulate] = useState({
    ACCESS_CONTROL_TYPE: 1,
    PARAM_NAME: 1,
    PARAM_VALUE: "678",
    COMPARISION_TYPE: 1,
    PERMIT_TYPE: 2,
    REC_ID: 292,
    STATUS: "A",
  });

  const R_ID = localStorage.getItem("REC_ID");

  console.log("RD come from Local", R_ID);

  useEffect(() => {
    try {
      fetch("http://localhost:4000/api/access-control/fetch/285")
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          setpopulate(data.data);
          console.log("resData", data.data);
        })

        .catch((error) => console.log("error", error));
    } catch (error) {
      console.error(error);
      return [];
    }
  }, []);

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   let formData = formRef.current.submit();

  //   if (!formData === undefined) {
  //     console.log("formdata", formData);
  //     try {
  //       await fetch("http://localhost:4000/api/access-control/add", {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json; charset=UTF-8",
  //         },
  //         body: JSON.stringify(formData),
  //       })
  //         .then((res) => res.json())
  //         .then((res) => {
  //           console.log(res);
  //         });
  //       toaster({
  //         alertType: "success",
  //         message: "Access Control Created Successfully",
  //       });
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   } else {
  //     // alert("Please fill the form fields");
  //     toaster({
  //       alertType: "error",
  //       message: "Please fill the form mandatory fields",
  //     });
  //   }
  // };

  const handleReset = () => {
    formRef.current.reset();
  };

  //   const handleUpdate = () => {
  //     let formData = formRef.current.submit();
  //     formRef.current.changeFieldInput(formData);
  //     console.log("formdata", formData);

  //   };

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

  const popData = {
    ACCESS_CONTROL_TYPE: populate.ACCESS_CONTROL_TYPE,
    PARAM_NAME: populate.PARAM_NAME,
    PARAM_VALUE: populate.PARAM_VALUE,
    COMPARISION_TYPE: populate.COMPARISION_TYPE,
    PERMIT_TYPE: populate.PERMIT_TYPE,
    REC_ID: populate.REC_ID,
    STATUS: populate.STATUS,
  };

  return (
    <React.Fragment>
      <DynamicForm ref={formRef} fields={formFields} populateData={popData} />

      <>
        {/* <button
          //   onClick={handleCancel}
          // style={mystyle}
          type="button"
          className="btn btn-outline-primary"
          onClick={handleSubmit}
        >
          ADD
        </button> */}
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
