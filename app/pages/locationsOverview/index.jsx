import { useEffect, useState } from 'react';
import { Page, useCallProcedure } from '@kottster/react';
import { Box, Card, Grid, LoadingOverlay, Space } from '@mantine/core';
import { BarChart } from '@mantine/charts';
import '@mantine/charts/styles.css';
import { PeriodPicker } from './ui/periodPicker';
import { Stat } from './ui/stat';

/**
 * Learn more about building custom pages:
 * https://kottster.app/docs/custom-pages/introduction
 */

export default () => {
  const callProcedure = useCallProcedure();
  const [periodDates, setPeriodDates] = useState([null, null]);

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  const fetchGrowthChartData = async () => {
    if (!periodDates[0] || !periodDates[1]) {
      return;
    }

    setLoading(true);
    try {
      const data = await callProcedure('getGrowthChartData', {
        startDate: periodDates[0],
        endDate: periodDates[1],
      });
      setData(data);
    } catch (error) {
      console.error('Error fetching growth chart data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGrowthChartData();
  }, [periodDates]);

  return (
    <Page headerRightSection={<PeriodPicker value={periodDates} onChange={setPeriodDates} />}>
      <Space h='sm' />

      <Card withBorder radius='md' padding='lg' pos='relative'>
        <Grid mb='xl' p='md' pb='xs'>
          <Grid.Col span={3}>
            <Stat label='Users' value={data.reduce((acc, item) => acc + item.users, 0).toLocaleString('en-US')} />
          </Grid.Col>
          <Grid.Col span={3}>
            <Stat label='Visitors' value={data.reduce((acc, item) => acc + item.visitors, 0).toLocaleString('en-US')} />
          </Grid.Col>
          <Grid.Col span={3}>
            <Stat
              label='Purchased Items'
              value={data.reduce((acc, item) => acc + item.purchasedItems, 0).toLocaleString('en-US')}
            />
          </Grid.Col>
          <Grid.Col span={3}>
            <Stat
              label='Active Subscriptions'
              value={data.reduce((acc, item) => acc + item.subscriptions, 0).toLocaleString('en-US')}
            />
          </Grid.Col>
        </Grid>

        <Box h='60vh' mah='700px' pr='lg' mb='sm'>
          <BarChart
            h='100%'
            data={data}
            dataKey='location'
            series={[
              {
                name: 'users',
                label: 'Users',
                color: 'blue.6',
              },
              {
                name: 'visitors',
                label: 'Visitors',
                color: 'grape.5',
              },
              {
                name: 'purchasedItems',
                label: 'Purchased Items',
                color: 'lime.6',
              },
              {
                name: 'subscriptions',
                label: 'Active Subscriptions',
                color: 'teal.6',
              },
            ]}
          />
        </Box>

        <LoadingOverlay visible={loading} loaderProps={{ size: 'sm', color: 'gray' }} />
      </Card>
    </Page>
  );
};
