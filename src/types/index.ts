export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

export interface Campaign {
  id: string;
  name: string;
  status: 'active' | 'paused' | 'completed';
  budget: number;
  spend: number;
  impressions: number;
  clicks: number;
  conversions: number;
  ctr: number;
  cpc: number;
  roas: number;
  startDate: string;
  endDate?: string;
}

export interface AdMetrics {
  date: string;
  spend: number;
  impressions: number;
  clicks: number;
  conversions: number;
  revenue: number;
}

export interface AdAccount {
  id: string;
  name: string;
  currency: string;
  timezone: string;
}