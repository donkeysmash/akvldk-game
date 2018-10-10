
function getConfig(env) {
  const config = {
    development: {
      serverUri: 'http://localhost:3000/api',
      socketUri: 'http://localhost:3000'
    },
    production: {
      serverUri: '/api',
      socketUri: ''
    }
  };
  return config[env];
}




export default getConfig(process.env.NODE_ENV);