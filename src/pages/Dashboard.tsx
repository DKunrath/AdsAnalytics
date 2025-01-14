import React from 'react';
import { BarChart3, TrendingUp, Users, DollarSign } from 'lucide-react';
import { Line, Bar } from 'react-chartjs-2';
import FacebookConnect from '../components/FacebookConnect';
import { useFacebookAuth } from '../hooks/useFacebookAuth';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const stats = [
  { name: 'Total Spend', value: '$12,345', change: '+12%', icon: DollarSign },
  { name: 'ROAS', value: '2.4x', change: '+18%', icon: TrendingUp },
  { name: 'Impressions', value: '2.3M', change: '+7%', icon: BarChart3 },
  { name: 'Conversions', value: '1,234', change: '+3%', icon: Users },
];

const performanceData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [
    {
      label: 'ROAS',
      data: [2.1, 2.4, 2.2, 2.6, 2.8, 3.0],
      borderColor: 'rgb(99, 102, 241)',
      backgroundColor: 'rgba(99, 102, 241, 0.5)',
      yAxisID: 'y',
    },
    {
      label: 'Spend',
      data: [1200, 1400, 1300, 1600, 1800, 2000],
      borderColor: 'rgb(14, 165, 233)',
      backgroundColor: 'rgba(14, 165, 233, 0.5)',
      yAxisID: 'y1',
    },
  ],
};

const audienceData = {
  labels: ['18-24', '25-34', '35-44', '45-54', '55-64', '65+'],
  datasets: [
    {
      label: 'Audience Distribution',
      data: [15, 30, 25, 18, 8, 4],
      backgroundColor: [
        'rgba(99, 102, 241, 0.8)',
        'rgba(14, 165, 233, 0.8)',
        'rgba(236, 72, 153, 0.8)',
        'rgba(34, 197, 94, 0.8)',
        'rgba(249, 115, 22, 0.8)',
        'rgba(168, 85, 247, 0.8)',
      ],
    },
  ],
};

const performanceOptions: ChartOptions = {
  responsive: true,
  interaction: {
    mode: 'index' as const,
    intersect: false,
  },
  scales: {
    y: {
      type: 'linear' as const,
      display: true,
      position: 'left' as const,
      title: {
        display: true,
        text: 'ROAS',
      },
    },
    y1: {
      type: 'linear' as const,
      display: true,
      position: 'right' as const,
      title: {
        display: true,
        text: 'Spend ($)',
      },
      grid: {
        drawOnChartArea: false,
      },
    },
  },
};

const audienceOptions: ChartOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Audience Age Distribution',
    },
  },
};

export default function Dashboard() {
  const { accessToken } = useFacebookAuth();

  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
      
      <div className="mt-8">
        <FacebookConnect />
      </div>
      
      {accessToken ? (
        <>
          <dl className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.name}
                  className="relative overflow-hidden rounded-lg bg-white px-4 pb-12 pt-5 shadow sm:px-6 sm:pt-6"
                >
                  <dt>
                    <div className="absolute rounded-md bg-indigo-500 p-3">
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <p className="ml-16 truncate text-sm font-medium text-gray-500">
                      {item.name}
                    </p>
                  </dt>
                  <dd className="ml-16 flex items-baseline pb-6 sm:pb-7">
                    <p className="text-2xl font-semibold text-gray-900">
                      {item.value}
                    </p>
                    <p className="ml-2 flex items-baseline text-sm font-semibold text-green-600">
                      {item.change}
                    </p>
                  </dd>
                </div>
              );
            })}
          </dl>

          <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-2">
            <div className="rounded-lg bg-white p-6 shadow">
              <h2 className="text-lg font-medium text-gray-900">Campaign Performance</h2>
              <div className="mt-4">
                <Line options={performanceOptions} data={performanceData} />
              </div>
            </div>

            <div className="rounded-lg bg-white p-6 shadow">
              <h2 className="text-lg font-medium text-gray-900">Audience Overview</h2>
              <div className="mt-4">
                <Bar options={audienceOptions} data={audienceData} />
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="mt-8 rounded-lg bg-gray-50 p-8 text-center">
          <h3 className="text-lg font-medium text-gray-900">Connect to Facebook Ads</h3>
          <p className="mt-2 text-sm text-gray-500">
            Connect your Facebook Ads account to view your campaign analytics and insights.
          </p>
        </div>
      )}
    </div>
  );
}