//import { Octokit } from "@octokit/rest";
import { request } from "@octokit/request";

export async function gitLogin(token) {
    /*const octokit = new Octokit({
        auth: token,
        userAgent: "octokit-test",
        baseUrl: "https://api.github.com",
      });
    */
    const requestWithAuth = request.defaults({
      headers: {
        authorization: token,
      },
    });
    const result = await requestWithAuth("GET /user");
    //const resp = await octokit.request("/user");
    //const json = resp.json();
    const userName = result.data.login; 
    return userName;
  }