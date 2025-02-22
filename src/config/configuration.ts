export default () => {
  const config = {
    port: parseInt(process.env.PORT, 10) || 3000,
    database: {
      DATABASE_URL: process.env.DATABASE_URL,
      // host: process.env.DATABASE_HOST,
      // port: parseInt(process.env.DATABASE_PORT, 10) || 5432,
    },
    nodesMap: {
      'pimlico-linea-goerli': {
        key: 'pimlico-linea-goerli',
        chain: 'linea-goerli',
        rpcUrl: process.env.PIMLICO_LINEA_GOERLI_RPC,
        pmUrl: `${process.env.PIMLICO_LINEA_GOERLI_API}/${process.env.PIMLICO_LINEA_GOERLI_CHAIN_NAME}/rpc?apikey=${process.env.PIMLICO_LINEA_GOERLI_API_KEY}`,
      },
    },
    nodes_active: ['pimlico-linea-goerli'], // to load dynamically
  };

  return config;
};
