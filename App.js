// //srinivas
// var express = require('express');
// const libraries = require("./ITSM_lib.js");
// const swaggerDoc = require("swagger-ui-express");
// const swaggerDocumentation = require ("./documentation")
// const axios = require('axios');
// var app = express();
// var bodyParser = require('body-parser');
// var jsonParser = bodyParser.json();
// const fs = require('fs');
// const FormData = require('form-data');


// const PORT = 7777;


// app.use("/documentations", swaggerDoc.serve);
// app.use("/documentations", swaggerDoc.setup(swaggerDocumentation));

// // configure the welcome page
// app.get('/', function(req, res){
    
//     res.send('JIRA SERVER HOMEPAGE');
// });

// // app.post('/Ticket/API/Create_Ticket', jsonParser, function(req, res) {
// //   var sapInputdata = req.body;
// //   console.log(sapInputdata);
// //   const credentials = require("./creds.json");
// //   const auth = require("./jiraAuth.json");
// //   const jiraUrl = credentials.jira_url;
// //   const issueEndpoint = credentials.jira_issueEndpoint;
// //   var jiraMainurl = jiraUrl + issueEndpoint;
// //   var arrayLength = sapInputdata.length;
// //   console.log(`Array received length is ${arrayLength}`);
// //   var errors = []; // create an array to hold any errors
// //   for(var i = 0; i < arrayLength; i++){
// //     var currentSap = sapInputdata[i];
// //     var sap_severity = libraries.severityMapper(currentSap.SEVERITY);
// //     console.log(`Updated Jira Severity is : ${sap_severity}`);
// //     const jira_ticket = libraries.jiraTicket(currentSap, sap_severity);
// //     console.log(jira_ticket);
     
// //     // call the jira_postRequest function and handle errors
// //     jira_postRequest(jira_ticket, jiraMainurl, auth)
// //       .then(status => {
// //         if (status === 200 || status ===201) {
// //           console.log(`Jira ticket created successfully`);
// //         } else {
// //           errors.push(status); // add the error status code to the errors array
// //         }
// //         if (i === arrayLength-1) {
// //           if (errors.length > 0) {
// //             res.status(errors[0]).send(errors); // return the first error status code to the client
// //           } else {
// //             res.status(200).send('200');
// //           }
// //         }
// //       })
// //     // create the elastic schema entry
// //     const elastic_ticket = libraries.elasticTicket(currentSap);
// //     //console.log(elastic_ticket);
    
// //     // post the schema to Elastic & Kibana
// //     libraries.elastic_postrequest(elastic_ticket);
    
// //   }
// // });

// app.post('/Ticket/API/Create_Ticket', jsonParser, function(req, res) {
//   var sapInputdata = req.body;
//   console.log(sapInputdata);
//   const credentials = require("./creds.json");
//   const auth = require("./jiraAuth.json");
//   const jiraUrl = credentials.jira_url;
//   const issueEndpoint = credentials.jira_issueEndpoint;
//   var jiraMainurl = jiraUrl + issueEndpoint;
//   var arrayLength = sapInputdata.length;
//   console.log(`Array received length is ${arrayLength}`);
//   var errors = []; // create an array to hold any errors
//   for(var i = 0; i < arrayLength; i++){
//     var currentSap = sapInputdata[i];
//     var sap_severity = libraries.severityMapper(currentSap.SEVERITY);
//     console.log(`Updated Jira Severity is : ${sap_severity}`);
//     const jira_ticket = libraries.jiraTicket(currentSap, sap_severity);
//     console.log(jira_ticket);

//     // call the jira_postRequest function and handle errors
//     jira_postRequest(jira_ticket, jiraMainurl, auth)
//       .then(response => {
//         const { status, issueKey } = response;
//         if (status === 200 || status === 201) {
//           console.log(`Jira ticket created successfully`);
//           if (currentSap.attachments) {
//             const attachmentUrl = jiraUrl + `/rest/api/2/issue/${issueKey}/attachments`;
//             for (const attachment of currentSap.attachments) {
//               sendAttachment(attachmentUrl, attachment, auth);
//             }
//           }
//         } else {
//           errors.push(status); // add the error status code to the errors array
//         }
//         if (i === arrayLength-1) {
//           if (errors.length > 0) {
//             res.status(errors[0]).send(errors); // return the first error status code to the client
//           } else {
//             res.status(200).send('200');
//           }
//         }
//       });

//     // create the elastic schema entry
//     const elastic_ticket = libraries.elasticTicket(currentSap);
//     //console.log(elastic_ticket);

//     // post the schema to Elastic & Kibana
//     libraries.elastic_postrequest(elastic_ticket);
//   }
// });

// function sendAttachment(attachmentUrl, attachment, auth) {
//   const formData = new FormData();
//   formData.append('file', fs.createReadStream(attachment.path));

//   axios.post(attachmentUrl, formData, { auth: auth, headers: formData.getHeaders() })
//     .then(response => {
//       console.log(`Attachment ${attachment.path} uploaded successfully.`);
//     })
//     .catch(error => {
//       console.log(`Error uploading attachment ${attachment.path}: ${error.response.status}`);
//     });
// }



// // function definition of jira_postRequest
// // function jira_postRequest(jira_ticket, jira_url, auth) {
// //   return axios.post(jira_url, jira_ticket, { auth: auth })
// //     .then(response => {
// //       console.log('Response:', response.data);
// //       return response.status;
// //     })
// //     .catch(error => {
// //       console.log(`Error in posting Jira request: ${error.response.status}`);
// //       return error.response.status;
// //     });
// //}

// function jira_postRequest(jira_ticket, jira_url, auth) {
//   return axios.post(jira_url, jira_ticket, { auth: auth })
//     .then(response => {
//       console.log('Response:', response.data);
//       const issueKey = response.data.key; // Get the generated issue key
//       //console.log("issue key: ", issuekey)
//       return { status: response.status, issueKey: issueKey };
//     })
//     .catch(error => {
//       console.log(`Error in posting Jira request: ${error.response.status}`);
//       return { status: error.response.status, issueKey: null };
//     });
// }
  
// var server = app.listen(PORT, function () {
//     var host = server.address().address
//     var port = server.address().port
//     console.log("Example app listening at http://%s:%s", host, port)
//  })

var express = require('express');
const libraries = require("./ITSM_lib.js");
const swaggerDoc = require("swagger-ui-express");
const swaggerDocumentation = require("./documentation");
const axios = require('axios');
const fs = require('fs');
const FormData = require('form-data');

var app = express();
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();

const PORT = 7777;

app.use("/documentations", swaggerDoc.serve);
app.use("/documentations", swaggerDoc.setup(swaggerDocumentation));

// configure the welcome page
app.get('/', function(req, res) {
  res.send('JIRA SERVER HOMEPAGE');
});

// Function to send attachment to Jira
// function sendAttachment(attachmentUrl, attachment, auth) {
//   const formData = new FormData();
//   formData.append('file', fs.createReadStream(attachment.path));

//   axios
//     .post(attachmentUrl, formData, { auth: auth, headers: formData.getHeaders() })
//     .then(response => {
//       console.log(`Attachment ${attachment.path} uploaded successfully.`);
//     })
//     .catch(error => {
//       console.log(`Error uploading attachment ${attachment.path}`);
//     });
// }

// function sendAttachment(attachmentUrl, attachment, auth) {
//   const formData = new FormData();
//   formData.append('file', fs.readFileSync(attachment.path), attachment.filename);

//   axios
//     .post(attachmentUrl, formData, {
//       auth: auth,
//       headers: formData.getHeaders(),
//     })
//     .then(response => {
//       console.log(`Attachment ${attachment.filename} uploaded successfully.`);
//     })
//     .catch(error => {
//       console.log(`Error uploading attachment ${attachment.filename}: ${error.response.status}`);
//     });
// }

// Update the sendAttachment function
// function sendAttachment(attachmentUrl, attachment, auth) {
//   const formData = new FormData();
//   const fileStream = fs.createReadStream(attachment.path);
//   formData.append('file', fileStream);

//   axios
//     .post(attachmentUrl, formData, {
//       auth: auth,
//       headers: {
//         ...formData.getHeaders(),
//         'Content-Length': fs.statSync(attachment.path).size,
//       },
//     })
//     .then(response => {
//       console.log(`Attachment ${attachment.path} uploaded successfully.`);
//     })
//     .catch(error => {
//       console.log(`Error uploading attachment ${attachment.path}: ${error.response.status}`);
//     });
// }

// const FormData = require('form-data');
// const fs = require('fs');

// const mime = require('mime-types');

// function sendAttachment(attachmentUrl, attachment, auth) {
//   const fileContent = fs.readFileSync(attachment.path);
//   const fileName = attachment.path.split('/').pop();
//   const contentType = mime.lookup(fileName);

//   axios.post(attachmentUrl, fileContent, {
//     auth: auth,
//     headers: {
//       'Content-Type': contentType,
//       'X-Atlassian-Token': 'no-check',
//       'Content-Disposition': `attachment; filename="${fileName}"`
//     }
//   })
//     .then(response => {
//       console.log(`Attachment ${attachment.path} uploaded successfully.`);
//     })
//     .catch(error => {
//       console.log(`Error uploading attachment ${attachment.path}: ${error}`);
//     });
// }

//const upload = multer({ dest: 'uploads/' });

app.post('/Ticket/API/Create_Ticket', jsonParser,function(req, res) {
  attachments=req.files;
  console.log(attachments)
  var sapInputdata = req.body;
  console.log(sapInputdata);
  const credentials = require("./creds.json");
  const auth = require("./jiraAuth.json");
  const jiraUrl = credentials.jira_url;
  const issueEndpoint = credentials.jira_issueEndpoint;
  var jiraMainurl = jiraUrl + issueEndpoint;
  var arrayLength = sapInputdata.length;
  console.log(`Array received length is ${arrayLength}`);
  var errors = []; // create an array to hold any errors
  for (var i = 0; i < arrayLength; i++) {
    var currentSap = sapInputdata[i];
    var sap_severity = libraries.severityMapper(currentSap.SEVERITY);
    console.log(`Updated Jira Severity is : ${sap_severity}`);
    //console.log(currentSap.attachments[0])
    const jira_ticket = libraries.jiraTicket(currentSap, sap_severity);
    console.log(jira_ticket);

    // call the jira_postRequest function and handle errors
    jira_postRequest(jira_ticket, jiraMainurl, auth)
      .then(response => {
        const { status, issueKey } = response;
      //  
      //  if (status === 200 || status === 201) {
      //     console.log(`Jira ticket created successfully`);
      //     if (currentSap.attachments) {
      //       const attachmentUrl = jiraUrl + `/rest/api/2/issue/${issueKey}/attachments`;
      //       for (const attachment of currentSap.attachments) {
      //         sendAttachment(attachmentUrl, attachment, auth);
      //       }
      //     }
      //   } else {
      //     errors.push(status); // add the error status code to the errors array
      //   }
      //   if (i === arrayLength-1) {
      //     if (errors.length > 0) {
      //       res.status(errors[0]).send(errors); // return the first error status code to the client
      //     } else {
      //       res.status(200).send('200');
      //     }
      //   }
      // });
      if (status === 200 || status === 201) {
        console.log(`Jira ticket created successfully`);
        if (currentSap.attachments) {
          //console.log(`${issueKey}`)
          //const attachmentUrl = jiraUrl + `/rest/api/2/issue/SAP-50/attachments`;
          //console.log(`${attachmentUrl}`)
          for (const attachment of currentSap.attachments) {
            const FormData = require('form-data');
            const fs = require('fs');
            const filePath = '/home/jeevesh/Desktop/test.xlsx';
            const apiUrl = 'http://104.43.93.17:9000/rest/api/2/issue/' + issueKey + '/attachments';

            const form = new FormData();
            form.append('file', fs.createReadStream(filePath));

            axios.post(apiUrl, form, {
              auth:auth,
              headers: {
                'X-Atlassian-Token': 'nocheck',
                'Content-Type': `multipart/form-data; boundary=${form._boundary}`,
              },
            })
              .then(response => {
                console.log('Attachment uploaded successfully:', response.data);
              })
              .catch(error => {
                console.error('Error uploading attachment:', error);
              });
          }
        }
      } else {
        errors.push(status); // add the error status code to the errors array
      }
      if (i === arrayLength-1) {
        if (errors.length > 0) {
          res.status(errors[0]).send(errors); // return the first error status code to the client
        } else {
          res.status(200).send('200');
        }
      }
    });
    }
    // create the elastic schema entry
    const elastic_ticket = libraries.elasticTicket(currentSap);
    //console.log(elastic_ticket);

    // post the schema to Elastic & Kibana
    libraries.elastic_postrequest(elastic_ticket);
    });

function jira_postRequest(jira_ticket, jira_url, auth) {
  return axios
    .post(jira_url, jira_ticket, { auth: auth })
    .then(response => {
      const { status, data } = response;
      const { id, key, self } = data;
      console.log(`Response: ${JSON.stringify(data)}`);
      return { status, issueKey: key };
    })
    .catch(error => {
      console.log(`Jira ticket creation failed: ${error}`);
      return { status: error.response.status, issueKey: null };
    });
}


app.listen(PORT, function() {
  console.log(`Example app listening at http://localhost:${PORT}`);
});
