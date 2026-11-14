import { useEffect } from 'react';
import { COPY } from '../content/copy';

/**
 * Updates document title and meta description per route.
 */
export function usePageMeta(title?: string, description?: string): void {
  useEffect(() => {
    const nextTitle = COPY.meta.formatTitle(title);
    document.title = nextTitle;

    const nextDescription = description || COPY.meta.defaultDescription;
    let metaDesc = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.name = 'description';
      document.head.appendChild(metaDesc);
    }
    metaDesc.content = nextDescription;
  }, [title, description]);
}
