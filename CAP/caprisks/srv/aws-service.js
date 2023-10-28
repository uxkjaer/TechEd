var parser = require('xml2json');

module.exports = cds.service.impl(async (srv) => {
    srv.on('READ', 'FileList', async (request) => {
        try {
            const response = await fetch("https://2jm9jcmsc5.execute-api.us-east-1.amazonaws.com/v1/appgyver-1/");
            if (!response.ok) {
                throw new Error(`HTTP Error: ${response.status} - ${response.statusText}`);
            }
            
            const result = await response.text();
            const data = parser.toJson(result);
            const filesJson = JSON.parse(data);
            
            if (filesJson && filesJson.ListBucketResult && filesJson.ListBucketResult.Contents) {
                return filesJson.ListBucketResult.Contents;
            } else {
                throw new Error('Invalid response data structure');
            }
        } catch (error) {
            console.error('Error:', error);
            throw error; // Re-throw the error for better error handling up the chain
        }
    });
});