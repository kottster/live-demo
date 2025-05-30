import dayjs from 'dayjs';

export function generateMetricsMockupData(startDate, endDate) {
  const start = dayjs(startDate);
  const end = dayjs(endDate);
  const days = end.diff(start, 'day') + 1;

  const newUsers = Math.round(days * 100 * (0.95 + Math.random() * 0.1));
  const purchasedItems = Math.round(days * 25 * (0.95 + Math.random() * 0.1));
  const totalRevenue = Math.round(purchasedItems * 100 * (0.97 + Math.random() * 0.06));
  const growthRate = +(0.04 + Math.random() * 0.03).toFixed(3);
  const totalRevenueChange = +(0.09 + Math.random() * 0.05).toFixed(3);
  const newUsersChange = +(0.06 + Math.random() * 0.06).toFixed(3);

  return {
    totalRevenue: Math.round(totalRevenue),
    totalRevenueChange: +totalRevenueChange.toFixed(3),
    newUsers,
    newUsersChange: +newUsersChange.toFixed(3),
    growthRate: +growthRate.toFixed(3),
    purchasedItems,
  };
}

export function generateGrowthChartMockupData(startDate, endDate) {
  const start = dayjs(startDate);
  const end = dayjs(endDate);
  const days = end.diff(start, 'day') + 1;

  let users = 300;
  let purchasedItems = 100;

  const data = [];

  for (let i = 0; i < days; i++) {
    const usersGrowth = Math.round(Math.random() * 40 * (0.95 + Math.random() * 0.4));
    const purchasedItemsGrowth = Math.round(Math.random() * 18);

    users += usersGrowth;
    purchasedItems += purchasedItemsGrowth;

    data.push({
      date: start.add(i, 'day').format('YYYY-MM-DD'),
      users,
      purchasedItems,
    });
  }

  return data;
}

export function generateSourceChartMockupData(startDate, endDate) {
  const sources = ['Google', 'LinkedIn', 'Instagram', 'YouTube'];
  const start = dayjs(startDate);
  const end = dayjs(endDate);
  const days = end.diff(start, 'day') + 1;

  return sources.map((name) => {
    const dailyVisitors = name === 'Google' ? 120 : name === 'Facebook' ? 60 : 40 + Math.random() * 40;

    const visitors = Math.round(dailyVisitors * days * (0.95 + Math.random() * 0.1));
    const newUsers = Math.round(visitors * (0.18 + Math.random() * 0.12));

    return { name, visitors, newUsers };
  });
}

export function generateDailyReportsMockupData(startDate, endDate) {
  const start = dayjs(startDate);
  const end = dayjs(endDate);
  const days = end.diff(start, 'day') + 1;

  const result = [];

  for (let i = 0; i < days; i++) {
    const visitors = Math.round(800 * (0.95 + Math.random() * 0.1));
    const newUsers = Math.round(600 * (0.95 + Math.random() * 0.1));
    const purchases = Math.round(120 * (0.95 + Math.random() * 0.1));
    const revenue = Math.round(purchases * 320 * (0.97 + Math.random() * 0.06));
    const dau = Math.round(1000 * (0.95 + Math.random() * 0.1));
    const conversionRate = +(purchases / visitors).toFixed(2);
    const activationRate = +(0.2 + Math.random() * 0.25).toFixed(2);

    result.push({
      date: start.add(i, 'day').format('YYYY-MM-DD'),
      conversionRate,
      newUsers,
      purchases,
      revenue,
      activationRate,
      dau,
      visitors,
    });
  }

  return result;
}
