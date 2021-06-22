export interface UIValuesProps {
  id: number;
  label: string;
  value: string | number;
  type?: string;
  enabled?: boolean;
}

export interface ReduxActionProps {
  type: string;
  payload: Record<string, unknown>;
}

export interface ReduxStateConfigProps {
  user: any | null;
  loading_data: boolean;
  active_tool: string;
  env: Record<string, any>;
  campaigns: Record<string,any>;
  active_tab: number;
}

export interface EnvironmentProps {
  type: string;
  api_url: string;
  pitch_endpoint: string;
}
