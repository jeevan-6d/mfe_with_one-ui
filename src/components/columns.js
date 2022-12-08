const columns = [
  {
    Header: "RID",
    accessor: "REC_ID",
    sortType: "basic",
    id: "R_ID", // to be used in column hide popover
    isSortable: true, // This prop is used for enabling sorting option to the column, if its not defined then there wont be any sort options for the column.
  },
  {
    Header: "Permit Name",
    accessor: "PERMIT_NAME",
    sortType: "basic",
    isSortable: true,
    id: "Permit Name",
  },

  {
    Header: "Param Name",
    accessor: "PARAM_NAME",
    sortType: "basic",
    isSortable: true,
    id: "Param Name",
  },
  {
    Header: "Access Control Name",
    accessor: "ACCESS_CONTROL_NAME",
    sortType: "basic",
    isSortable: true,
    id: "Access Control Name",
  },
  {
    Header: "Comparison Name",
    accessor: "COMPARISION_NAME",
    sortType: "basic",
    isSortable: true,
    id: "Comparison Name",
  },
  {
    Header: "Param Value",
    accessor: "PARAM_VALUE",
    sortType: "basic",
    isSortable: true,
    id: "Param Value",
  },
  {
    Header: "Status",
    accessor: "STATUS",
    sortType: "basic",
    isSortable: true,
    id: "Status",
  },
];
export default columns;
