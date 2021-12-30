const variables = {
  development: {
    googleApiKey: "AIzaSyAT1I3CiFbTE2pmV13QwFENe76qhJC_XJg",
  },
  production: {
    googleApiKey: "AIzaSyAT1I3CiFbTE2pmV13QwFENe76qhJC_XJg",
  },
};

const getEnvVariables = () => {
  if (__DEV__) {
    return variables.development; // return this if in development mode
  }
  return variables.production; // otherwise, return this
};

export default getEnvVariables; // export a reference to the function
