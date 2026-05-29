export interface Affiliation {
  name: string;
  url: string;
  /** Path under /public, e.g. '/affiliations/foo.svg'. Wrapped by u() at render time. */
  logo?: string;
}

export const AFFILIATIONS: Affiliation[] = [
  {
    name: 'AI Safety Camp',
    url: 'https://www.aisafety.camp',
    logo: 'https://lh3.googleusercontent.com/sitesv/AA5AbUAeODxeFje8S6CKBfFvgsgALnd_Ah9gW2JtOR4Smzlz8Ht2pyJBdhm7ENSOhJYcs6FKTUewlttvrmvaRa1HJHt8EbCJhNtDNCb5o0cfLGRpMObO4zS4vbV0pjHTedyHE2RPF0Sqk8LQpjczrHv65GaI4-bU3aEfWdRzykeHz9TrRFy=w400',
  },
  {
    name: 'MBZUAI',
    url: 'https://mbzuai.ac.ae',
    logo: '/affiliations/mbzuai.svg',
  },
  {
    name: 'Algoverse',
    url: 'https://algoverseairesearch.org',
    logo: '/affiliations/algoverse.webp',
  },
  {
    name: 'SPAR',
    url: 'https://sparai.org',
    logo: '/affiliations/spar.png',
  },
  {
    name: 'Meridian Cambridge',
    url: 'https://www.meridiancambridge.org',
    logo: '/affiliations/meridian.webp',
  },
  {
    name: 'Lossfunk',
    url: 'https://lossfunk.com',
    logo: '/affiliations/lossfunk.jpg',
  },
];
