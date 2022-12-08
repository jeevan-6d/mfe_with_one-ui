import React, { useRef } from "react";
import Alert from "@oneui/react-components/src/components/AlertModal";

const Dummy = () => {
  //   const Content = () => <div>!Modal content</div>;
  const modalRef = useRef();
  return (
    <div className="modal-wrapper">
      <h1>This is dummy comp</h1>
      <button
        onClick={() => {
          modalRef.current.show();
        }}
      ></button>
      <Alert
        ref={this.alertRef}
        content={<div>!Are you sure you want to delete?</div>}
        state={"hide"}
        title={"Alert"}
        type={"danger"}
        onConfirm={() => {
          console.log("on confirm");
        }}
        onCancel={() => {
          console.log("on cancel");
        }}
        primaryButtonLabel={"Confirm"}
        secondaryButtonLabel={"Cancel"}
        showoverlay={true}
        customClass={"modal-custom-class"}
      />
    </div>
  );
};

export default Dummy;
