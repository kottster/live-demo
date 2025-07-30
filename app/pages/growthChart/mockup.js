import dayjs from 'dayjs';

export function generateChartMockupData(startDate, endDate) {
  const start = dayjs(startDate);
  const end = dayjs(endDate);
  const days = end.diff(start, 'day') + 1;

  let visitors = 1200;
  let users = 500;
  let purchasedItems = 100;
  let subscriptions = 40;

  const data = [];

  for (let i = 0; i < days; i++) {
    const visitorsGrowth = Math.round(Math.random() * 50);
    const usersGrowth = Math.round(Math.random() * 20);
    const purchasedItemsGrowth = Math.round(Math.random() * 8);
    const subscriptionsGrowth = Math.round(Math.random() * 4);

    visitors += visitorsGrowth;
    users += usersGrowth;
    purchasedItems += purchasedItemsGrowth;
    subscriptions += subscriptionsGrowth;

    data.push({
      date: start.add(i, 'day').format('YYYY-MM-DD'),
      users,
      purchasedItems,
      visitors,
      subscriptions,
    });
  }

  return data;
}
