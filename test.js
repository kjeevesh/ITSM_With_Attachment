const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');

const username = 'jira';
const password = 'Azureuser@123';
const issueKey = 'SAP-202';
const filePath = '/home/jeevesh/Desktop/test.xlsx';
const apiUrl = 'http://104.43.93.17:9000/rest/api/2/issue/' + issueKey + '/attachments';

const form = new FormData();
form.append('file', fs.createReadStream(filePath));

axios.post(apiUrl, form, {
  headers: {
    'X-Atlassian-Token': 'nocheck',
    'Content-Type': `multipart/form-data; boundary=${form._boundary}`,
  },
  auth: {
    username,
    password,
  },
})
  .then(response => {
    console.log('Attachment uploaded successfully:', response.data);
  })
  .catch(error => {
    console.error('Error uploading attachment:', error);
  });
