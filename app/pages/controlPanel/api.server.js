import { app } from '../../_server/app';
import { settings } from './mockup';

const controller = app.defineCustomController({
  getSettings: async () => {
    return settings;
  },

  updateMaintainanceMode: async (value) => {
    settings.maintainanceMode = value;
    return true;
  },

  updateSitemapUpdateFrequency: async (value) => {
    settings.sitemapUpdateFrequency = value;
    return true;
  },

  exportData: async ({ email }) => {
    console.log('[mockup] Exporting data to:', email);
    return true;
  },

  updateInvoicePaymentDeadline: async (value) => {
    settings.invoicePaymentDeadline = value;
    return true;
  },

  resetAllApiKeys: async () => {
    console.log('[mockup] Resetting all API keys');
    return true;
  },
});

export default controller;
