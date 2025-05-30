import dayjs from 'dayjs';

export function generateChartMockupData(startDate, endDate) {
  const start = dayjs(startDate);
  const end = dayjs(endDate);
  const days = end.diff(start, 'day') + 1;

  const data = [];

  for (let i = 0; i < days; i++) {
    data.push({
      date: start.add(i, 'day').format('YYYY-MM-DD'),
      visitors: Math.floor(Math.random() * (300 - 200 + 1)) + 200,
      users: Math.floor(Math.random() * (200 - 150 + 1)) + 150,
      purchasedItems: Math.floor(Math.random() * (170 - 100 + 1)) + 100,
      subscriptions: Math.floor(Math.random() * (90 - 10 + 1)) + 10,
    });
  }

  return data;
}
