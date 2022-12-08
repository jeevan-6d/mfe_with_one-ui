// import "@oneui/6d-base-theme/lib/theme.css";
// import "@oneui/6d-base-theme";

export const formFields = {
  elements: [
    {
      type: "group",
      title: "Access Control Details",
      showLine: true,
      className: "dymfontstyle",
    },

    {
      name: "ACCESS_CONTROL_TYPE",
      label: "Control Type",
      type: "select",
      props: {
        required: true,
      },
      options: [
        {
          label: "Blacklist",
          value: "1",
        },
        {
          label: "Whitelist",
          value: "2",
        },
      ],
      placeholder: "Select",
      dependentOn: "newselectapi",
    },
    {
      name: "PARAM_NAME",
      label: "Param Name",
      type: "select",
      props: {
        required: true,
      },
      options: [
        {
          label: "MSISDN",
          value: "1",
        },
        {
          label: "IMSI",
          value: "2",
        },
        {
          label: "MSC",
          value: "3",
        },

        {
          label: "International network",
          value: "4",
        },
      ],
      placeholder: "Select",
      dependentOn: "newselectapi",
    },
    {
      name: "PERMIT_TYPE",
      label: "Permit Type",
      type: "select",
      props: {
        required: true,
      },
      options: [
        {
          label: "Origination",
          value: "1",
        },
        {
          label: "Destination",
          value: "2",
        },
        {
          label: "Both",
          value: "3",
        },
      ],
      placeholder: "Select",
      dependentOn: "newselectapi",
    },
    {
      name: "COMPARISION_TYPE",
      label: "Comparison Type",
      type: "select",
      props: {
        required: true,
      },
      options: [
        {
          label: "Exact",
          value: "1",
        },
        {
          label: "Series",
          value: "2",
        },
        {
          label: "Regex",
          value: "3",
        },
      ],
      placeholder: "Select",
      dependentOn: "newselectapi",
    },

    {
      name: "STATUS",
      label: "Status",
      type: "select",
      props: {
        required: true,
      },
      options: [
        {
          label: "Active",
          value: "A",
        },
        {
          label: "Deactive",
          value: "D",
        },
      ],
      placeholder: "Select",
      dependentOn: "newselectapi",
    },
    {
      type: "group",
      title: "Parameter Values",
      showLine: true,
      className: "dymfontstyle",
    },
    {
      name: "PARAM_VALUE",
      label: "Param Value",
      type: "number",
      autocomplete: "off",
      props: {
        required: true,
      },
      placeholder: "Enter Param Values",
      dependentOn: "newselectapi",
    },

    // if we want add more than one parameter then we need to some logic here
  ],
};

export default formFields;
