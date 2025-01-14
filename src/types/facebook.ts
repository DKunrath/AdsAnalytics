export interface FacebookAdAccount {
  id: string;
  name: string;
  currency: string;
  timezone_name: string;
}

export interface FacebookCampaign {
  id: string;
  name: string;
  status: string;
  objective: string;
  daily_budget: string;
  lifetime_budget: string;
  start_time: string;
  stop_time?: string;
}

export interface FacebookInsights {
  impressions: string;
  clicks: string;
  spend: string;
  cpc: string;
  ctr: string;
  reach: string;
  frequency: string;
  actions: Array<{
    action_type: string;
    value: string;
  }>;
  cost_per_action_type: Array<{
    action_type: string;
    value: string;
  }>;
}

export interface FacebookAudienceInsights {
  age: string;
  gender: string;
  impressions: string;
  clicks: string;
  spend: string;
  actions: Array<{
    action_type: string;
    value: string;
  }>;
}