import { Card, Group, Text, Title, Table, Progress, LoadingOverlay, RingProgress } from '@mantine/core';
import dayjs from 'dayjs';

/**
 * Learn more about Table component:
 * https://mantine.dev/core/table/
 */

export function DailyReportsTable({ data, loading }) {
  return (
    <Card withBorder radius='md' padding='lg'>
      <Title order={4} mb='md'>
        Daily Reports
      </Title>

      <Table.ScrollContainer minWidth={800}>
        <Table verticalSpacing='xs' horizontalSpacing='xs' highlightOnHover>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Date</Table.Th>
              <Table.Th>Visitors</Table.Th>
              <Table.Th>New Users</Table.Th>
              <Table.Th>Conversion Rate</Table.Th>
              <Table.Th>DAU</Table.Th>
              <Table.Th>Purchases</Table.Th>
              <Table.Th>Revenue</Table.Th>
              <Table.Th>Activation Rate</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {data.map((row) => (
              <Table.Tr key={row.date}>
                <Table.Td>{dayjs(row.date).format('DD MMMM (dddd)')}</Table.Td>
                <Table.Td>{row.visitors.toLocaleString('en-US')}</Table.Td>
                <Table.Td>{row.newUsers.toLocaleString('en-US')}</Table.Td>
                <Table.Td>
                  <Group gap='xs' align='center'>
                    <RingProgress
                      size={24}
                      roundCaps
                      thickness={3}
                      sections={[{ value: row.conversionRate * 100, color: 'blue' }]}
                    />
                    <Text fw='500'>
                      {row.conversionRate.toLocaleString('en-US', {
                        style: 'percent',
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 2,
                      })}
                    </Text>
                  </Group>
                </Table.Td>
                <Table.Td>{row.dau.toLocaleString('en-US')}</Table.Td>
                <Table.Td>{row.purchases.toLocaleString('en-US')}</Table.Td>
                <Table.Td fw='500'>
                  {row.revenue.toLocaleString('en-US', {
                    style: 'currency',
                    currency: 'USD',
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 0,
                  })}
                </Table.Td>
                <Table.Td>
                  <Group justify='space-between'>
                    <Text fz='xs' c='teal' fw={700}>
                      {row.activationRate.toLocaleString('en-US', {
                        style: 'percent',
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 2,
                      })}
                    </Text>
                  </Group>
                  <Progress.Root>
                    <Progress.Section value={row.activationRate * 100} color='teal' />

                    <Progress.Section value={(1 - row.activationRate) * 100} color='gray.2' />
                  </Progress.Root>
                </Table.Td>
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>
      </Table.ScrollContainer>

      <LoadingOverlay visible={loading} loaderProps={{ size: 'sm', color: 'gray' }} />
    </Card>
  );
}
