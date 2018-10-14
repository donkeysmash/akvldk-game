function getConfig(env) {
  const config = {
    development: {
      serverUri: '/api',
      socketUri: ''
    },
    production: {
      serverUri: '/api',
      socketUri: ''
    }
  };
  return config[env];
}

export default getConfig(process.env.NODE_ENV);
