export const SitemapUpdateFrequency = Object.freeze({
  EveryHour: 'everyHour',
  EveryDay: 'everyDay',
  EveryWeek: 'everyWeek',
  EveryMonth: 'everyMonth',
});

export const InvoicePaymentDeadline = Object.freeze({
  SevenDays: '7days',
  FourteenDays: '14days',
  None: 'none',
});

export const settings = {
  maintainanceMode: false,
  sitemapUpdateFrequency: SitemapUpdateFrequency.EveryDay,
  apiRequestLimit: 100,
  invoicePaymentDeadline: InvoicePaymentDeadline.SevenDays,
};
