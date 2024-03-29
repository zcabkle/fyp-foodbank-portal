import getToken from "../auth.js";
import makeRequest from "../makeRequest.js";

export default async function (context, req) { 
    var url = process.env.DATABASE_CONNECTION_STRING + 'cr967_items?$filter=cr967_shareitemwith eq 2&$select=cr967_name,cr967_image,cr967_description,cr967_itemid, cr967_quantity,cr967_stocklevel, cr967_shareitemwith,cr967_sharequantitywith, cr967_sharestocklevelwith,_cr967_foodbankkey_value,cr967_itemcategory';

    var bearerToken = await getToken();

    var response = await makeRequest(bearerToken, url);
    var json_content1 = await response.json();

    var url = process.env.DATABASE_CONNECTION_STRING + 'cr967_foodbanks?$select=cr967_name,cr967_foodbankid';

    var bearerToken = await getToken();

    var response = await makeRequest(bearerToken, url);
    var json_content2 = await response.json();

    const responseJSON = {
        "items": json_content1,
        'foodbank_names':json_content2
    }

    context.res = {
        body : responseJSON
    }; 
}