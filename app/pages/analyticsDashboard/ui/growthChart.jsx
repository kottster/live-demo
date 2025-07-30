import { Card, Title, Box, LoadingOverlay } from '@mantine/core';
import { LineChart } from '@mantine/charts';
import dayjs from 'dayjs';

/**
 * Learn more about LineChart component:
 * https://mantine.dev/charts/line-chart/
 */

export function GrowthChart({ data, loading }) {
  const formattedData = data.map((item) => ({
    ...item,

    // Convert YYYY-MM-DD to human-friendly format
    date: dayjs(item.date).format('DD MMM'),
  }));

  return (
    <Card withBorder radius='md' padding='lg' pos='relative'>
      <Title order={4} mb='md'>
        Growth Chart
      </Title>
      <Box h={400} pr='sm'>
        <LineChart
          h='100%'
          data={formattedData}
          dataKey='date'
          curveType='linear'
          withDots={true}
          series={[
            {
              name: 'users',
              label: 'Users',
              color: 'blue.6',
            },
            {
              name: 'purchasedItems',
              label: 'Purchased Items',
              color: 'teal.6',
            },
          ]}
        />
      </Box>

      <LoadingOverlay visible={loading} loaderProps={{ size: 'sm', color: 'gray' }} />
    </Card>
  );
}
