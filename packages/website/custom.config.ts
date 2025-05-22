import { DiamondsFour, Graph, Icon, ListChecks } from '@phosphor-icons/react';

type CustomConfig = {
  categoryIconMap: Record<string, Icon>;
};

export const customConfig: CustomConfig = {
  categoryIconMap: {
    'UI Components': DiamondsFour,
    'Diagram Components': Graph,
    'Decision Logs': ListChecks,
  },
} as const;
