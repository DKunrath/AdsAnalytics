import { APIClient } from 'facebook-nodejs-business-sdk';

export class FacebookAdsAPI {
  private client: APIClient;
  private accessToken: string;

  constructor(accessToken: string) {
    this.accessToken = accessToken;
    this.client = new APIClient(accessToken);
  }

  async getAdAccounts() {
    try {
      const accounts = await this.client.call('GET', '/me/adaccounts', {
        fields: ['id', 'name', 'currency', 'timezone_name'],
      });
      return accounts.data;
    } catch (error) {
      console.error('Error fetching ad accounts:', error);
      throw error;
    }
  }

  async getCampaigns(adAccountId: string) {
    try {
      const campaigns = await this.client.call('GET', `/${adAccountId}/campaigns`, {
        fields: [
          'id',
          'name',
          'status',
          'objective',
          'daily_budget',
          'lifetime_budget',
          'start_time',
          'stop_time',
        ],
      });
      return campaigns.data;
    } catch (error) {
      console.error('Error fetching campaigns:', error);
      throw error;
    }
  }

  async getCampaignInsights(campaignId: string, datePreset: string = 'last_30d') {
    try {
      const insights = await this.client.call('GET', `/${campaignId}/insights`, {
        fields: [
          'impressions',
          'clicks',
          'spend',
          'cpc',
          'ctr',
          'reach',
          'frequency',
          'actions',
          'cost_per_action_type',
        ],
        date_preset: datePreset,
      });
      return insights.data;
    } catch (error) {
      console.error('Error fetching campaign insights:', error);
      throw error;
    }
  }

  async getAudienceInsights(adAccountId: string, campaignIds: string[]) {
    try {
      const insights = await this.client.call('GET', `/${adAccountId}/insights`, {
        fields: [
          'age',
          'gender',
          'impressions',
          'clicks',
          'spend',
          'actions',
        ],
        breakdowns: ['age', 'gender'],
        filtering: [
          {
            field: 'campaign.id',
            operator: 'IN',
            value: campaignIds,
          },
        ],
      });
      return insights.data;
    } catch (error) {
      console.error('Error fetching audience insights:', error);
      throw error;
    }
  }
}