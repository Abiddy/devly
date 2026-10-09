import { createJsonStore } from '@/lib/json-store';

export type HoursRow = { days: string; time: string };
export type CateringPackage = { name: string; includes: string; price: string };
export type Faq = { question: string; answer: string };

export type BusinessInfo = {
  basics: {
    businessName: string;
    phone: string;
    email: string;
    address: string;
    city: string;
    hours: HoursRow[];
    holidayHours: string;
    socials: {
      instagram: string;
      facebook: string;
      tiktok: string;
      x: string;
      yelp: string;
    };
  };
  services: {
    catering: {
      offered: boolean;
      description: string;
      minimum: string;
      notice: string;
      howToBook: string;
      packages: CateringPackage[];
    };
    events: { offered: boolean; details: string };
    giftCards: { offered: boolean; details: string };
  };
  chatbot: {
    dietary: string;
    parking: string;
    guestNotes: string;
    faqs: Faq[];
  };
};

export type BusinessInfoRecord = {
  site: string;
  info: BusinessInfo;
  updatedAt: string | null;
  updatedBy: string | null;
};

export function emptyBusinessInfo(): BusinessInfo {
  return {
    basics: {
      businessName: '',
      phone: '',
      email: '',
      address: '',
      city: '',
      hours: [],
      holidayHours: '',
      socials: { instagram: '', facebook: '', tiktok: '', x: '', yelp: '' },
    },
    services: {
      catering: { offered: false, description: '', minimum: '', notice: '', howToBook: '', packages: [] },
      events: { offered: false, details: '' },
      giftCards: { offered: false, details: '' },
    },
    chatbot: { dietary: '', parking: '', guestNotes: '', faqs: [] },
  };
}

const SHORT = 200;
const LONG = 2000;

function text(value: unknown, max: number): string {
  return typeof value === 'string' ? value.trim().slice(0, max) : '';
}

function flag(value: unknown): boolean {
  return value === true;
}

function obj(value: unknown): Record<string, unknown> {
  return value && typeof value === 'object' && !Array.isArray(value) ? (value as Record<string, unknown>) : {};
}

function list<T>(value: unknown, max: number, map: (item: Record<string, unknown>) => T, keep: (item: T) => boolean): T[] {
  return (Array.isArray(value) ? value : []).slice(0, max).map((item) => map(obj(item))).filter(keep);
}

/** Coerces untrusted input into a valid BusinessInfo, dropping anything unexpected. */
export function sanitizeBusinessInfo(input: unknown): BusinessInfo {
  const root = obj(input);
  const basics = obj(root.basics);
  const socials = obj(basics.socials);
  const services = obj(root.services);
  const catering = obj(services.catering);
  const events = obj(services.events);
  const giftCards = obj(services.giftCards);
  const chatbot = obj(root.chatbot);

  return {
    basics: {
      businessName: text(basics.businessName, SHORT),
      phone: text(basics.phone, 40),
      email: text(basics.email, 254),
      address: text(basics.address, SHORT),
      city: text(basics.city, SHORT),
      hours: list(
        basics.hours,
        14,
        (row) => ({ days: text(row.days, 60), time: text(row.time, 80) }),
        (row) => Boolean(row.days || row.time),
      ),
      holidayHours: text(basics.holidayHours, LONG),
      socials: {
        instagram: text(socials.instagram, SHORT),
        facebook: text(socials.facebook, SHORT),
        tiktok: text(socials.tiktok, SHORT),
        x: text(socials.x, SHORT),
        yelp: text(socials.yelp, SHORT),
      },
    },
    services: {
      catering: {
        offered: flag(catering.offered),
        description: text(catering.description, LONG),
        minimum: text(catering.minimum, SHORT),
        notice: text(catering.notice, SHORT),
        howToBook: text(catering.howToBook, SHORT),
        packages: list(
          catering.packages,
          20,
          (pkg) => ({ name: text(pkg.name, 120), includes: text(pkg.includes, LONG), price: text(pkg.price, 60) }),
          (pkg) => Boolean(pkg.name || pkg.includes),
        ),
      },
      events: { offered: flag(events.offered), details: text(events.details, LONG) },
      giftCards: { offered: flag(giftCards.offered), details: text(giftCards.details, LONG) },
    },
    chatbot: {
      dietary: text(chatbot.dietary, LONG),
      parking: text(chatbot.parking, LONG),
      guestNotes: text(chatbot.guestNotes, LONG),
      faqs: list(
        chatbot.faqs,
        50,
        (faq) => ({ question: text(faq.question, 300), answer: text(faq.answer, LONG) }),
        (faq) => Boolean(faq.question && faq.answer),
      ),
    },
  };
}

const store = createJsonStore<{ sites: Record<string, BusinessInfoRecord> }>('business-info.json', () => ({
  sites: {},
}));

export async function getBusinessInfo(site: string): Promise<BusinessInfoRecord> {
  const record = (await store.read()).sites[site];
  return record
    ? { ...record, info: sanitizeBusinessInfo(record.info) }
    : { site, info: emptyBusinessInfo(), updatedAt: null, updatedBy: null };
}

export function saveBusinessInfo(site: string, info: BusinessInfo, updatedBy: string): Promise<BusinessInfoRecord> {
  return store.update((data) => {
    const record: BusinessInfoRecord = { site, info, updatedAt: new Date().toISOString(), updatedBy };
    data.sites[site] = record;
    return record;
  });
}
