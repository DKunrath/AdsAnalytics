import { useQuery } from '@tanstack/react-query';
import { FacebookAdsAPI } from '../lib/facebook';

// Initialize the Facebook Ads API client
// Note: In production, you should store this in an environment variable
const fbApi = new FacebookAdsAPI(import.meta.env.VITE_FACEBOOK_ACCESS_TOKEN);

export function useAdAccounts() {
  return useQuery({
    queryKey: ['adAccounts'],
    queryFn: () => fbApi.getAdAccounts(),
  });
}

export function useCampaigns(adAccountId: string) {
  return useQuery({
    queryKey: ['campaigns', adAccountId],
    queryFn: () => fbApi.getCampaigns(adAccountId),
    enabled: !!adAccountId,
  });
}

export function useCampaignInsights(campaignId: string) {
  return useQuery({
    queryKey: ['campaignInsights', campaignId],
    queryFn: () => fbApi.getCampaignInsights(campaignId),
    enabled: !!campaignId,
  });
}

export function useAudienceInsights(adAccountId: string, campaignIds: string[]) {
  return useQuery({
    queryKey: ['audienceInsights', adAccountId, campaignIds],
    queryFn: () => fbApi.getAudienceInsights(adAccountId, campaignIds),
    enabled: !!adAccountId && campaignIds.length > 0,
  });
}