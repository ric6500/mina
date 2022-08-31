const IPFS = require('ipfs-api');
const projectId = '2DiKQ4QV2GqWHSVL6HPg8wQ54s6';
const projectSecret = 'b628a86259c55c4ab9e1bcc2b65ef89c';
const auth = 'Basic ' + Buffer.from(projectId + ':' + projectSecret).toString('base64');

const ipfs = new IPFS({
  host: 'ipfs.infura.io',
  port: 5001,
  protocol: 'https',
  headers: {
    authorization: auth
  }
});

export default ipfs;
