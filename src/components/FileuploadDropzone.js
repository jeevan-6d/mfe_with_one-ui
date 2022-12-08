import React, { useState } from "react";
import DropZone from "@oneui/react-components/src/components/DropZone";

const uploadUrl = "http://localhost:4000/api/access-control/bulk-upload";
const acceptedFileTypes = (
  <span>
    <b>CSV</b> and <b>Excel</b>
  </span>
);
const maxSize = "1 MB";

function FileuploadDropzone() {
  const [uploadedStatus, setUploadedStatus] = useState("upload");
  const [percentage, setpercentage] = useState("0");
  const [uploadFileName, setUploadFileName] = useState("");
  const [uploadFileSize, setUploadFileSize] = useState("");

  const [xhrObject, setXhrObject] = useState(null);

  //onDropFile callback function
  const handleOnDropFile = (file) => {
    console.log("file on drop- ", file);
    onUploadFile(file[0], uploadUrl);
  };

  const onUploadFile = (file, uploadUrl) => {
    let data = new FormData();
    data.append("file", file);
    let request = new XMLHttpRequest();
    setXhrObject(request);

    request.open("POST", uploadUrl);

    request.onreadystatechange = function (oEvent) {
      if (request.readyState === 4) {
        if (request.status === 200) {
          console.log(request.responseText);
        } else {
          setUploadedStatus("upload");
        }
      }
    };

    // upload progress event
    request.upload.addEventListener("progress", function (e) {
      let percent_completed = (e.loaded / e.total) * 100;
      console.log(percent_completed);
      setpercentage(percent_completed);
      setUploadFileName(file.path);
      setUploadFileSize(file.size);
      setUploadedStatus("progress");
    });

    request.addEventListener("load", function (e) {
      // HTTP status message (200, 404 etc)
      console.log(request.status);
      if (request.status === 200) {
        setUploadedStatus("success");
      } else {
        setUploadedStatus("upload");
        setUploadedStatus("upload");
        console.log("Error", request);
      }
      // request.response holds response from the server
      console.log(request.response);
    });

    request.send(data);
  };

  return (
    <div>
      <DropZone
        maxSize={maxSize}
        acceptedFileTypes={acceptedFileTypes}
        onDropFile={(file) => {
          handleOnDropFile(file);
        }}
        uploadedStatus={uploadedStatus}
        uploadedPercentage={percentage}
        uploadFileName={uploadFileName}
        uploadFileSize={uploadFileSize}
        onUploadCancel={() => {
          console.log("upload cancelled, aborting upload");
        }}
      />
    </div>
  );
}

export default FileuploadDropzone;
