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
    title: 'Dividenda — Nepremičnine. Znanje. Zaupanje.',
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
    eyebrow: 'NEPREMIČNINE. ZNANJE. ZAUPANJE.',
    lines: ['Prostor za', 'vaše naslednje'], lastLine: 'poglavje.',
    description: 'Za vsako nepremičnino je zgodba. Pomagamo vam, da svojo nadaljujete s pravo odločitvijo.',
    primary: 'Pogovorimo se', secondary: 'Raziščite naše storitve',
    imageAlt: 'Staro mestno jedro Ptuja s Ptujskim gradom in odsevom v Dravi.',
    caption: 'Doma na Ptuju.', captionSmall: 'Blizu vam in vašim načrtom.',
    imageLocation: 'PTUJ · POGLED Z DRAVE',
    footnote: 'Osebni pristop. Od prvega pogovora naprej.', scroll: 'Spoznajte Dividendo'
  },
  services: {
    eyebrow: 'KAJ LAHKO NAREDIMO ZA VAS',
    heading: 'Prava podpora.', italic: 'Na vsakem koraku.',
    intro: 'Prodajate, kupujete ali oddajate? Obrnite se na nas za pomoč pri vaši nepremičninski odločitvi.',
    link: 'Povejte nam, kaj načrtujete',
    items: [
      { title: 'Prodaja, nakup in menjava', description: 'Nepremičninsko posredovanje pri prodaji, nakupu ali menjavi vaše nepremičnine.', icon: 'house' },
      { title: 'Najem in oddaja', description: 'Pomoč pri iskanju nepremičnine za najem ali pri oddaji vaše nepremičnine.', icon: 'key' },
      { title: 'Prodajne pogodbe', description: 'Sestava in izvedba prodajne pogodbe kot del urejenega nepremičninskega posla.', icon: 'document' },
      { title: 'Ocena tržne vrednosti', description: 'Ocena tržne vrednosti nepremičnine za lažjo odločitev o naslednjem koraku.', icon: 'value' }
    ] satisfies Service[]
  },
  listings: {
    eyebrow: 'AKTUALNA PONUDBA',
    heading: 'Morda vas naslednji', italic: 'naslov že čaka.',
    intro: 'Ponudbo nepremičnin si oglejte na nepremičninskih portalih ali nas pokličite in nam zaupajte svoje želje.',
    portals: [
      { name: 'bolha.com', label: 'Naši oglasi', description: 'Obiščite našo trgovino na portalu Bolha.', href: 'https://www.bolha.com/trgovina/zanesljiv007?category=nepremicnine%2F' },
      { name: 'nepremicnine.net', label: 'Nepremičninski portal', description: 'Raziščite nepremičninsko ponudbo na portalu.', href: 'https://www.nepremicnine.net/' }
    ] satisfies Portal[],
    direct: 'Iščete nekaj določenega?', directLink: 'Pogovorite se z nami'
  },
  about: {
    eyebrow: 'SPOZNAJTE DIVIDENDO',
    heading: 'Znanje in izkušnje.', italic: 'Človek na vaši strani.',
    intro: 'Nepremičnina je več kot naslov. Je pomembna odločitev, pri kateri štejeta strokovno znanje in oseben pogovor.',
    text: 'Vaš sogovornik je Igor Jakolič, nepremičninski posrednik z licenco št. 2802 in investicijski svetovalec. Za podrobnejše informacije je na voljo po telefonu in v pisarni na Ptuju.',
    agentRole: 'Nepremičninski posrednik', licenseLabel: 'Licenca št.', registryLabel: 'Vpis v imenik',
    quote: 'Znanje in izkušnje so naša konkurenčna prednost.',
    visit: 'Dobrodošli na pogovoru.', availability: 'Vsak delovni dan oziroma po dogovoru.',
    contact: 'Spoznajmo se'
  },
  contact: {
    eyebrow: 'VAŠ NASLEDNJI KORAK', heading: 'Začnimo', italic: 's pogovorom.',
    intro: 'Povejte nam, kaj iščete ali kaj želite spremeniti. Z veseljem se pogovorimo o vaši nepremičnini.',
    phone: 'Pokličite nas', email: 'Pišite nam', visit: 'Obiščite nas', map: 'Pot do nas',
    availability: 'Vsak delovni dan oziroma po dogovoru.'
  },
  footer: {
    tagline: 'Nepremičnine. Znanje. Zaupanje.', rights: 'Vse pravice pridržane.',
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
