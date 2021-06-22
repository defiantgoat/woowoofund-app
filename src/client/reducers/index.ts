import {
  ACTION_ADD_USER,
  ACTION_SET_ENVIRONMENT,
  ACTION_SET_LOADING_DATA,
  ACTION_SET_ACTIVE_TOOL,
  ACTION_UPDATE_CAMPAIGNS,
  ACTION_SET_ACTIVE_TAB
} from '../constants/index';
import { ReduxActionProps, ReduxStateConfigProps } from '../interfaces';
import { DEFAULT_APPLICATION_PATH } from '../config';
import jwtDecode from 'jwt-decode';

// Self signed token valid for 6 months for use with woowoofund-api POC
const POC_LONGLIVED_TOKEN = 'eyJ0eXAiOiJKV1QiLCJraWQiOiJtb2NrLWtpZCIsImFsZyI6IlJTMjU2In0.eyJpc3MiOiJodHRwczovL3dvb3dvb2Z1bmQuY29tIiwiY2xpZW50X2lkIjoid29vd29vZnVuZCIsIndvb3dvb2FwcCI6WyJjYW46ZXZlcnl0aGluZyJdLCJ1c2VyIjp7ImlkIjoxLCJlbWFpbCI6ImRlZmlhbnRnb2F0QGdtYWlsLmNvbSIsImZpcnN0X25hbWUiOiJEZWZpYW50IiwibGFzdF9uYW1lIjoiR29hdCJ9LCJleHAiOjE2Mzk2OTUyMjl9.Fc4PAVn5Z0wMIXZHbwYE4-xqoFG4tUppYEQkLmVFwf015pMdiwPqZrPCbwIgJabZXlY7HPz4z_skY3i1ns-GBL_ttSbfHziqyiIw8a_qjITNCNEZjtnLUICXjGH-CLb3QFiR3fxib59IUh_bwNTU481jgTsoW6tCyEOSPaJq2dwiG6RHpglRycim4kC4saNkj1kUPRYzScMShoQdh_FvBRaBwooloLZc5_7ZtlFtAlei-kKzOfhcRRhZ9HkbnifSaUDxrI5In_fzmv27eYlmUjmyiW78C_F4OdEtp8Ap4mzWJyuWuypExY7S1JW_Gf4c_b2Wf8IrPfEOFP-74Qq5QQ'

export const initialState: ReduxStateConfigProps = {
  user: {
    oidc: {
      access_token: POC_LONGLIVED_TOKEN
    },
    decoded_token: jwtDecode(POC_LONGLIVED_TOKEN),
    logged_in: true
  },
  active_tool: DEFAULT_APPLICATION_PATH,
  loading_data: false,
  env: {
    type: '',
    ap: '',
    metadata_endpoint: '',
    rules_endpoint: ''
  },
  campaigns: {},
  active_tab: 0
};

const rootReducer = (state = initialState, action: ReduxActionProps): ReduxStateConfigProps => {

  const {payload} = action as any;
  
  switch(action.type) {
      
    case ACTION_ADD_USER:
      return {
        ...state,
        user: payload
      };

    case ACTION_SET_ACTIVE_TOOL: 
      return {
        ...state,
        active_tool: payload
      };
      
    case ACTION_SET_ACTIVE_TAB: 
      return {
        ...state,
        active_tab: payload
      };

    case ACTION_SET_LOADING_DATA:
      return {
        ...state,
        loading_data: payload
      };

    case ACTION_SET_ENVIRONMENT:
      return {
        ...state,
        env: payload
      };

    case ACTION_UPDATE_CAMPAIGNS:
      return {
        ...state,
        campaigns: payload
      };

    default: 
        return state;
    }
};

export default rootReducer;
