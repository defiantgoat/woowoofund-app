import { getToolIdFromPath, APPLICATION_VIEWS } from "../../config";

jest.mock(
  '@material-ui/icons/Dashboard', 
  () => {
    return 'dashboard-icon';
  }
);

describe("config methods", ()=> {
  it("tests getToolIdFromPath", () => {
    expect(getToolIdFromPath("dashboard")).toEqual(APPLICATION_VIEWS.UserDashboard.toolId);
    expect(getToolIdFromPath("view")).toEqual(APPLICATION_VIEWS.CampaignView.toolId);
    expect(getToolIdFromPath("create")).toEqual(APPLICATION_VIEWS.CreateNewCampaignView.toolId);
    expect(getToolIdFromPath("manage")).toEqual(APPLICATION_VIEWS.ManageCampaignsView.toolId);
    expect(getToolIdFromPath("dashboard?country=US&workspace_ids=2,3,3")).toEqual(APPLICATION_VIEWS.UserDashboard.toolId)
    expect(getToolIdFromPath("view?campaign=100")).toEqual(APPLICATION_VIEWS.CampaignView.toolId);
  });

  describe('APPLICATION_VIEWS', () => {
    it('renders icon for each view', () => {
      expect(APPLICATION_VIEWS.UserDashboard.icon()).toEqual('dashboard-icon');
      expect(APPLICATION_VIEWS.CampaignView.icon()).toEqual('dashboard-icon');
      expect(APPLICATION_VIEWS.CreateNewCampaignView.icon()).toEqual('dashboard-icon');
      expect(APPLICATION_VIEWS.ManageCampaignsView.icon()).toEqual('dashboard-icon');
    });
  })
});
