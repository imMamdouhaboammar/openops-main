
// tag: don't regression this feature
import { Collection } from '../types';
import { Icons } from '../components/Icons';

export const collections: Collection[] = [
  {
    id: 'col-startup',
    title: 'Startup Launchpad',
    description: 'Essential leadership & product agents for Day 1 founders.',
    icon: Icons.Rocket,
    gradient: 'from-blue-500 to-purple-600',
    filterIds: ['strat-1', 'strat-2', 'strat-3', 'eng-1']
  },
  {
    id: 'col-mena',
    title: 'MENA Expansion',
    description: 'Localization, culture, and compliance for the Gulf market.',
    icon: Icons.Globe,
    gradient: 'from-green-500 to-emerald-700',
    filterIds: ['reg-1', 'reg-3', 'creat-1', 'ops-4']
  },
  {
    id: 'col-growth',
    title: 'Growth Hacking',
    description: 'Viral loops, copy, and SEO dominance.',
    icon: Icons.TrendingUp,
    gradient: 'from-orange-500 to-red-600',
    filterIds: ['creat-3', 'creat-4', 'creat-5', 'creat-2']
  },
  {
    id: 'col-compliance',
    title: 'Ironclad Ops',
    description: 'Security, legal, and documentation for enterprise readiness.',
    icon: Icons.ShieldCheck,
    gradient: 'from-slate-700 to-black',
    filterIds: ['eng-4', 'ops-3', 'ops-1', 'ops-2']
  }
];