// // Imports the Secret Manager library
// const {SecretManagerServiceClient} = require('@google-cloud/secret-manager');

// const name = 'projects/652222580925/secrets/sugarfixed-service-acct/versions/1';
// // const name = 'projects/my-project/secrets/my-secret/versions/latest';

// // Instantiates a client
// const client = new SecretManagerServiceClient();

// async function getKey() {
//     const [version] = await client.accessSecretVersion({
//     name: name,
//     });

//     // Extract the payload as a string.
//     const payload = version.payload.data.toString();

//     // WARNING: Do not print the secret in a production environment - this
//     // snippet is showing how to access the secret material.
//     // console.info(`GCP Payload: ${payload}`);
//     return payload
// }

// exports.GOOGLE_APPLICATION_CREDENTIALS = getKey();