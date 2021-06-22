import { getToolIdFromPath, APPLICATION_VIEWS } from "../../config";

jest.mock(
  '@material-ui/icons/Dashboard', 
  () => {
    return 'DashboardIcon';
  }
);

jest.mock(
  '@material-ui/icons/BusinessCenterOutlined', 
  () => {
    return 'BusinessCenterOutlinedIcon';
  }
);

jest.mock(
  '@material-ui/icons/AddCircleOutline', 
  () => {
    return 'AddCircleOutlineIcon';
  }
);

describe("config methods", ()=> {
  it("tests getToolIdFromPath", () => {
    expect(getToolIdFromPath("view")).toEqual(APPLICATION_VIEWS.CampaignView.toolId);
    expect(getToolIdFromPath("create")).toEqual(APPLICATION_VIEWS.CreateNewCampaignView.toolId);
    expect(getToolIdFromPath("manage")).toEqual(APPLICATION_VIEWS.ManageCampaignsView.toolId);
    expect(getToolIdFromPath("view?campaign=100")).toEqual(APPLICATION_VIEWS.CampaignView.toolId);
  });

  describe('APPLICATION_VIEWS', () => {
    it('renders icon for each view', () => {
      expect(APPLICATION_VIEWS.CampaignView.icon()).toEqual('DashboardIcon');
      expect(APPLICATION_VIEWS.CreateNewCampaignView.icon()).toEqual('AddCircleOutlineIcon');
      expect(APPLICATION_VIEWS.ManageCampaignsView.icon()).toEqual('BusinessCenterOutlinedIcon');
    });
  })
});
