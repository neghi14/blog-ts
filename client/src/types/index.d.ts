export type NavItem = {
  title: string;
  href: string;
  disabled?: boolean;
};

export type MainNav = NavItem;

export type SiteConfig = {
  name: string;
  description: string;
  url: string;
  ogImage: string;
  links: {
    twitter: string;
    github: string;
  };
};

export type authState = {
  loading: boolean;
  logged_in: boolean;
  user: any;
  refresh_token: string;
  session_token: string;
  error: any;
  success: boolean;
};
