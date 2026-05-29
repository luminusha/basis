export interface Affiliation {
  name: string;
  url: string;
  /**
   * Domain used to fetch a logo from clearbit's free logo service.
   * Set this for orgs where the clearbit logo looks acceptable.
   */
  clearbitDomain?: string;
  /**
   * Path under /public to a hand-curated logo file.
   * If set, this takes precedence over clearbitDomain.
   * Drop the file into `public/affiliations/` and reference like
   *   `/affiliations/mbzuai.svg`
   */
  logo?: string;
}

export const AFFILIATIONS: Affiliation[] = [
  {
    name: 'AI Safety Camp',
    url: 'https://www.aisafety.camp',
    clearbitDomain: 'aisafety.camp',
  },
  {
    name: 'MBZUAI',
    url: 'https://mbzuai.ac.ae',
    clearbitDomain: 'mbzuai.ac.ae',
  },
  {
    name: 'Algoverse',
    url: 'https://algoverseair.com',
    clearbitDomain: 'algoverseair.com',
  },
  {
    name: 'SPAR',
    url: 'https://sparai.org',
    clearbitDomain: 'sparai.org',
  },
  {
    name: 'Meridian Cambridge',
    url: 'https://www.meridiancambridge.org',
    clearbitDomain: 'meridiancambridge.org',
  },
  {
    name: 'Lossfunk',
    url: 'https://lossfunk.com',
    clearbitDomain: 'lossfunk.com',
  },
];
