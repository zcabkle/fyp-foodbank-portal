import getToken from "../auth.js";
import makeRequest from "../makeRequest.js";

export default async function (context, req) { 
    var id = context.bindingData.id;

    var url = `https://org6e7090ee.api.crm4.dynamics.com/api/data/v9.2/cr967_items?$filter=_cr967_foodbankkey_value eq ${id} and cr967_shareitemwith eq 2&$select=cr967_name,cr967_image,cr967_description,cr967_itemid, cr967_quantity,cr967_stocklevel, cr967_shareitemwith,cr967_sharequantitywith, cr967_sharestocklevelwith,_cr967_foodbankkey_value,cr967_itemcategory`;

    var bearerToken = await getToken();

    var response = await makeRequest(bearerToken, url);
    var json_content = await response.json();

    var url = 'https://org6e7090ee.api.crm4.dynamics.com/api/data/v9.2/cr967_foodbanks?$select=cr967_name,cr967_foodbankid';

    var bearerToken = await getToken();

    var response = await makeRequest(bearerToken, url);
    var json_content2 = await response.json();

    const responseJSON = {
        "items": json_content,
        'foodbank_names':json_content2
    }

    context.res = {
        body : responseJSON
    }; 
}