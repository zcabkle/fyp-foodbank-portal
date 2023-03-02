import getToken from "../auth.js";
import makeRequest from "../makeRequest.js";

export default async function (context, req) { 
    var url = 'https://org6e7090ee.api.crm4.dynamics.com/api/data/v9.2/cr967_foodbanks?$select=cr967_name,cr967_address,cr967_image,cr967_foodbankid,cr967_email,cr967_operatinghours,cr967_postcode,cr967_town,cr967_phonenumber';

    var bearerToken = await getToken();

    var response = await makeRequest(bearerToken, url);
    var json_content = await response.json();

    const responseJSON = {
        "foodbanks": json_content,
    }

    context.res = {
        body : responseJSON
    };
}