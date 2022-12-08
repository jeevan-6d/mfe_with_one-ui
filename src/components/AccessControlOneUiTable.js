import React, { useRef, useState } from "react";
import columns from "./columns";
import { AppTable } from "@oneui/6d-table";
import "@oneui/6d-base-theme/build/theme.css";
import CreateAccessControl from "./CreateAccessControl";
import {
  SimpleToaster,
  toaster,
} from "@oneui/react-components/src/components/Toasters/SimpleToaster";
import ViewById from "./ViewById";
import UpdateById from "./UpdateById";
import FileuploadDropzone from "./FileuploadDropzone";

export const AccessControlOneUiTable = () => {
  const [view, setView] = useState();
  console.log("thisView come ", view);
  const fetchList = async (pageSize, pageIndex, filterText) => {
    const resp = await getList();
    const startRow = pageSize * pageIndex;
    const endRow = startRow + pageSize;
    console.log("filter", filterText);
    return {
      data: resp.data.slice(startRow, endRow),
      totalRecords: resp.data.length,
    };
  };

  const getList = async () => {
    try {
      const response = await fetch(
        "http://localhost:4000/api/access-control/fetch/"
      )
        .then((response) => {
          console.log("actual res", response);
          return response.json();
        })

        .catch((error) => console.log("error", error));
      console.log("actual data", response);
      return response;
    } catch (error) {
      console.error(error);
      return [];
    }
  };

  const tableRef = useRef();

  const OnShowActionComponent = () => {
    return (
      <>
        <div>
          <button
            className="btn btn-app-secondary"
            style={{
              height: "30px",
              lineHeight: "30px",
              border: "solid 1px",
              marginLeft: "10px",
              padding: "0px 12px",
              marginRight: "0px",
              fontSize: "12px",
              marginBottom: "10px",
            }}
            type="button"
            onClick={() => {
              let data = tableRef.current.getSelectedRows();
              console.log("checkboxdata", data);

              var RECID = [];
              data.forEach((element) => {
                RECID.push({ REC_ID: element });
              });
              alert("!Are you sure you want to delete?");
              console.log(RECID);
              try {
                fetch("http://localhost:4000/api/access-control/delete", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json; charset=UTF-8",
                  },
                  body: JSON.stringify(RECID),
                })
                  .then((res) => res.json())
                  .then((res) => {
                    console.log(res);
                  });
                toaster({
                  alertType: "success",
                  message: "Data Deleted Successfully",
                });
              } catch (err) {
                console.log(err);
              }
              window.location.reload();
            }}
          >
            Delete All
          </button>
        </div>
      </>
    );
  };

  // this function take the  Excel file for Export button
  const handleSubmit = async (e) => {
    <FileuploadDropzone />;
    e.preventDefault();
    // let formData = formRef.current.submit();

    // console.log("formdata", formData);
    try {
      await fetch("http://localhost:4000/api/access-control/bulk-upload", {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
        // body: JSON.stringify(formData),
      })
        .then((res) => res.json())
        .then((res) => {
          console.log(res);
        });
    } catch (err) {
      console.log(err);
    }
  };

  const ExportComponent = () => {
    return (
      <div class="dropdown">
        <button class="btn-micro btn-app-secondary" onClick={handleSubmit}>
          Export
          <svg
            id="Sorting"
            xmlns="http://www.w3.org/2000/svg"
            width="15"
            height="5"
            viewBox="0 0 6 4"
          >
            <path
              id="Path_1041"
              data-name="Path 1041"
              d="M11,3H5L8,7Z"
              transform="translate(-5 -3)"
              fill="#6B6B6B"
            ></path>
          </svg>
        </button>
        <div class="dropdown-content">
          <a href="/">CSV</a>
          <a href="/">Excel</a>
          <a href="/">PDF</a>
        </div>
      </div>
    );
  };

  function timePrint() {
    let t1 = new Date().toISOString().slice(0, 10);
    let t2 = new Date().toTimeString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, "$1");
    var tt = `${t1} ${t2}`;
    return tt;
  }

  return (
    <AppTable
      ref={tableRef}
      title="All Access Controls &#124; 100 "
      columns={columns}
      getDataFrom={fetchList}
      isExportActionEnabled={true}
      exportComponent={<ExportComponent />}
      onRowSelectedActionComponent={<OnShowActionComponent />}
      enableRowSelection={true}
      selectionKey={`REC_ID`}
      limit={5}
      isSearchFilterEnabled={true}
      onExport={() => {
        alert("Export button clicked");
      }}
      // hide={0}
      actionheader={["Info", "Edit", "Delete"]}
      addItem={
        <button
          className="btn-micro btn-app-secondary"
          style={{ marginLeft: "10px", marginRight: "0px" }}
          type="button"
        >
          <CreateAccessControl />
        </button>
      }
      //imageSrcFiles={{ sortImageDsc: "/sort_descending.svg", sortImageAsc: "/sort_ascending.svg", sortImageDef: "/sort_default.svg" }}

      // enableRowDragnDrop={true} // Adding some thing in left side of table

      isPaginationEnabled={true}
      isShowMoreEnabled={false}
      isPrecedenceEnabled={false}
      // enableRowSelection={true}
      actionButtons={[
        {
          class: "",
          label: (
            // <svg
            //   xmlns="http://www.w3.org/2000/svg"
            //   width="16"
            //   height="16"
            //   fill="currentColor"
            //   className="bi bi-eye"
            //   viewBox="0 0 16 16"
            // >
            //   <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z" />
            //   <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" />
            // </svg>
            <ViewById />
          ),
          onClick: (data) => {
            //will recive row data
            // console.log("eye", data);
            localStorage.setItem("REC_ID", data.R_ID);

            // setView(data);
          },
        },
        {
          class: "",
          label: (
            // <svg
            //   xmlns="http://www.w3.org/2000/svg"
            //   width="16"
            //   height="16"
            //   fill="currentColor"
            //   className="bi bi-pencil"
            //   viewBox="0 0 16 16"
            // >
            //   <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z" />
            // </svg>
            <UpdateById />
          ),
          onClick: (data) => {
            //will recive row data
            console.log("pen", data);
            localStorage.setItem("REC_ID", data.R_ID);

            // setView(data);
          },
        },
        {
          class: "",
          label: (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-trash"
              viewBox="0 0 16 16"
            >
              <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
              <path
                fill-rule="evenodd"
                d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
              />
            </svg>
          ),
          onClick: (data) => {
            let REC_ID = data.R_ID;
            var RECID = [];
            RECID.push({ REC_ID });
            alert("!Are you sure you want to delete?");
            console.log("for delete", RECID[0]);
            try {
              fetch("http://localhost:4000/api/access-control/delete", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json; charset=UTF-8",
                },
                body: JSON.stringify([RECID[0]]),
              })
                .then((res) => res.json())
                .then((res) => {
                  console.log(res);
                });
              toaster({
                alertType: "success",
                message: "Access Control Deleted Successfully",
              });
            } catch (err) {
              console.log(err);
            }
            window.location.reload();
          },
        },
      ]}
      commonItem={
        <div>
          <div className="rf">
            <button
              className="rfb"
              type="button"
              onClick={() => {
                toaster({
                  alertType: "success",
                  message: "Reloaded Successfully",
                });
                window.location.reload();
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-arrow-clockwise"
                viewBox="0 0 16 16"
              >
                <path
                  fill-rule="evenodd"
                  d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z"
                />
                <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z" />
              </svg>
              <SimpleToaster type="hollow" closeButton={true} icon={true} />
            </button>
            <button className="rft" type="button">
              {timePrint()}
            </button>
          </div>
          <div className="rfp">
            <button className="rfb" type="button">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-funnel"
                viewBox="0 0 16 16"
              >
                <path d="M1.5 1.5A.5.5 0 0 1 2 1h12a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.128.334L10 8.692V13.5a.5.5 0 0 1-.342.474l-3 1A.5.5 0 0 1 6 14.5V8.692L1.628 3.834A.5.5 0 0 1 1.5 3.5v-2zm1 .5v1.308l4.372 4.858A.5.5 0 0 1 7 8.5v5.306l2-.666V8.5a.5.5 0 0 1 .128-.334L13.5 3.308V2h-11z" />
              </svg>
            </button>
            <button
              className="rfb"
              type="button"
              onClick={() => {
                window.print();
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-printer"
                viewBox="0 0 16 16"
              >
                <path d="M2.5 8a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1z" />
                <path d="M5 1a2 2 0 0 0-2 2v2H2a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h1v1a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2v-1h1a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-1V3a2 2 0 0 0-2-2H5zM4 3a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2H4V3zm1 5a2 2 0 0 0-2 2v1H2a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1v-1a2 2 0 0 0-2-2H5zm7 2v3a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1z" />
              </svg>
            </button>
          </div>
        </div>
      }
    />
  );
};
