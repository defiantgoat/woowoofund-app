import { isPOC, getEnvironment } from "../../helpers/environment";
import { ENVIRONMENT_TYPES } from "../../constants";
import { getEnvironmentConfig, SERVER_URL_NAMESPACE } from "../../config";

const TEST_URLS = {
  POC: `http://localhost:8080/${SERVER_URL_NAMESPACE}`
}

describe("Environment helper functions", ()=> {

  it("tests getEnvironment", () => {
    expect(getEnvironment(TEST_URLS.POC)).toEqual(getEnvironmentConfig(ENVIRONMENT_TYPES.POC));
    expect(getEnvironment("something-not-valid")).toEqual(getEnvironmentConfig(ENVIRONMENT_TYPES.POC));
  });

  it("tests isPOC url", () => {
    expect(isPOC(TEST_URLS.POC)).toBe(true);
  });

});
