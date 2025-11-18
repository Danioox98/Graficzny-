import { Template } from '@/types';
import { businessCardTemplates } from './business-cards';
import { flyerTemplates } from './flyers';
import { posterBannerInviteTemplates } from './posters-banners-invites';

// Wszystkie szablony
export const TEMPLATES: Template[] = [
  ...businessCardTemplates,
  ...flyerTemplates,
  ...posterBannerInviteTemplates,
];

export const getTemplateById = (id: string): Template | undefined => {
  return TEMPLATES.find(t => t.id === id);
};

export const getTemplatesByProduct = (productId: string): Template[] => {
  return TEMPLATES.filter(t => t.productId === productId);
};

export const getTemplatesByCategory = (category: string): Template[] => {
  return TEMPLATES.filter(t => t.category === category);
};

export const getTemplatesByTags = (tags: string[]): Template[] => {
  return TEMPLATES.filter(t =>
    tags.some(tag => t.tags.includes(tag))
  );
};

export const getAllTags = (): string[] => {
  const allTags = new Set<string>();
  TEMPLATES.forEach(t => t.tags.forEach(tag => allTags.add(tag)));
  return Array.from(allTags).sort();
};
