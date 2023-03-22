import getToken from "../auth.js";
import makeRequest from "../makeRequest.js";

export default async function (context, req) {
    var url = process.env.DATABASE_CONNECTION_STRING + `cr967_items/$count`

    var bearerToken = await getToken();

    var response = await makeRequest(bearerToken, url);
    var json_content = await response.json();

    var url = process.env.DATABASE_CONNECTION_STRING + `cr967_foodbanks/$count`

    var bearerToken = await getToken();

    var response = await makeRequest(bearerToken, url);
    var json_content2 = await response.json();

    var url = process.env.DATABASE_CONNECTION_STRING + `cr967_outgoingrecords/$count`

    var bearerToken = await getToken();

    var response = await makeRequest(bearerToken, url);
    var json_content3 = await response.json();

    const responseJSON = {
        "items_count": json_content,
        "foodbanks_count": json_content2, 
        "visits_count": json_content3
    }

    context.res = {
        body : responseJSON
    };

}