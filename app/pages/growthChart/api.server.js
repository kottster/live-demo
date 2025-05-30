import { app } from '../../_server/app';
import { generateChartMockupData } from './mockup';

/**
 * Custom server procedures for your page
 *
 * These functions run on the server and can be called from your React components
 * using callProcedure('procedureName', input)
 *
 * Learn more: https://kottster.app/docs/custom-pages/api
 */

const controller = app.defineCustomController({
  getGrowthChartData: async ({ startDate, endDate }) => {
    return generateChartMockupData(startDate, endDate);
  },
});

export default controller;
