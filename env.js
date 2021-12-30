const variables = {
  development: {
    googleApiKey: "AIzaSyB3RSKohHD5RwdKdtJPvYX-Cgc_r13hntc",
  },
  production: {
    googleApiKey: "AIzaSyB3RSKohHD5RwdKdtJPvYX-Cgc_r13hntc",
  },
};

const getEnvVariables = () => {
  if (__DEV__) {
    return variables.development; // return this if in development mode
  }
  return variables.production; // otherwise, return this
};

export default getEnvVariables; // export a reference to the function
