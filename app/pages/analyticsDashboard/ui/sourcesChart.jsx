import { Card, Title, Box, LoadingOverlay } from '@mantine/core';
import { BarChart } from '@mantine/charts';

/**
 * Learn more about BarChart component:
 * https://mantine.dev/charts/bar-chart/
 */

export function SourcesChart({ data, loading }) {
  return (
    <Card withBorder radius='md' padding='lg' pos='relative'>
      <Title order={4} mb='md'>
        Sources
      </Title>
      <Box h={400}>
        <BarChart
          h='100%'
          data={data}
          dataKey='name'
          series={[
            {
              name: 'visitors',
              label: 'Visitors',
              color: 'blue.6',
            },
            {
              name: 'newUsers',
              label: 'New Users',
              color: 'teal.6',
            },
          ]}
        />
      </Box>

      <LoadingOverlay visible={loading} loaderProps={{ size: 'sm', color: 'gray' }} />
    </Card>
  );
}
