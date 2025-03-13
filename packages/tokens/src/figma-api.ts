import {
  GetLocalVariablesResponse,
  PostVariablesRequestBody,
  PostVariablesResponse,
} from "@figma/rest-api-spec";

export default class FigmaApi {
  private baseUrl = "https://api.figma.com";
  private token: string;

  constructor(token: string) {
    this.token = token;
  }

  async getLocalVariables(fileKey: string): Promise<GetLocalVariablesResponse> {
    const response = await fetch(
      `${this.baseUrl}/v1/files/${fileKey}/variables/local`,
      {
        headers: {
          Accept: "*/*",
          "X-Figma-Token": this.token,
        },
      },
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return response.json() as Promise<GetLocalVariablesResponse>;
  }

  async postVariables(
    fileKey: string,
    payload: PostVariablesRequestBody,
  ): Promise<PostVariablesResponse> {
    const response = await fetch(
      `${this.baseUrl}/v1/files/${fileKey}/variables`,
      {
        method: "POST",
        headers: {
          Accept: "*/*",
          "X-Figma-Token": this.token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      },
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return response.json() as Promise<PostVariablesResponse>;
  }
}
