import msal from "@azure/msal-node";

async function getToken() {
    const config = {
        auth: {
            clientId: "d0eb0372-6ca8-44ec-ae52-e8d61554ce1f",
            authority: "https://login.microsoftonline.com/f932d2dd-377d-4e9b-bc73-5f0efe92533f",
            clientSecret: 't-48Q~6aifCvAtn9mc4zrQiHpz9sUDBzm-gScbfM'
        }
    }

    const app = new msal.ConfidentialClientApplication(config);

    const tokenRequest = {
        scopes: ["https://org6e7090ee.api.crm4.dynamics.com/.default"],

    };

    var result = await app.acquireTokenByClientCredential(tokenRequest)
    var bearerToken = result['accessToken']
    
    return bearerToken;
}

export default getToken;