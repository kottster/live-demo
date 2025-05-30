import { useEffect, useState } from 'react';
import { Page, useCallProcedure } from '@kottster/react';
import { Grid, Space } from '@mantine/core';
import '@mantine/charts/styles.css';
import { GrowthChart } from './ui/growthChart';
import { SourcesChart } from './ui/sourcesChart';
import { DailyReportsTable } from './ui/dailyReportsTable';
import { PeriodPicker } from './ui/periodPicker';
import { Stat } from './ui/stat';

/**
 * Learn more about building custom pages:
 * https://kottster.app/docs/custom-pages/introduction
 */

export default () => {
  const callProcedure = useCallProcedure();
  const [periodDates, setPeriodDates] = useState([null, null]);

  const [metricsLoading, setMetricsLoading] = useState(false);
  const [metrics, setMetrics] = useState({
    totalRevenue: 0,
    totalRevenueChange: 0,
    newUsers: 0,
    newUsersChange: 0,
    growthRate: 0,
    purchasedItems: 0,
  });

  const [growthChartLoading, setGrowthChartLoading] = useState(false);
  const [growthChartData, setGrowthChartData] = useState([]);

  const [sourceChartLoading, setSourceChartLoading] = useState(false);
  const [sourceChartData, setSourceChartData] = useState([]);

  const [dailyReportsLoading, setDailyReportsLoading] = useState(false);
  const [dailyReportsData, setDailyReportsData] = useState([]);

  const fetchMetrics = async () => {
    if (!periodDates[0] || !periodDates[1]) {
      return;
    }

    setMetricsLoading(true);
    try {
      const data = await callProcedure('getMetrics', {
        startDate: periodDates[0],
        endDate: periodDates[1],
      });
      setMetrics(data);
    } catch (error) {
      console.error('Error fetching metrics:', error);
    } finally {
      setMetricsLoading(false);
    }
  };

  const fetchGrowthChartData = async () => {
    if (!periodDates[0] || !periodDates[1]) {
      return;
    }

    setGrowthChartLoading(true);
    try {
      const data = await callProcedure('getGrowthChartData', {
        startDate: periodDates[0],
        endDate: periodDates[1],
      });
      setGrowthChartData(data);
    } catch (error) {
      console.error('Error fetching growth chart data:', error);
    } finally {
      setGrowthChartLoading(false);
    }
  };

  const fetchSourceChartData = async () => {
    if (!periodDates[0] || !periodDates[1]) {
      return;
    }

    setSourceChartLoading(true);
    try {
      const data = await callProcedure('getSourceChartData', {
        startDate: periodDates[0],
        endDate: periodDates[1],
      });
      setSourceChartData(data);
    } catch (error) {
      console.error('Error fetching sources data:', error);
    } finally {
      setSourceChartLoading(false);
    }
  };

  const fetchDailyReportsData = async () => {
    if (!periodDates[0] || !periodDates[1]) {
      return;
    }

    setDailyReportsLoading(true);
    try {
      const data = await callProcedure('getDailyReportsData', {
        startDate: periodDates[0],
        endDate: periodDates[1],
      });
      setDailyReportsData(data);
    } catch (error) {
      console.error('Error fetching daily reports data:', error);
    } finally {
      setDailyReportsLoading(false);
    }
  };

  useEffect(() => {
    fetchMetrics();
    fetchGrowthChartData();
    fetchSourceChartData();
    fetchDailyReportsData();
  }, [periodDates]);

  return (
    <Page headerRightSection={<PeriodPicker value={periodDates} onChange={setPeriodDates} />}>
      <Space h='sm' />

      <Grid gutter='md'>
        <Grid.Col span={3}>
          <Stat
            label='Total Revenue'
            value={metrics.totalRevenue.toLocaleString('en-US', {
              style: 'currency',
              currency: 'USD',
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
            })}
            change={
              metrics.totalRevenueChange
                ? {
                    direction: metrics.totalRevenueChange > 0 ? 'up' : 'down',
                    value: metrics.totalRevenueChange.toLocaleString('en-US', {
                      style: 'percent',
                      minimumFractionDigits: 0,
                      maximumFractionDigits: 1,
                    }),
                  }
                : undefined
            }
            loading={metricsLoading}
          />
        </Grid.Col>
        <Grid.Col span={3}>
          <Stat
            label='New Users'
            value={metrics.newUsers.toLocaleString('en-US')}
            change={
              metrics.newUsersChange
                ? {
                    direction: metrics.newUsersChange > 0 ? 'up' : 'down',
                    value: metrics.newUsersChange.toLocaleString('en-US', {
                      style: 'percent',
                      minimumFractionDigits: 0,
                      maximumFractionDigits: 1,
                    }),
                  }
                : undefined
            }
            loading={metricsLoading}
          />
        </Grid.Col>
        <Grid.Col span={3}>
          <Stat
            label='Growth Rate'
            value={metrics.growthRate.toLocaleString('en-US', {
              style: 'percent',
              minimumFractionDigits: 0,
              maximumFractionDigits: 1,
            })}
            loading={metricsLoading}
          />
        </Grid.Col>
        <Grid.Col span={3}>
          <Stat
            label='Purchased Items'
            value={metrics.purchasedItems.toLocaleString('en-US')}
            loading={metricsLoading}
          />
        </Grid.Col>
      </Grid>

      <Space h='xl' />

      <Grid>
        <Grid.Col span={8}>
          <GrowthChart data={growthChartData} loading={growthChartLoading} />
        </Grid.Col>

        <Grid.Col span={4}>
          <SourcesChart data={sourceChartData} loading={sourceChartLoading} />
        </Grid.Col>
      </Grid>

      <Space h='xl' />

      <Grid>
        <Grid.Col span={12}>
          <DailyReportsTable data={dailyReportsData} loading={dailyReportsLoading} />
        </Grid.Col>
      </Grid>
    </Page>
  );
};
