const { getDataConnect, validateArgs } = require('firebase/data-connect');

const connectorConfig = {
  connector: 'default',
  service: 'AS2-tecnologias-desenvolvimento-web-ADS-PUCPR-main',
  location: 'us-central1'
};
exports.connectorConfig = connectorConfig;

