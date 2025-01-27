export function DashboardStat({ title, value, change, prefix }) {
  const finalValue = typeof value === 'number' ? value.toLocaleString() : value;

  return (
    <div className='border p-6 rounded-lg bg-white'>
      <div className='text-sm text-gray-600'>{title}</div>
      <div className='mt-2'>
        <div className='text-2xl font-medium'>
          {prefix ?? ''}
          {finalValue}
        </div>
        {change && <div className='text-sm text-gray-600 mt-1'>{change}</div>}
      </div>
    </div>
  );
}
