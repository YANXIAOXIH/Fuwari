import { makeAPIRouteHandler } from '@keystatic/astro/api';
import keystaticConfig from '../../../keystatic.config';

export const ALL = makeAPIRouteHandler({
  config: keystaticConfig,
});