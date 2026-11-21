import { COMMERCIAL_CATALOG } from './commercialCatalog';
import {
  getPlanCardViewModel,
  getChannelComparisonTable,
} from '../utils/commercialCatalogUtils';

/**
 * Adaptador derivado integralmente da fonte única `COMMERCIAL_CATALOG`.
 * Mantido para compatibilidade com componentes e utilitários que importam
 * `PRICING_CHANNELS`, `getComparisonSectionsForChannel` ou `COMPARISON_SECTIONS`.
 */
function buildChannelEntry(channelId) {
  const channel = COMMERCIAL_CATALOG.channels[channelId];
  return {
    id: channel.id,
    name: channel.name,
    shortName: channel.shortName,
    icon: channel.icon,
    status: channel.status,
    usageUnitDefinition: channel.usageUnitDefinition,
    plans: channel.plans.map((plan) => getPlanCardViewModel(channelId, plan.id, 'monthly')),
  };
}

export const PRICING_CHANNELS = {
  telefone: buildChannelEntry('telefone'),
  whatsapp: buildChannelEntry('whatsapp'),
  webchat: buildChannelEntry('webchat'),
};

export function getComparisonSectionsForChannel(channelId = 'telefone', billingCycle = 'monthly') {
  const table = getChannelComparisonTable(channelId, billingCycle, COMMERCIAL_CATALOG);
  return table?.sections || [];
}

export const COMPARISON_SECTIONS = getComparisonSectionsForChannel('telefone', 'monthly');
