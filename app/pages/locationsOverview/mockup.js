import dayjs from 'dayjs';

const COUNTRIES = [
  'United States',
  'United Kingdom',
  'Germany',
  'France',
  'Japan',
  'Australia',
  'Canada',
  'Spain',
  'India',
  'Brazil',
];

export function generateChartMockupData(startDate, endDate) {
  const start = dayjs(startDate);
  const end = dayjs(endDate);
  const days = end.diff(start, 'day') + 1;

  const data = COUNTRIES.map((country, index) => {
    const countryMultiplier = 0.3 + index * 0.2 + Math.random() * 1.5;

    const users = Math.round((200 + days * (10 + Math.random() * 5)) * countryMultiplier);
    const visitors = Math.round((400 + days * (12 + Math.random() * 6)) * countryMultiplier);
    const purchasedItems = Math.round((70 + days * (4 + Math.random() * 2)) * countryMultiplier);
    const subscriptions = Math.round((30 + days * (0.7 + Math.random() * 0.5)) * countryMultiplier);

    return {
      location: country,
      users,
      visitors,
      purchasedItems,
      subscriptions,
    };
  });

  return data.sort((a, b) => b.users - a.users);
}
