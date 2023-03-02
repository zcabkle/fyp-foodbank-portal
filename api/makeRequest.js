import fetch from "node-fetch";

async function makeRequest(accessToken, url) {
  var obj = {
      method: 'GET',
      headers: {
          'Authorization': 'Bearer ' + accessToken,
          'Accept': 'application/json',
          'Content-Type': 'application/json; charset-utf-8',
          'OData-MaxVersion': '4.0',
          'OData-Version': '4.0',
          'If-None-Match': null
      }
  };
  try {
      var response = await fetch(url, obj);
      return response

  } catch (err) {
      console.log(err);
  }
}

export default makeRequest;