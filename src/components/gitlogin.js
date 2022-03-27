import { request } from "@octokit/request";

export async function gitLogin(token) {

    const requestWithAuth = request.defaults({
      headers: {
        authorization: token,
      },
    });
    const result = await requestWithAuth("GET /user");
    
    const userName = result.data.login; 
    return userName;
  }