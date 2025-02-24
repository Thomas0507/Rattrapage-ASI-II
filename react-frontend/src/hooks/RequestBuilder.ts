import { useEffect, useState } from "react";

export enum RequestType {
    GET = "GET",
    POST = "POST",
    PUT = "PUT",
    DELETE = "DELETE"
}

// export const useGetWithToken = <T>(url: string, bodyToParse: Object, requestType: RequestType) => {
//   const [response, setResponse] = useState<T>();

//   useEffect(() => {
//     (async () => {
//       try {
//         const res = await GetWithToken(url, bodyToParse, requestType);
//         const data = await res.json();
//         setResponse(data);
//       } catch (err) {
//         console.log(err);
//       }
//     })();
//   }, [url]);

//   return { response };
// };


// async function GetWithToken(url: string, bodyToParse: Object, requestType: RequestType): Promise<any> {
//     const token = window.localStorage.getItem("user")?.replace('\"', "");
//     if (!!token) {
//         const options = getOptionsByRequestType(requestType, token, bodyToParse)
//         return fetch(url, options);        
//     } else {
//         return null;
//     }
// }

export function getOptionsByRequestType(requestType: RequestType, body?: Object) {
    const token = window.localStorage.getItem("user")?.replace('\"', "");
    switch(requestType) {
        case RequestType.GET:
            return {
                method: requestType,
                headers: {
                  'Access-Control-Request-Method': requestType,
                  'Origin': 'http://localhost:5173',
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
                  'Authorization': 'Bearer ' + token, 
                }
            };
        case RequestType.DELETE:
            return {
                method: requestType,
                headers: {
                  'Access-Control-Request-Method': requestType,
                  'Origin': 'http://localhost:5173',
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
                  'Authorization': 'Bearer ' + token,
                }, body: JSON.stringify(body)
            };
        case RequestType.POST:
            return {
                method: requestType,
                headers: {
                  'Access-Control-Request-Method': requestType,
                  'Origin': 'http://localhost:5173',
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
                  'Authorization': 'Bearer ' + token,
                }, body: JSON.stringify(body)
            };
        case RequestType.PUT:
            return {
                method: requestType,
                headers: {
                  'Access-Control-Request-Method': requestType,
                  'Origin': 'http://localhost:5173',
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
                  'Authorization': 'Bearer ' + token,
                }, body: JSON.stringify(body)
            };
    }
}