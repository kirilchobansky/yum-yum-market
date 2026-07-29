const fs = require('fs');
const targetPath = './src/environments/environment.prod.ts';
const envConfigFile = `export const environment = {
  production: true,
  apiBaseUrl: '${process.env.API_BASE_URL || 'https://yum-yum-market.onrender.com'}',
  paypalClientId: '${process.env.PAYPAL_CLIENT_ID || ''}',
  paypalCurrency: '${process.env.PAYPAL_CURRENCY || 'EUR'}'
};
`;
fs.writeFile(targetPath, envConfigFile, function (err) {
  if (err) { throw console.error(err); }
  console.log('Output generated at ' + targetPath);
});
