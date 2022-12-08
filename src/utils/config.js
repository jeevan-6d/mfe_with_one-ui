const CONFIG = {
  BASE_URL: window.config.BASE_URL,
  AUTH_URL: "/api/authUser",

  USER_TYPES: {
    TENANT: "Tenant",
    SUPER_ADMIN: "Super Admin",
  },
  screenToApiMapper: {
    // listAccessControls: "api/access-control/fetch",
    // example apis
    "user-creation": "api/user/",
    "get-service": "api/service/",
    "get-lang": "api/language/",
    "get-client": "/api/clientuseriduname/",
  },
};
console.log("inside config vvvv", CONFIG.BASE_URL);

export default CONFIG;
// module.exports = CONFIG;
