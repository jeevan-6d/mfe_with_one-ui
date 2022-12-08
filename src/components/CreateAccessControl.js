import React, { useRef } from "react";
import CustomModal from "@oneui/react-components/src/components/CustomModal";
import AccessControlDynamicFrom from "./AccessControlDynamicFrom";

const CreateAccessControl = () => {
  const ModalBodyContent = () => (
    <div>
      <AccessControlDynamicFrom />
    </div>
  );
  const ModalFooter = () => {
    return (
      <>
        <button
          type="button"
          className="btn btn-app-secondary"
          data-dismiss="modal"
          onClick={() => modalRef.current.hide()}
        >
          CANCEL
        </button>
        {/* <button
          type="button"
          className="btn btn-app-secondary"
          onClick={() => {
            console.log("you clicked me..");
          }}
        >
          RESET
        </button>
        <button
          type="button"
          className="btn btn-app-secondary"
          onClick={() => {
            console.log("you clicked me..");
          }}
        >
          SAVE
        </button> */}
      </>
    );
  };
  const modalRef = useRef();
  return (
    <>
      <button
        type="button"
        className="crtbtn"
        onClick={() => modalRef.current.show()}
      >
        CREATE
      </button>
      <CustomModal
        ref={modalRef}
        transition="right" // left,right , empty("") for default transition
        modalSize={"modal-lg"}
        isOverlay={false}
        modalTitle={"Create Access Control"}
        modalBody={<ModalBodyContent />}
        modalFooter={<ModalFooter />}
        onConfirm={() => {}}
        onCancel={() => {
          modalRef.current.hide();
        }}
      />
    </>
  );
};

export default CreateAccessControl;
