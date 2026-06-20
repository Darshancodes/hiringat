export type Role = {
  id: string;
  title: string;
  location: string;
  workplace: string;
  employment: string;
  description: string;
  questions: string[];
};

export type Company = {
  slug: string;
  name: string;
  logoUrl?: string;
  tagline: string;
  roles: Role[];
};

export type Application = {
  id: string;
  companySlug: string;
  roleId: string;
  roleTitle: string;
  name: string;
  email: string;
  answers: { question: string; answer: string }[];
  createdAt: string;
};

export type Store = { companies: Company[]; applications: Application[] };
