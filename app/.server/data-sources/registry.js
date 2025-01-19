import { DataSourceRegistry } from '@kottster/server';
import postgresDataSource from './postgres';

export const dataSourceRegistry = new DataSourceRegistry([postgresDataSource]);