import { defineCollection, z } from "astro:content";

const blogCollection = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string(),
    featuredImg: z.string(),
    date: z.date(),
    author: z.string(),
    tags: z.array(z.string()),
    readingTime: z.string().optional(),
  }),
});

const generalCollection = {
  type: "data",
  schema: z.object({
    companyName: z.string(),
    logo: z.string(),
    city: z.string(),
    state: z.string(),
    address: z.string(),
    phoneNumber: z.string(),
    phoneNumber2: z.string().optional(),
    Email: z.string(),
    analytics: z.object({
      gtmId: z.string(),
    }),
    footer: z.object({
      description: z.string(),
      navColumn1: z.object({
        links: z.array(
          z.object({
            text: z.string(),
            url: z.string(),
          })
        ),
      }),
      navColumn2: z.object({
        links: z.array(
          z.object({
            text: z.string(),
            url: z.string(),
          })
        ),
      }),
      emailPlaceholder: z.string(),
      signUpButtonText: z.string(),
      copyrightText: z.string(),
      backToTopText: z.string(),
    }),
  }),
};

const aboutCollection = defineCollection({
  type: "data",
  schema: z.object({
    seo: z
      .object({
        metaTitle: z.string(),
        metaDescription: z.string(),
        keywords: z.array(z.string()).optional(),
      })
      .optional(),
    hero: z.object({
      heading: z.string(),
      text: z.string(),
    }),
    about: z.object({
      headingOne: z.string(),
      textOne: z.string(),
      headingTwo: z.string(),
      textTwo: z.string(),
      images: z.object({
        imageOne: z.string(),
        imageTwo: z.string(),
      }),
    }),
    coreValues: z.object({
      heading: z.string(),
      text: z.string(),
      list: z.array(
        z.object({
          title: z.string(),
          description: z.string(),
        })
      ),
      buttonText: z.string(),
    }),
    facility: z.object({
      heading: z.string(),
      text: z.string(),
      buttonText: z.string(),
      images: z.object({
        imageOne: z.string(),
        imageTwo: z.string(),
      }),
    }),
    approach: z.object({
      headingOne: z.string(),
      textOne: z.string(),
      headingTwo: z.string(),
      textTwo: z.string(),
      images: z.object({
        imageOne: z.string(),
        imageTwo: z.string(),
      }),
    }),
    team: z.object({
      heading: z.string(),
      buttonText: z.string(),
      description: z.string(),
      team: z.array(
        z.object({
          name: z.string(),
          designation: z.string(),
          image: z.string(),
        })
      ),
    }),
    faq: z.object({
      heading: z.string(),
      subheading: z.string(),
      faq: z.array(
        z.object({
          title: z.string(),
          details: z.string(),
        })
      ),
    }),
  }),
});

const contactCollection = {
  type: "data",
  schema: z.object({
    seo: z
      .object({
        metaTitle: z.string(),
        metaDescription: z.string(),
        keywords: z.array(z.string()).optional(),
      })
      .optional(),
    hero: z.object({
      heading: z.string(),
      text: z.string(),
      buttonText: z.string(),
      buttonLink: z.string(),
      phoneQuestionText: z.string(),
      treatmentsLabel: z.string(),
      callButtonText: z.string(),
      callButtonLink: z.string(),
      navItems: z.array(
        z.object({
          text: z.string(),
          url: z.string(),
          hasDropdown: z.boolean().default(false),
          sublinks: z
            .array(
              z.object({
                text: z.string(),
                link: z.string(),
              })
            )
            .optional(),
          sublinks2: z
            .array(
              z.object({
                text: z.string(),
                link: z.string(),
              })
            )
            .optional(),
        })
      ),
    }),

    contactDetails: z.object({
      address: z.string(),
      email: z.string(),
      phone: z.string(),
      formHeading: z.string(),
      emergencyHeading: z.string(),
      emergencyText: z.string(),
      supportHeading: z.string(),
      businessHours: z.object({
        heading: z.string(),
        hours: z.string(),
        weekend: z.string(),
      }),
    }),
  }),
};

const homeCollection = {
  type: "data",
  schema: z.object({
    seo: z
      .object({
        metaTitle: z.string(),
        metaDescription: z.string(),
        keywords: z.array(z.string()).optional(),
      })
      .optional(),
    hero: z.object({
      backgroundImage: z.string(),
      backgroundImageAlt: z.string(),
      logo: z.string(),
      buttonText: z.string(),
      textBox1: z.string(),
      textBox2_Part_1: z.string(),
      textBox2_Part_2: z.string(),
      textBox2_Part_3: z.string(),
      textBox3: z.string(),
      buttonOne: z.string(),
      buttonOneLink: z.string(),
      buttonTwo: z.string(),
      telephoneNumber: z.string(),
      heroLinks: z.array(
        z.object({
          text: z.string(),
          link: z.string(),
          sublinks: z
            .array(
              z.object({
                text: z.string(),
                link: z.string(),
              })
            )
            .optional(),
          sublinks2: z
            .array(
              z.object({
                text: z.string(),
                link: z.string(),
              })
            )
            .optional(),
        })
      ),
    }),
    about: z.object({
      headingOne_Part_1: z.string(),
      headingOne_Part_2: z.string(),
      headingTwo: z.string(),
      textOne: z.string(),
      buttonOne: z.string(),
      buttonTwo_Part_1: z.string(),
      buttonTwo_Part_2: z.string(),
      buttonTwo_Number: z.string(),
    }),
    singleTestimonial: z.object({
      cardDetail: z.string(),
      cardTitle: z.string(),
    }),
    therapies: z.object({
      heading: z.string(),
      text: z.string(),
      buttonText: z.string(),
      buttonLink: z.string(),
      buttonTwo_Part_1: z.string(),
      buttonTwo_Part_2: z.string(),
      buttonTwo_Number: z.string(),
      list: z.array(
        z.object({
          title: z.string(),
          description: z.string(),
          link: z.string().optional(), // Added link field with optional to maintain backward compatibility
        })
      ),
    }),

    programs: z.object({
      heading: z.string(),
      text: z.string(),
      programs: z.array(
        z.object({
          title: z.string(),

          image: z.string(),
          link: z.string(),
        })
      ),
    }),
    services: z.object({
      heading: z.string(),
      description: z.string(),
      services: z.array(
        z.object({
          iconName: z.string(),
          title: z.string(),
          description: z.string(),
        })
      ),
    }),
    disorders: z.object({
      heading: z.string(),
      description: z.string(),
      disorders: z.array(
        z.object({
          iconName: z.string(),
          title: z.string(),
        })
      ),
    }),
    faq: z.object({
      heading: z.string(),
      subheading: z.string(),
      faq: z.array(
        z.object({
          title: z.string(),
          details: z.string(),
        })
      ),
    }),
    insuranceOptions: z.object({
      heading: z.string(),
      description: z.string(),
      buttonOneText: z.string(),
      buttonOneLink: z.string(),
      buttonTwoTextOne: z.string(),
      buttonTwoTextTwo: z.string(),
      buttonTwoLink: z.string(),

      insuranceOptions: z.array(
        z.object({
          logo: z.string(),
        })
      ),
    }),
    cta: z.object({
      heading: z.string(),
      text: z.string(),
      buttonText: z.string(),
      buttoneLink: z.string(),
      image: z.string(),
      altText: z.string(),
      phoneTextOne: z.string(),
      phoneTextTwo: z.string(),
      phoneNumber: z.string(),
    }),
  }),
};

const admissionsCollection = defineCollection({
  type: "data",
  schema: z.object({
    hero: z.object({
      heading: z.string(),
      text: z.string(),
      videoLink: z.string(),
      video: z.object({
        img: z.string(),
        videoSrc: z.string(),
      }),
    }),
    cta: z.object({
      heading: z.string(),
      text: z.string(),
      buttonText: z.string(),
    }),
    steps: z.array(
      z.object({
        name: z.string(),
        title: z.string(),
        text: z.string(),
        icon: z.string(),
        modalText: z.string(),
      })
    ),
    nextSteps: z.object({
      heading: z.string(),
      description: z.string(),
      nextSteps: z.array(
        z.object({
          title: z.string(),
          linkOne: z.string(),
          linkOneUrl: z.string(),
          linkTwo: z.string(),
          linkTwoUrl: z.string(),
        })
      ),
    }),
    pdf: z.object({
      heading: z.string(),
      description: z.string(),
      pdf: z.object({
        link: z.string(),
        linkUrl: z.string(),
      }),
    }),
    faq: z.object({
      heading: z.string(),
      subheading: z.string(),
      faq: z.array(
        z.object({
          title: z.string(),
          details: z.string(),
        })
      ),
    }),
  }),
});

const programCollection = {
  type: "data",
  schema: z.object({
    seo: z
      .object({
        metaTitle: z.string(),
        metaDescription: z.string(),
        keywords: z.array(z.string()).optional(),
      })
      .optional(),
    hero: z.object({
      heading: z.string(),
      text: z.string(),
      buttonText: z.string(),
      buttonLink: z.string(),
      phoneQuestionText: z.string(),
      treatmentsLabel: z.string(),
      callButtonText: z.string(),
      callButtonLink: z.string(),
      navItems: z.array(
        z.object({
          text: z.string(),
          url: z.string(),
          sublinks: z
            .array(
              z.object({
                text: z.string(),
                link: z.string(),
              })
            )
            .optional(),
          sublinks2: z
            .array(
              z.object({
                text: z.string(),
                link: z.string(),
              })
            )
            .optional(),
        })
      ),
    }),
    about: z.object({
      headingOne: z.string(),
      headingTwo: z.string(),
      textOne: z.string(),
      textTwo: z.string(),
      buttonText: z.string(),
      buttonLink: z.string(),
      buttonTwo_Part_1: z.string(),
      buttonTwo_Part_2: z.string(),
      buttonTwo_Number: z.string(),
      images: z.object({
        imageOne: z.string(),
        imageTwo: z.string(),
      }),
    }),

    team: z.object({
      heading: z.string(),
      description: z.string(),
      team: z.array(
        z.object({
          name: z.string(),
          designation: z.string(),
          image: z.string(),
        })
      ),
    }),
    nextSteps: z.object({
      heading: z.string(),
      description: z.string(),
      nextSteps: z.array(
        z.object({
          title: z.string(),
          linkOne: z.string(),
          linkOneUrl: z.string(),
          linkTwo: z.string(),
          linkTwoUrl: z.string(),
        })
      ),
    }),
    singleReview: z.object({
      heading: z.string(),
      description: z.string(),
      buttonText: z.string(),
      cardDetail: z.string(),
      cardTitle: z.string(),
    }),
    pdf: z.object({
      heading: z.string(),
      description: z.string(),
      pdf: z.object({
        link: z.string(),
        linkUrl: z.string(),
      }),
    }),
    howWeTreat: z.object({
      heading: z.string(),
      description: z.string(),
      process: z.array(
        z.object({
          title: z.string(),
          details: z.string(),
        })
      ),
    }),
    residentialRehab: z.object({
      img: z.string(),
      heading: z.string(),
      description: z.string(),
      cardTitle: z.string(),
      process: z.array(
        z.object({
          title: z.string(),
          details: z.string(),
        })
      ),
    }),
    therapies: z.object({
      heading: z.string(),
      description: z.string(),
      buttonText: z.string(),
      buttonLink: z.string(),
      buttonTwo_Part_1: z.string(),
      buttonTwo_Part_2: z.string(),
      buttonTwo_Number: z.string(),
      list: z.array(
        z.object({
          title: z.string(),
          description: z.string(),
          link: z.string().optional(), // Added link field with optional to maintain backward compatibility
        })
      ),
    }),
    amenities: z.object({
      img: z.string(),
      heading: z.string(),
      description: z.string(),
    }),
    faq: z.object({
      heading: z.string(),
      subheading: z.string(),
      faq: z.array(
        z.object({
          title: z.string(),
          details: z.string(),
        })
      ),
    }),
    otherTreatments: z.object({
      heading: z.string(),
      buttonText: z.string(),
      buttonUrl: z.string(),
      cards: z.array(
        z.object({
          title: z.string(),
          buttonText: z.string(),
          image: z.string(),
        })
      ),
    }),
    video: z.object({
      heading: z.string(),
      headingColored: z.string(),
      description: z.string(),
      image: z.string(),
      imageAlt: z.string(),
    }),
    treatmentGrid: z.object({
      heading: z.string(),
      subheading: z.string(),
      description: z.string(),
      featuredImage: z.string(),
      treatments: z.array(
        z.object({
          icon: z.string(),
          title: z.string(),
          description: z.string(),
          link: z.string().optional(),
        })
      ),
    }),
    whyChoose: z.object({
      title: z.string(),
      titleTwo: z.string(),
      content: z.object({
        paragraph1: z.string(),
        paragraph2: z.string().optional(),
      }),
      imageUrl: z.string(),
      imageAlt: z.string(),
      buttonText: z.string(),
      buttonLink: z.string(),
      buttonTwo_Part_1: z.string(),
      buttonTwo_Part_2: z.string(),
      buttonTwo_Number: z.string(),
    }),
    secondWhyChoose: z.object({
      title: z.string(),
      content: z.object({
        paragraph1: z.string(),
        paragraph2: z.string().optional(),
      }),
      imageUrl: z.string(),
      imageAlt: z.string(),
      buttonText: z.string(),
      buttonLink: z.string(),
      buttonTwo_Part_1: z.string(),
      buttonTwo_Part_2: z.string(),
      buttonTwo_Number: z.string(),
    }),
    whoNeeds: z.object({
      heading: z.string(),
      headingColored: z.string(),
      headingEnd: z.string(),
      description: z.string(),
      listHeading: z.string(),
      listItems: z.array(z.string()),
      listDescription: z.string(),
      buttonText: z.string(),
      buttonLink: z.string(),
      buttonTwo_Part_1: z.string(),
      buttonTwo_Part_2: z.string(),
      buttonTwo_Number: z.string(),
    }),
    program12: z.object({
      badgeText: z.string(),
      heading: z.string(),
      description: z.string(),
      mainImage: z.string(),
      mainImageAlt: z.string(),
      steps: z.array(
        z.object({
          stepNumber: z.string(),
          title: z.string(),
        })
      ),
    }),
    cta: z.object({
      heading: z.string(),
      text: z.string(),
      buttonText: z.string(),
      buttoneLink: z.string(),
      image: z.string(),
      altText: z.string(),
      phoneTextOne: z.string(),
      phoneTextTwo: z.string(),
      phoneNumber: z.string(),
    }),
    programTMS: z.object({
      mainHeading: z.string(),
      coloredHeading: z.string(),
      description: z.string(),
      buttonText: z.string(),
      buttonLink: z.string(),
      buttonTwo_Part_1: z.string(),
      buttonTwo_Part_2: z.string(),
      buttonTwo_Number: z.string(),
      image: z.string(),
      imageAlt: z.string(),
      conditions: z.array(
        z.object({
          title: z.string(),
          icon: z.string(),
          description: z.string(),
        })
      ),
    }),
  }),
};

export const programarchiveCollection = {
  type: "data",
  schema: z.object({
    hero: z.object({
      heading: z.string(),
      text: z.string(),
    }),
    about: z.object({
      headingOne: z.string(),
      textOne: z.string(),
      headingTwo: z.string(),
      textTwo: z.string(),
      images: z.object({
        imageOne: z.string(),
        imageTwo: z.string(),
      }),
    }),
    cta: z.object({
      heading: z.string(),
      text: z.string(),
      buttonText: z.string(),
    }),
    footerCta: z.object({
      heading: z.string(),
      text: z.string(),
      buttonText: z.string(),
    }),
    coreValues: z.object({
      heading: z.string(),
      text: z.string(),
      list: z.array(
        z.object({
          title: z.string(),
          description: z.string(),
        })
      ),
      buttonText: z.string(),
    }),
    programs: z.object({
      heading: z.string(),
      text: z.string(),
      programs: z.array(
        z.object({
          title: z.string(),
          description: z.string(),
          image: z.string(),
        })
      ),
    }),
    facility: z.object({
      heading: z.string(),
      text: z.string(),
      buttonText: z.string(),
      images: z.object({
        imageOne: z.string(),
        imageTwo: z.string(),
      }),
    }),
    approach: z.object({
      headingOne: z.string(),
      textOne: z.string(),
      headingTwo: z.string(),
      textTwo: z.string(),
      images: z.object({
        imageOne: z.string(),
        imageTwo: z.string(),
      }),
    }),
    faq: z.object({
      heading: z.string(),
      subheading: z.string(),
      faq: z.array(
        z.object({
          title: z.string(),
          details: z.string(),
        })
      ),
    }),
  }),
};

export const teamCollection = {
  type: "data",
  schema: z.object({
    hero: z.object({
      heading: z.string(),
      text: z.string(),
    }),
    cta: z.object({
      heading: z.string(),
      text: z.string(),
      buttonText: z.string(),
    }),
    team: z.object({
      heading: z.string(),
      buttonText: z.string(),
      description: z.string(),
      team: z.array(
        z.object({
          name: z.string(),
          designation: z.string(),
          image: z.string(),
        })
      ),
    }),
    faq: z.object({
      heading: z.string(),
      subheading: z.string(),
      faq: z.array(
        z.object({
          title: z.string(),
          details: z.string(),
        })
      ),
    }),
  }),
};

const treatmentarchiveCollection = {
  type: "data",
  schema: z.object({
    hero: z.object({
      heading: z.string(),
      text: z.string(),
    }),
    about: z.object({
      headingOne: z.string(),
      textOne: z.string(),
      headingTwo: z.string(),
      textTwo: z.string(),
      images: z.object({
        imageOne: z.string(),
        imageTwo: z.string(),
      }),
    }),
    cta: z.object({
      heading: z.string(),
      text: z.string(),
      buttonText: z.string(),
    }),
    footerCta: z.object({
      heading: z.string(),
      text: z.string(),
      buttonText: z.string(),
    }),
    coreValues: z.object({
      heading: z.string(),
      text: z.string(),
      list: z.array(
        z.object({
          title: z.string(),
          description: z.string(),
        })
      ),
      buttonText: z.string(),
    }),
    programs: z.object({
      heading: z.string(),
      text: z.string(),
      programs: z.array(
        z.object({
          title: z.string(),
          description: z.string(),
          image: z.string(),
        })
      ),
    }),
    facility: z.object({
      heading: z.string(),
      text: z.string(),
      buttonText: z.string(),
      images: z.object({
        imageOne: z.string(),
        imageTwo: z.string(),
      }),
    }),
    approach: z.object({
      headingOne: z.string(),
      textOne: z.string(),
      headingTwo: z.string(),
      textTwo: z.string(),
      images: z.object({
        imageOne: z.string(),
        imageTwo: z.string(),
      }),
    }),
    disorders: z.object({
      heading: z.string(),
      description: z.string(),
      disorders: z.array(
        z.object({
          iconName: z.string(),
          title: z.string(),
        })
      ),
    }),
    faq: z.object({
      heading: z.string(),
      subheading: z.string(),
      faq: z.array(
        z.object({
          title: z.string(),
          details: z.string(),
        })
      ),
    }),
  }),
};

const blogpageCollection = {
  type: "data",
  schema: z.object({
    seo: z
      .object({
        metaTitle: z.string(),
        metaDescription: z.string(),
        keywords: z.array(z.string()).optional(),
      })
      .optional(),
    hero: z.object({
      heading: z.string(),
      text: z.string(),
      buttonText: z.string(),
      buttonLink: z.string(),

      phoneQuestionText: z.string(),
      treatmentsLabel: z.string(),
      callButtonText: z.string(),
      callButtonLink: z.string(),
      navItems: z.array(
        z.object({
          text: z.string(),
          url: z.string(),
          hasDropdown: z.boolean().default(false),
          sublinks: z
            .array(
              z.object({
                text: z.string(),
                link: z.string(),
              })
            )
            .optional(),
          sublinks2: z
            .array(
              z.object({
                text: z.string(),
                link: z.string(),
              })
            )
            .optional(),
        })
      ),
    }),
    disorders: z.object({
      heading: z.string(),
      description: z.string(),
      disorders: z.array(
        z.object({
          iconName: z.string(),
          title: z.string(),
        })
      ),
    }),
    cta: z.object({
      heading: z.string(),
      text: z.string(),
      buttonText: z.string(),
      image: z.string(),
      altText: z.string(),
      phoneText: z.string(),
      phoneNumber: z.string(),
    }),
  }),
};

const insuranceCollection = {
  type: "data",
  schema: z.object({
    seo: z
      .object({
        metaTitle: z.string(),
        metaDescription: z.string(),
        keywords: z.array(z.string()).optional(),
      })
      .optional(),
    hero: z.object({
      heading: z.string(),
      text: z.string(),
      buttonText: z.string(),
      buttonLink: z.string(),

      phoneQuestionText: z.string(),
      treatmentsLabel: z.string(),
      callButtonText: z.string(),
      callButtonLink: z.string(),
      navItems: z.array(
        z.object({
          text: z.string(),
          url: z.string(),
          hasDropdown: z.boolean().default(false),
          sublinks: z
            .array(
              z.object({
                text: z.string(),
                link: z.string(),
              })
            )
            .optional(),
          sublinks2: z
            .array(
              z.object({
                text: z.string(),
                link: z.string(),
              })
            )
            .optional(),
        })
      ),
    }),
    contactHero: z.object({
      title: z.object({
        line1: z.string(),
        line2: z.string(),
        line3: z.string(),
      }),
      description: z.string(),
      bottomDescription: z.string(),
      formTitle: z.string(),
      formSubtitle: z.string(),
      insuranceProviders: z.array(
        z.object({
          name: z.string(),
        })
      ),
      privacyNotice: z.string(),
    }),
    insuranceProviders: z.object({
      heading: z.string(),
      subheading: z.string(),
      buttonText: z.string(),
      buttonLink: z.string(),
      callText: z.string(),
      callTextTwo: z.string(),
      phoneNumber: z.string(),
      footerText: z.string(),
      verifyButtonText: z.string(),
      verifyButtonLink: z.string(),
      providers: z.array(
        z.object({
          name: z.string(),
          description: z.string(),
          logo: z.string(),
        })
      ),
    }),
    insuranceVerification: z.object({
      title: z.object({
        line1: z.string(),
        line2: z.string(),
      }),
      description: z.string(),
      features: z.array(
        z.object({
          text: z.string(),
        })
      ),
      cta: z.object({
        heading: z.string(),
        subheading: z.string(),
        buttonText: z.string(),
        callText: z.string(),
        phoneNumber: z.string(),
      }),
    }),
    testimonials: z.object({
      list: z.array(
        z.object({
          name: z.string(),
          position: z.string(),
          text: z.string(),
          image: z.string(),
        })
      ),
    }),

    cta: z.object({
      heading: z.string(),
      text: z.string(),
      buttonText: z.string(),
      buttoneLink: z.string(),
      image: z.string(),
      altText: z.string(),
      phoneTextOne: z.string(),
      phoneTextTwo: z.string(),
      phoneNumber: z.string(),
    }),
  }),
};

const locationCollection = {
  type: "data",
  schema: z.object({
    seo: z
      .object({
        metaTitle: z.string(),
        metaDescription: z.string(),
        keywords: z.array(z.string()).optional(),
      })
      .optional(),
    hero: z.object({
      heading: z.string(),
      text: z.string(),
      buttonText: z.string(),
      buttonLink: z.string(),
      phoneQuestionText: z.string(),
      treatmentsLabel: z.string(),
      callButtonText: z.string(),
      callButtonLink: z.string(),
      navItems: z.array(
        z.object({
          text: z.string(),
          url: z.string(),
          hasDropdown: z.boolean().default(false),
          sublinks: z
            .array(
              z.object({
                text: z.string(),
                link: z.string(),
              })
            )
            .optional(),
          sublinks2: z
            .array(
              z.object({
                text: z.string(),
                link: z.string(),
              })
            )
            .optional(),
        })
      ),
    }),
    locationHero: z.object({
      header: z.string(),
      subheaderHighlight: z.string(),
      description: z.string(),
      locationInfo: z.object({
        title: z.string(),
        addressLine1: z.string(),
        addressLine2: z.string(),
        email: z.string(),
        phone: z.string(),
        hours: z.string(),
        buttonText: z.string(),
        buttonLink: z.string(),
      }),
    }),
    disorders: z.object({
      heading: z.string(),
      headingTwo_Part_1: z.string(),
      headingTwo_Part_2: z.string(),
      headingTwo_Part_3: z.string(),
      disorders: z.array(
        z.object({
          link: z.string(),
          title: z.string(),
          image: z.string(),
        })
      ),
    }),
    cta: z.object({
      heading: z.string(),
      text: z.string(),
      buttonText: z.string(),
      buttoneLink: z.string(),
      image: z.string(),
      altText: z.string(),
      phoneTextOne: z.string(),
      phoneTextTwo: z.string(),
      phoneNumber: z.string(),
    }),
  }),
};

const treatmentCollection = {
  type: "data",
  schema: z.object({
    seo: z
      .object({
        metaTitle: z.string(),
        metaDescription: z.string(),
        keywords: z.array(z.string()).optional(),
      })
      .optional(),
    hero: z.object({
      heading: z.string(),
      text: z.string(),
      buttonText: z.string(),
      phoneQuestionText: z.string(),
      treatmentsLabel: z.string(),
      callButtonText: z.string(),
      navItems: z.array(
        z.object({
          text: z.string(),
          url: z.string(),
          hasDropdown: z.boolean().default(false),
          sublinks: z
            .array(
              z.object({
                text: z.string(),
                link: z.string(),
              })
            )
            .optional(),
          sublinks2: z
            .array(
              z.object({
                text: z.string(),
                link: z.string(),
              })
            )
            .optional(),
        })
      ),
    }),
    treatmentHero: z.object({
      heading: z.string(),
      tagline: z.string(),
      title: z.string(),
      subtitle: z.string(),
      description: z.string(),
      approaches: z.array(
        z.object({
          id: z.string(),
          title: z.string(),
          description: z.string(),
        })
      ),
    }),
    treatment2: z.object({
      heading: z.string(),
      headingHighlight: z.string(),
      description: z.string(),
      symptoms: z.array(
        z.object({
          icon: z.string(),
          text: z.string(),
        })
      ),
      buttonText: z.string(),
      buttonLink: z.string(),
      phoneTextOne: z.string(),
      phoneTextTwo: z.string(),
      phoneNumber: z.string(),
      image: z.string(),
    }),
    disorders: z.object({
      heading: z.string(),
      headingTwo_Part_1: z.string(),
      headingTwo_Part_2: z.string(),
      headingTwo_Part_3: z.string(),
      disorders: z.array(
        z.object({
          link: z.string(),
          title: z.string(),
          image: z.string(),
        })
      ),
    }),
    cta: z.object({
      heading: z.string(),
      text: z.string(),
      buttonText: z.string(),
      image: z.string(),
      altText: z.string(),
      phoneText: z.string(),
      phoneNumber: z.string(),
    }),
  }),
};

const pricingCollection = {
  type: "data",
  schema: z.object({
    hero: z.object({
      heading: z.string(),
      text: z.string(),
      buttonText: z.string(),
      buttonLink: z.string(),
      phoneQuestionText: z.string(),
      treatmentsLabel: z.string(),
      callButtonText: z.string(),
      callButtonLink: z.string(),
      navItems: z.array(
        z.object({
          text: z.string(),
          url: z.string(),
          sublinks: z
            .array(
              z.object({
                text: z.string(),
                link: z.string(),
              })
            )
            .optional(),
          sublinks2: z
            .array(
              z.object({
                text: z.string(),
                link: z.string(),
              })
            )
            .optional(),
        })
      ),
    }),
    pricingHero: z.object({
      heading: z.string(),
      subheading: z.string(),
      initialConsultation: z.object({
        title: z.string(),
        features: z.array(z.string()),
      }),
      followUpVisits: z.object({
        title: z.string(),
        features: z.array(z.string()),
      }),
      specializedTreatmentsHeading: z.string(),
    }),
    paymentOptions: z.object({
      heading: z.string(),
      options: z.array(z.string()),
      contactText: z.string(),
      image: z.string(),
      imageAlt: z.string(),
    }),
    disorders: z.object({
      heading: z.string(),
      headingTwo_Part_1: z.string(),
      headingTwo_Part_2: z.string(),
      headingTwo_Part_3: z.string(),
      disorders: z.array(
        z.object({
          link: z.string(),
          title: z.string(),
          image: z.string(),
        })
      ),
    }),
    cta: z.object({
      heading: z.string(),
      text: z.string(),
      buttonText: z.string(),
      buttoneLink: z.string(),
      image: z.string(),
      altText: z.string(),
      phoneTextOne: z.string(),
      phoneTextTwo: z.string(),
      phoneNumber: z.string(),
    }),
  }),
};

const locationsCollection = {
  type: "data",
  schema: z.object({
    slug: z.string().optional(),
    title: z.string().optional(),
    hero: z
      .object({
        backgroundImage: z.string().optional(),
        backgroundImageAlt: z.string().optional(),
        logo: z.string().optional(),
        buttonText: z.string().optional(),
        textBox1: z.string().optional(),
        textBox2_Part_1: z.string().optional(),
        textBox2_Part_2: z.string().optional(),
        textBox2_Part_3: z.string().optional(),
        textBox3: z.string().optional(),
        buttonOne: z.string().optional(),
        buttonOneLink: z.string().optional(),
        buttonTwo: z.string().optional(),
        telephoneNumber: z.string().optional(),
        heading: z.string().optional(),
        text: z.string().optional(),
        buttonLink: z.string().optional(),
        phoneQuestionText: z.string().optional(),
        treatmentsLabel: z.string().optional(),
        callButtonText: z.string().optional(),
        callButtonLink: z.string().optional(),
        heroLinks: z.array(
          z.object({
            text: z.string(),
            link: z.string(),
            heading: z.string().optional(),
            sublinks: z
              .array(
                z.object({
                  text: z.string(),
                  link: z.string(),
                })
              )
              .optional(),
            sublinks2: z
              .array(
                z.object({
                  text: z.string(),
                  link: z.string(),
                })
              )
              .optional(),
          })
        ),
      })
      .optional(),
    about: z
      .object({
        headingOne_Part_1: z.string().optional(),
        headingOne_Part_2: z.string().optional(),
        headingTwo: z.string().optional(),
        textOne: z.string().optional(),
        textTwo: z.string().optional(),
        buttonOne: z.string().optional(),
        buttonOneLink: z.string().optional(),
        buttonTwo_Part_1: z.string().optional(),
        buttonTwo_Part_2: z.string().optional(),
        buttonTwo_Number: z.string().optional(),
        headingOne: z.string().optional(),
        buttonText: z.string().optional(),
        buttonLink: z.string().optional(),
        images: z
          .object({
            imageOne: z.string().optional(),
            imageTwo: z.string().optional(),
          })
          .optional(),
      })
      .optional(),
    programs: z
      .object({
        heading: z.string().optional(),
        text: z.string().optional(),
        programs: z
          .array(
            z.object({
              title: z.string().optional(),
              image: z.string().optional(),
              link: z.string().optional(),
            })
          )
          .optional(),
      })
      .optional(),
    insuranceOptions: z
      .object({
        buttonSecondLink: z.string().optional(),
        buttonOneText: z.string().optional(),
        headingOne: z.string().optional(),
        headingTwo: z.string().optional(),
        buttonOneLink: z.string().optional(),
        buttonSecondTextOne: z.string().optional(),
        buttonSecondTextTwo: z.string().optional(),
        description: z.string().optional(),
        insuranceOptions: z
          .array(
            z.object({
              logo: z.string().optional(),
              alt: z.string().optional(),
            })
          )
          .optional(),
      })
      .optional(),
    testimonials: z
      .object({
        list: z
          .array(
            z.object({
              name: z.string().optional(),
              position: z.string().optional(),
              text: z.string().optional(),
              image: z.string().optional(),
            })
          )
          .optional(),
      })
      .optional(),
    therapies: z
      .object({
        mainHeading: z.string().optional(),
        coloredHeading: z.string().optional(),
        description: z.string().optional(),
        buttonTwo_Part_1: z.string().optional(),
        buttonTwo_Part_2: z.string().optional(),
        buttonLink: z.string().optional(),
        buttonTwo_Number: z.string().optional(),
        image: z.string().optional(),
        buttonText: z.string().optional(),
        list: z
          .array(
            z.object({
              title: z.string().optional(),
              description: z.string().optional(),
              image: z.string().optional(),
              link: z.string().optional(),
            })
          )
          .optional(),
      })
      .optional(),
    patientJourney: z
      .object({
        heading: z.string().optional(),
        headingTwo_Part_1: z.string().optional(),
        headingTwo_Part_2: z.string().optional(),
        description: z.string().optional(),
        image: z.string().optional(),
        imageAlt: z.string().optional(),
        steps: z
          .array(
            z.object({
              stepNumber: z.string().optional(),
              title: z.string().optional(),
              description: z.string().optional(),
            })
          )
          .optional(),
      })
      .optional(),
    disorders: z
      .object({
        heading: z.string().optional(),
        headingTwo_Part_1: z.string().optional(),
        headingTwo_Part_2: z.string().optional(),
        headingTwo_Part_3: z.string().optional(),
        disorders: z
          .array(
            z.object({
              link: z.string().optional(),
              title: z.string().optional(),
              image: z.string().optional(),
            })
          )
          .optional(),
      })
      .optional(),
    faq: z
      .object({
        heading: z.string().optional(),
        subheading: z.string().optional(),
        faq: z
          .array(
            z.object({
              title: z.string().optional(),
              details: z.string().optional(),
            })
          )
          .optional(),
      })
      .optional(),
    services: z
      .object({
        heading: z.string().optional(),
        description: z.string().optional(),
        services: z
          .array(
            z.object({
              iconName: z.string().optional(),
              title: z.string().optional(),
              description: z.string().optional(),
            })
          )
          .optional(),
      })
      .optional(),
    cta: z
      .object({
        heading: z.string().optional(),
        phoneTextOne: z.string().optional(),
        buttonLink: z.string().optional(),
        text: z.string().optional(),
        phoneTextTwo: z.string().optional(),
        altText: z.string().optional(),
        phoneNumber: z.string().optional(),
        image: z.string().optional(),
        buttonText: z.string().optional(),
      })
      .optional(),
  }),
};

const locationTreatmentCollection = {
  type: "data",
  schema: z.object({
    seo: z
      .object({
        metaTitle: z.string(),
        metaDescription: z.string(),
        keywords: z.array(z.string()).optional(),
      })
      .optional(),
    location: z.string().optional(),
    treatment: z.string().optional(),
    title: z.string().optional(),
    hero: z
      .object({
        heading: z.string().optional(),
        text: z.string().optional(),
        buttonText: z.string().optional(),
        buttonLink: z.string().optional(),
        phoneQuestionText: z.string().optional(),
        treatmentsLabel: z.string().optional(),
        callButtonText: z.string().optional(),
        callButtonLink: z.string().optional(),
      })
      .optional(),
    about: z
      .object({
        headingOne: z.string().optional(),
        headingTwo: z.string().optional(),
        textOne: z.string().optional(),
        textTwo: z.string().optional(),
        buttonText: z.string().optional(),
        buttonLink: z.string().optional(),
        buttonTwo_Part_1: z.string().optional(),
        buttonTwo_Part_2: z.string().optional(),
        buttonTwo_Number: z.string().optional(),
        images: z
          .object({
            imageOne: z.string().optional(),
            imageTwo: z.string().optional(),
          })
          .optional(),
      })
      .optional(),
    video: z
      .object({
        heading: z.string().optional(),
        headingColored: z.string().optional(),
        description: z.string().optional(),
        image: z.string().optional(),
        imageAlt: z.string().optional(),
      })
      .optional(),
    whoNeeds: z
      .object({
        heading: z.string().optional(),
        headingColored: z.string().optional(),
        headingEnd: z.string().optional(),
        description: z.string().optional(),
        listHeading: z.string().optional(),
        listItems: z.array(z.string()).optional(),
        listDescription: z.string().optional(),
        buttonText: z.string().optional(),
        buttonLink: z.string().optional(),
        buttonTwo_Part_1: z.string().optional(),
        buttonTwo_Part_2: z.string().optional(),
        buttonTwo_Number: z.string().optional(),
      })
      .optional(),
    treatmentGrid: z
      .object({
        heading: z.string().optional(),
        subheading: z.string().optional(),
        description: z.string().optional(),
        featuredImage: z.string().optional(),
        treatments: z
          .array(
            z.object({
              icon: z.string().optional(),
              title: z.string().optional(),
              description: z.string().optional(),
            })
          )
          .optional(),
      })
      .optional(),
    whyChoose: z
      .object({
        headingOne: z.string().optional(),
        headingTwo: z.string().optional(),
        textOne: z.string().optional(),
        textTwo: z.string().optional(),
        buttonText: z.string().optional(),
        buttonLink: z.string().optional(),
        buttonTwo_Part_1: z.string().optional(),
        buttonTwo_Part_2: z.string().optional(),
        buttonTwo_Number: z.string().optional(),
        images: z
          .object({
            imageOne: z.string().optional(),
            imageTwo: z.string().optional(),
          })
          .optional(),
      })
      .optional(),
    benefits: z
      .object({
        headingOne: z.string().optional(),
        headingTwo: z.string().optional(),
        textOne: z.string().optional(),
        textTwo: z.string().optional(),
        buttonText: z.string().optional(),
        buttonLink: z.string().optional(),
        buttonTwo_Part_1: z.string().optional(),
        buttonTwo_Part_2: z.string().optional(),
        buttonTwo_Number: z.string().optional(),
        images: z
          .object({
            imageOne: z.string().optional(),
            imageTwo: z.string().optional(),
          })
          .optional(),
      })
      .optional(),
    program12: z
      .object({
        badgeText: z.string().optional(),
        heading: z.string().optional(),
        description: z.string().optional(),
        mainImage: z.string().optional(),
        mainImageAlt: z.string().optional(),
        steps: z
          .array(
            z.object({
              stepNumber: z.string().optional(),
              title: z.string().optional(),
              description: z.string().optional(),
            })
          )
          .optional(),
      })
      .optional(),
    programTMS: z
      .object({
        mainHeading: z.string().optional(),
        coloredHeading: z.string().optional(),
        description: z.string().optional(),
        buttonText: z.string().optional(),
        buttonLink: z.string().optional(),
        buttonTwo_Part_1: z.string().optional(),
        buttonTwo_Part_2: z.string().optional(),
        buttonTwo_Number: z.string().optional(),
        image: z.string().optional(),
        imageAlt: z.string().optional(),
        conditions: z
          .array(
            z.object({
              title: z.string().optional(),
              icon: z.string().optional(),
              description: z.string().optional(),
            })
          )
          .optional(),
      })
      .optional(),
    faq: z
      .object({
        heading: z.string().optional(),
        subheading: z.string().optional(),
        faq: z
          .array(
            z.object({
              title: z.string().optional(),
              details: z.string().optional(),
            })
          )
          .optional(),
      })
      .optional(),
    cta: z
      .object({
        heading: z.string().optional(),
        text: z.string().optional(),
        buttonText: z.string().optional(),
        buttonLink: z.string().optional(),
        image: z.string().optional(),
        altText: z.string().optional(),
        phoneTextOne: z.string().optional(),
        phoneTextTwo: z.string().optional(),
        phoneNumber: z.string().optional(),
      })
      .optional(),
  }),
};

const locationProgramCollection = {
  type: "data",
  schema: z.object({
    seo: z
      .object({
        metaTitle: z.string(),
        metaDescription: z.string(),
        keywords: z.array(z.string()).optional(),
      })
      .optional(),
    location: z.string().optional(),
    treatment: z.string().optional(),
    title: z.string().optional(),
    hero: z
      .object({
        heading: z.string().optional(),
        text: z.string().optional(),
        buttonText: z.string().optional(),
        buttonLink: z.string().optional(),
        phoneQuestionText: z.string().optional(),
        treatmentsLabel: z.string().optional(),
        callButtonText: z.string().optional(),
        callButtonLink: z.string().optional(),
      })
      .optional(),
    about: z
      .object({
        headingOne: z.string().optional(),
        headingTwo: z.string().optional(),
        textOne: z.string().optional(),
        textTwo: z.string().optional(),
        buttonText: z.string().optional(),
        buttonLink: z.string().optional(),
        buttonTwo_Part_1: z.string().optional(),
        buttonTwo_Part_2: z.string().optional(),
        buttonTwo_Number: z.string().optional(),
        images: z
          .object({
            imageOne: z.string().optional(),
            imageTwo: z.string().optional(),
          })
          .optional(),
      })
      .optional(),
    video: z
      .object({
        heading: z.string().optional(),
        headingColored: z.string().optional(),
        description: z.string().optional(),
        image: z.string().optional(),
        imageAlt: z.string().optional(),
      })
      .optional(),
    whoNeeds: z
      .object({
        heading: z.string().optional(),
        headingColored: z.string().optional(),
        headingEnd: z.string().optional(),
        description: z.string().optional(),
        listHeading: z.string().optional(),
        listItems: z.array(z.string()).optional(),
        listDescription: z.string().optional(),
        buttonText: z.string().optional(),
        buttonLink: z.string().optional(),
        buttonTwo_Part_1: z.string().optional(),
        buttonTwo_Part_2: z.string().optional(),
        buttonTwo_Number: z.string().optional(),
      })
      .optional(),
    treatmentGrid: z
      .object({
        heading: z.string().optional(),
        subheading: z.string().optional(),
        description: z.string().optional(),
        featuredImage: z.string().optional(),
        treatments: z
          .array(
            z.object({
              icon: z.string().optional(),
              title: z.string().optional(),
              description: z.string().optional(),
            })
          )
          .optional(),
      })
      .optional(),
    whyChoose: z
      .object({
        headingOne: z.string().optional(),
        headingTwo: z.string().optional(),
        textOne: z.string().optional(),
        textTwo: z.string().optional(),
        buttonText: z.string().optional(),
        buttonLink: z.string().optional(),
        buttonTwo_Part_1: z.string().optional(),
        buttonTwo_Part_2: z.string().optional(),
        buttonTwo_Number: z.string().optional(),
        images: z
          .object({
            imageOne: z.string().optional(),
            imageTwo: z.string().optional(),
          })
          .optional(),
      })
      .optional(),
    benefits: z
      .object({
        headingOne: z.string().optional(),
        headingTwo: z.string().optional(),
        textOne: z.string().optional(),
        textTwo: z.string().optional(),
        buttonText: z.string().optional(),
        buttonLink: z.string().optional(),
        buttonTwo_Part_1: z.string().optional(),
        buttonTwo_Part_2: z.string().optional(),
        buttonTwo_Number: z.string().optional(),
        images: z
          .object({
            imageOne: z.string().optional(),
            imageTwo: z.string().optional(),
          })
          .optional(),
      })
      .optional(),
    program12: z
      .object({
        badgeText: z.string().optional(),
        heading: z.string().optional(),
        description: z.string().optional(),
        mainImage: z.string().optional(),
        mainImageAlt: z.string().optional(),
        steps: z
          .array(
            z.object({
              stepNumber: z.string().optional(),
              title: z.string().optional(),
              description: z.string().optional(),
            })
          )
          .optional(),
      })
      .optional(),
    programTMS: z
      .object({
        mainHeading: z.string().optional(),
        coloredHeading: z.string().optional(),
        description: z.string().optional(),
        buttonText: z.string().optional(),
        buttonLink: z.string().optional(),
        buttonTwo_Part_1: z.string().optional(),
        buttonTwo_Part_2: z.string().optional(),
        buttonTwo_Number: z.string().optional(),
        image: z.string().optional(),
        imageAlt: z.string().optional(),
        conditions: z
          .array(
            z.object({
              title: z.string().optional(),
              icon: z.string().optional(),
              description: z.string().optional(),
            })
          )
          .optional(),
      })
      .optional(),
    faq: z
      .object({
        heading: z.string().optional(),
        subheading: z.string().optional(),
        faq: z
          .array(
            z.object({
              title: z.string().optional(),
              details: z.string().optional(),
            })
          )
          .optional(),
      })
      .optional(),
    cta: z
      .object({
        heading: z.string().optional(),
        text: z.string().optional(),
        buttonText: z.string().optional(),
        buttonLink: z.string().optional(),
        image: z.string().optional(),
        altText: z.string().optional(),
        phoneTextOne: z.string().optional(),
        phoneTextTwo: z.string().optional(),
        phoneNumber: z.string().optional(),
      })
      .optional(),
  }),
};

export const collections = {
  blog: blogCollection,
  general: generalCollection,
  about: aboutCollection,
  contact: contactCollection,
  home: homeCollection,
  admissions: admissionsCollection,
  program: programCollection,
  programarchive: programarchiveCollection,
  team: teamCollection,
  treatmentarchive: treatmentarchiveCollection,
  blogpage: blogpageCollection,
  insurance: insuranceCollection,
  location: locationCollection,
  treatment: treatmentCollection,
  pricing: pricingCollection,
  locations: locationsCollection,
  location_treatment: locationTreatmentCollection,
  location_program: locationProgramCollection,
};
