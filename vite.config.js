import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { profile } from './src/data/profile.js'
import { socialList } from './src/data/social.js'

/**
 * Inietta SEO e schema.org nell'index.html a partire dal data layer,
 * così titolo, descrizione e profili social hanno un'unica fonte.
 */
function seo() {
  const { seo: s, url, name } = profile
  const image = new URL(s.ogImage, url).href

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    name: s.title,
    url,
    mainEntity: {
      '@type': 'Person',
      '@id': `${url}/#person`,
      name,
      url,
      image,
      jobTitle: profile.descriptor,
      description: s.description,
      address: { '@type': 'PostalAddress', addressLocality: 'Rome', addressCountry: 'IT' },
      knowsAbout: ['Illustration', 'Visual effects', 'Compositing', 'Matte painting', 'Nuke'],
      sameAs: socialList.map((x) => x.url),
    },
  }

  const meta = (attrs) => ({ tag: 'meta', attrs, injectTo: 'head' })

  return {
    name: 'seo-inject',
    transformIndexHtml(html) {
      return {
        html: html.replace(/<title>.*<\/title>/, `<title>${s.title}</title>`),
        tags: [
          meta({ name: 'description', content: s.description }),
          { tag: 'link', attrs: { rel: 'canonical', href: `${url}/` }, injectTo: 'head' },
          meta({ property: 'og:type', content: 'profile' }),
          meta({ property: 'og:site_name', content: name }),
          meta({ property: 'og:title', content: s.title }),
          meta({ property: 'og:description', content: s.description }),
          meta({ property: 'og:url', content: `${url}/` }),
          meta({ property: 'og:image', content: image }),
          meta({ property: 'og:image:width', content: '1200' }),
          meta({ property: 'og:image:height', content: '630' }),
          meta({ property: 'og:image:alt', content: `${name}, ${profile.descriptor}` }),
          meta({ property: 'og:locale', content: s.locale }),
          meta({ property: 'profile:first_name', content: profile.firstName }),
          meta({ property: 'profile:last_name', content: profile.lastName }),
          meta({ name: 'twitter:card', content: 'summary_large_image' }),
          meta({ name: 'twitter:title', content: s.title }),
          meta({ name: 'twitter:description', content: s.description }),
          meta({ name: 'twitter:image', content: image }),
          {
            tag: 'script',
            attrs: { type: 'application/ld+json' },
            children: JSON.stringify(jsonLd),
            injectTo: 'head',
          },
        ],
      }
    },
  }
}

export default defineConfig({
  plugins: [react(), seo()],
  build: {
    target: 'es2022',
    cssCodeSplit: false,
    assetsInlineLimit: 0,
  },
})
