import { captureInitialRequestPath, getQueryParams } from "../../helpers/url-paths";

describe("URL Path helper functions", ()=> {

  it("tests captureInitialRequestPath", ()=> {
    expect(captureInitialRequestPath("http://localhost:8080/app/")).toEqual("manage");   
    expect(captureInitialRequestPath("http://localhost:8080/app/dashboard")).toEqual("dashboard");
    expect(captureInitialRequestPath("http://localhost:8080/app/dashboard?campaign=1")).toEqual("dashboard?campaign=1");
  });

  it("tests getQueryParams", ()=> {
    expect(getQueryParams("http://localhost:8080/app/dashboard")).toEqual({});
    expect(getQueryParams("http://localhost:8080/app/dashboard?campaign=100")).toEqual({
      "campaign": "100"
    });
  });

});
