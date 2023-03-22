import msal from "@azure/msal-node";

async function getToken() {
    const config = {
        auth: {
            clientId: process.env.CLIENT_ID,
            authority: process.env.AUTHORITY,
            clientSecret: process.env.CLIENT_SECRET
        }
    }

    const app = new msal.ConfidentialClientApplication(config);

    const tokenRequest = {
        scopes: [process.env.SCOPE],

    };

    var result = await app.acquireTokenByClientCredential(tokenRequest)
    var bearerToken = result['accessToken']
    
    return bearerToken;
}

export default getToken;