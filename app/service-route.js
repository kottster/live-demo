import { app } from './.server/app';
import { SpecialRoutePage } from '@kottster/react';


export const loader = async (args) => {
  return app.createServiceRouteLoader()(args);
};

export const action = async (args) => {
  return app.createServiceRouteLoader()(args);
};

export default SpecialRoutePage;