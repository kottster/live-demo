import { app } from '../../_server/app';
import {
  generateMetricsMockupData,
  generateGrowthChartMockupData,
  generateSourceChartMockupData,
  generateDailyReportsMockupData,
} from './mockup';

/**
 * Custom server procedures for your page
 *
 * These functions run on the server and can be called from your React components
 * using callProcedure('procedureName', input)
 *
 * Learn more: https://kottster.app/docs/custom-pages/api
 */

const controller = app.defineCustomController({
  getMetrics: async ({ startDate, endDate }) => {
    return generateMetricsMockupData(startDate, endDate);
  },
  getGrowthChartData: async ({ startDate, endDate }) => {
    return generateGrowthChartMockupData(startDate, endDate);
  },
  getSourceChartData: async ({ startDate, endDate }) => {
    return generateSourceChartMockupData(startDate, endDate);
  },
  getDailyReportsData: async ({ startDate, endDate }) => {
    return generateDailyReportsMockupData(startDate, endDate);
  },
});

export default controller;
