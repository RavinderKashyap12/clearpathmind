export interface General {
  companyName: string;
  logo: string;
  city: string;
  state: string;
  address: string;
  phoneNumber: string;
  phoneNumber2?: string;
  email: string;
  analytics: {
    gtmId: string;
  };
  footer: {
    description: string;
    navColumn1: {
      links: {
        text: string;
        url: string;
      }[];
    };
    navColumn2: {
      links: {
        text: string;
        url: string;
      }[];
    };
    emailPlaceholder: string;
    signUpButtonText: string;
    copyrightText: string;
    backToTopText: string;
  };
}
