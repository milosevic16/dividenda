type Service = { title: string; description: string; icon: 'house' | 'key' | 'document' | 'value' };
type Portal = { name: string; label: string; description: string; href: string };

export const company = {
  name: 'Dividenda', legalName: 'Dividenda d.o.o.',
  phone: '051 848 241', phoneHref: 'tel:+38651848241',
  email: 'info@dividenda.com', address: 'Orešje 43', city: '2250 Ptuj', country: 'Slovenija',
  agent: 'Igor Jakolič', license: '2802', registry: '0283102802',
  mapHref: 'https://www.google.com/maps/search/?api=1&query=Ore%C5%A1je+43%2C+2250+Ptuj%2C+Slovenija'
};

export const content = {
  notFound: { title: 'Strani ni mogoče najti — Dividenda', heading: 'Ta naslov ne obstaja.', description: 'Vrnite se na našo domačo stran.', link: 'Na domačo stran' },
  meta: {
    title: 'Dividenda — Nepremičninsko posredovanje, Ptuj',
    description: 'Dividenda, nepremičninsko posredovanje na Ptuju. Prodaja, nakup, menjava, najem in oddaja nepremičnin, prodajne pogodbe ter ocena tržne vrednosti.'
  },
  skip: 'Preskoči na vsebino',
  navigation: [
    { label: 'Storitve', href: '#storitve' },
    { label: 'Ponudba', href: '#ponudba' },
    { label: 'O nas', href: '#o-nas' }
  ],
  header: { tagline: 'Nepremičninsko posredovanje', location: 'Ptuj, Slovenija', contact: 'Stopimo v stik', menu: 'Meni', close: 'Zapri meni' },
  hero: {
    eyebrow: 'NEPREMIČNINSKO POSREDOVANJE',
    lines: ['Prodaja, nakup', 'in najem'], lastLine: 'nepremičnin.',
    description: 'Dividenda d.o.o. · Orešje 43, 2250 Ptuj.',
    primary: 'Pogovorimo se', secondary: 'Raziščite naše storitve',
    imageAlt: 'Staro mestno jedro Ptuja s Ptujskim gradom in odsevom v Dravi.',
    caption: 'Ptuj, Slovenija.', captionSmall: 'Orešje 43 · 2250 Ptuj',
    imageLocation: 'PTUJ · POGLED Z DRAVE',
    footnote: 'Nepremičninski posrednik: Igor Jakolič.', scroll: 'Naše storitve'
  },
  services: {
    eyebrow: 'STORITVE',
    heading: 'Nepremičninsko', italic: 'posredovanje.',
    intro: 'Prodaja, nakup, menjava, najem in oddaja nepremičnin.',
    link: 'Kontakt',
    items: [
      { title: 'Prodaja, nakup in menjava', description: 'Posredovanje pri prodaji, nakupu in menjavi nepremičnin.', icon: 'house' },
      { title: 'Najem in oddaja', description: 'Posredovanje pri najemu in oddaji nepremičnin.', icon: 'key' },
      { title: 'Prodajne pogodbe', description: 'Sestava in izvedba prodajne pogodbe.', icon: 'document' },
      { title: 'Ocena tržne vrednosti', description: 'Ocena tržne vrednosti nepremičnine.', icon: 'value' }
    ] satisfies Service[]
  },
  listings: {
    eyebrow: 'AKTUALNA PONUDBA',
    intro: 'Oglasi na nepremičninskih portalih.',
    portals: [
      { name: 'bolha.com', label: 'Naši oglasi', description: 'Oglasi Dividende.', href: 'https://www.bolha.com/trgovina/zanesljiv007?category=nepremicnine%2F' },
      { name: 'nepremicnine.net', label: 'Nepremičninski portal', description: 'Nepremičninski oglasi.', href: 'https://www.nepremicnine.net/' }
    ] satisfies Portal[],
    direct: '', directLink: 'Kontakt'
  },
  about: {
    eyebrow: '17 LET IZKUŠENJ',
    heading: 'Znanje in izkušnje.', italic: 'Dividenda d.o.o.',
    intro: 'Igor Jakolič, nepremičninski posrednik in investicijski svetovalec.',
    text: 'Licenca št. 2802. Vpis v imenik nepremičninskih posrednikov št. 0283102802.',
    agentRole: 'Nepremičninski posrednik', licenseLabel: 'Licenca št.', registryLabel: 'Vpis v imenik',
    quote: 'Znanje in izkušnje so naša konkurenčna prednost.',
    contact: 'Kontakt'
  },
  contact: {
    eyebrow: 'OREŠJE 43 · PTUJ', heading: 'Kontakt', italic: 'Dividenda.',
    intro: 'Informacije po telefonu, e-pošti ali v pisarni.',
    phone: 'Pokličite nas', email: 'Pišite nam', visit: 'Obiščite nas', map: 'Pot do nas',
    availability: 'Vsak delovni dan oziroma po dogovoru.'
  },
  footer: {
    tagline: 'Nepremičninsko posredovanje · Ptuj', rights: 'Vse pravice pridržane.',
    privacy: 'Zasebnost', credits: 'Fotografija', back: 'Na vrh',
    privacyTitle: 'Zasebnost na tej spletni strani',
    privacyText: 'Ta spletna stran ne uporablja analitičnih ali oglaševalskih piškotkov in ne vsebuje kontaktnega obrazca. S klikom na e-poštni naslov ali telefonsko številko odprete svojo aplikacijo. Povezave na zunanje portale in zemljevide vodijo na strani z lastnimi pravili zasebnosti.',
    privacyContact: 'Za vprašanja glede osebnih podatkov nam pišite na',
    creditsTitle: 'O fotografiji',
    creditsText: 'Ptuj in Drava — Jernej Furman, Wikimedia Commons. Fotografija je pomanjšana in obrezana za prikaz.',
    creditsSource: 'Izvirna fotografija', license: 'Licenca CC BY 2.0', close: 'Zapri'
  }
};

export const photo = {
  author: 'Jernej Furman',
  source: 'https://commons.wikimedia.org/wiki/File:Ptuj_town_in_Slovenia_oldest_city_in_Slovenia._Panoramic_view_over_Old_Town_and_castle_with_a_reflection_in_Drava_River_(52699587092).jpg',
  license: 'https://creativecommons.org/licenses/by/2.0/'
};
