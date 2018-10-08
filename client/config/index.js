
function getConfig(env) {
  const config = {
    development: {
      serverUri: 'http://localhost:3000'
    }
  };





  return config[env];
}




export default getConfig(process.env.NODE_ENV);