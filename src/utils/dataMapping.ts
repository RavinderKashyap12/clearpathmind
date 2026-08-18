import { getCollection } from "astro:content";
import type { Blog } from "../types/blog";
import type { General } from "../types/general";
import type {
  About,
  BlogPage,
  Contact,
  Home,
  Admissions,
  Program,
  Programarchive,
  Team,
  Treatmentarchive,
  Insurance,
  Location,
} from "../types/pages";

type Therapy = {
  title: string;
  description: string;
  image: string;
  link: string;
};

export async function fetchBlogData(): Promise<Blog[]> {
  const posts = await getCollection("blog");

  return posts.map((post) => ({
    id: post.id,
    slug: post.slug,
    body: post.body,
    collection: post.collection,
    render: post.render,
    data: {
      title: post.data.title,
      description: post.data.description,
      featuredImg: post.data.featuredImg,
      date: post.data.date,
      author: post.data.author,
      tags: post.data.tags,
      readingTime: post.data.readingTime,
    },
  }));
}

export async function fetchGeneralData(): Promise<General> {
  const [general] = await getCollection("general");

  return {
    companyName: general.data.companyName,
    logo: general.data.logo,
    city: general.data.city,
    state: general.data.state,
    address: general.data.address,
    phoneNumber: general.data.phoneNumber,
    phoneNumber2: general.data.phoneNumber2,
    email: general.data.Email,
    analytics: {
      gtmId: general.data.analytics.gtmId,
    },
    footer: {
      description: general.data.footer.description,
      navColumn1: {
        links: general.data.footer.navColumn1.links.map((link) => ({
          text: link.text,
          url: link.url,
        })),
      },
      navColumn2: {
        links: general.data.footer.navColumn2.links.map((link) => ({
          text: link.text,
          url: link.url,
        })),
      },
      emailPlaceholder: general.data.footer.emailPlaceholder,
      signUpButtonText: general.data.footer.signUpButtonText,
      copyrightText: general.data.footer.copyrightText,
      backToTopText: general.data.footer.backToTopText,
    },
  };
}

export async function fetchAboutData(): Promise<About> {
  const [about] = await getCollection("pages", (page) => page.id === "about");

  return {
    data: {
      hero: {
        heading: about.data.hero.heading,
        text: about.data.hero.text,
        buttonText: about.data.hero.buttonText,
        buttonLink: about.data.hero.buttonLink,
        phoneQuestionText: about.data.hero.phoneQuestionText,
        treatmentsLabel: about.data.hero.treatmentsLabel,
        callButtonText: about.data.hero.callButtonText,
        callButtonLink: about.data.hero.callButtonLink,
      },
      about: {
        headingOne: about.data.about.headingOne,
        textOne: about.data.about.textOne,
        headingTwo: about.data.about.headingTwo,
        textTwo: about.data.about.textTwo,
        buttonText: about.data.about.buttonText,
        buttonLink: about.data.about.buttonLink,
        buttonTwo_Part_1: about.data.about.buttonTwo_Part_1,
        buttonTwo_Part_2: about.data.about.buttonTwo_Part_2,
        buttonTwo_Number: about.data.about.buttonTwo_Number,
        images: {
          imageOne: about.data.about.images.imageOne,
          imageTwo: about.data.about.images.imageTwo,
        },
      },
      video: {
        heading: about.data.video.heading,
        headingColored: about.data.video.headingColored,
        description: about.data.video.description,
        image: about.data.video.image,
        imageAlt: about.data.video.imageAlt,
      },
      whyChoose: {
        headingOne: about.data.whyChoose.headingOne,
        headingTwo: about.data.whyChoose.headingTwo,
        textOne: about.data.whyChoose.textOne,
        textTwo: about.data.whyChoose.textTwo,
        buttonText: about.data.whyChoose.buttonText,
        buttonLink: about.data.whyChoose.buttonLink,
        buttonTwo_Part_1: about.data.whyChoose.buttonTwo_Part_1,
        buttonTwo_Part_2: about.data.whyChoose.buttonTwo_Part_2,
        buttonTwo_Number: about.data.whyChoose.buttonTwo_Number,
        images: {
          imageOne: about.data.whyChoose.images.imageOne,
          imageTwo: about.data.whyChoose.images.imageTwo,
        },
      },
      programTMS: {
        mainHeading: about.data.programTMS.mainHeading,
        coloredHeading: about.data.programTMS.coloredHeading,
        description: about.data.programTMS.description,
        buttonText: about.data.programTMS.buttonText,
        buttonLink: about.data.programTMS.buttonLink,
        buttonTwo_Part_1: about.data.programTMS.buttonTwo_Part_1,
        buttonTwo_Part_2: about.data.programTMS.buttonTwo_Part_2,
        buttonTwo_Number: about.data.programTMS.buttonTwo_Number,
        image: about.data.programTMS.image,
        imageAlt: about.data.programTMS.imageAlt,
        conditions: about.data.programTMS.conditions.map((condition) => ({
          title: condition.title,
          icon: condition.icon,
          description: condition.description,
        })),
      },
      therapies: {
        mainHeading: (about.data.therapies as any).mainHeading || "",
        coloredHeading: (about.data.therapies as any).coloredHeading || "",
        description: (about.data.therapies as any).description || "",
        buttonText: about.data.therapies.buttonText,
        buttonLink: about.data.therapies.buttonLink,
        buttonTwo_Part_1: about.data.therapies.buttonTwo_Part_1,
        buttonTwo_Part_2: about.data.therapies.buttonTwo_Part_2,
        buttonTwo_Number: about.data.therapies.buttonTwo_Number,
        image: about.data.therapies.image,
        list: about.data.therapies.list.map((therapy) => ({
          title: therapy.title,
          description: therapy.description,
          image: therapy.image,
          link: therapy.link,
        })),
      },
      testimonials: {
        list: about.data.testimonials.list.map((testimonial) => ({
          name: testimonial.name,
          position: testimonial.position,
          text: testimonial.text,
          image: testimonial.image,
        })),
      },
      patientJourney: {
        heading: about.data.patientJourney.heading,
        headingTwo_Part_1: about.data.patientJourney.headingTwo_Part_1,
        headingTwo_Part_2: about.data.patientJourney.headingTwo_Part_2,
        image: about.data.patientJourney.image,
        imageAlt: about.data.patientJourney.imageAlt,
        steps: about.data.patientJourney.steps.map((step) => ({
          title: step.title,
          description: step.description,
        })),
      },
      insuranceOptions: {
        headingOne: about.data.insuranceOptions.headingOne,
        headingTwo: about.data.insuranceOptions.headingTwo,
        description: about.data.insuranceOptions.description,
        buttonOneText: about.data.insuranceOptions.buttonOneText,
        buttonOneLink: about.data.insuranceOptions.buttonOneLink,
        buttonTwoTextOne: about.data.insuranceOptions.buttonTwoTextOne,
        buttonTwoTextTwo: about.data.insuranceOptions.buttonTwoTextTwo,
        buttonTwoLink: about.data.insuranceOptions.buttonTwoLink,
        insuranceOptions: about.data.insuranceOptions.insuranceOptions.map(
          (option) => ({
            logo: option.logo,
            alt: option.alt,
          })
        ),
      },

      cta: {
        heading: about.data.cta.heading,
        text: about.data.cta.text,
        buttonText: about.data.cta.buttonText,
        buttonLink: about.data.cta.buttonLink,
        image: about.data.cta.image,
        altText: about.data.cta.altText,
        phoneTextOne: about.data.cta.phoneTextOne,
        phoneTextTwo: about.data.cta.phoneTextTwo,
        phoneNumber: about.data.cta.phoneNumber,
      },
    },
  };
}

export async function fetchContactData(): Promise<Contact> {
  const [contact] = await getCollection(
    "pages",
    (page) => page.id === "contact"
  );

  return {
    data: {
      hero: {
        heading: contact.data.hero.heading,
        text: contact.data.hero.text,
        buttonText: contact.data.hero.buttonText,
        buttonLink: contact.data.hero.buttonLink,
        phoneQuestionText: contact.data.hero.phoneQuestionText,
        treatmentsLabel: contact.data.hero.treatmentsLabel,
        callButtonText: contact.data.hero.callButtonText,
        callButtonLink: contact.data.hero.callButtonLink,
      },

      contactDetails: {
        address: contact.data.contactDetails.address,
        email: contact.data.contactDetails.email,
        phone: contact.data.contactDetails.phone,
        formHeading: contact.data.contactDetails.formHeading,
        emergencyHeading: contact.data.contactDetails.emergencyHeading,
        emergencyText: contact.data.contactDetails.emergencyText,
        supportHeading: contact.data.contactDetails.supportHeading,
        businessHours: {
          heading: contact.data.contactDetails.businessHours.heading,
          hours: contact.data.contactDetails.businessHours.hours,
          weekend: contact.data.contactDetails.businessHours.weekend,
        },
      },
    },
  };
}

export async function fetchHomeData(): Promise<Home> {
  const [home] = await getCollection("pages", (page) => page.id === "home");

  return {
    data: {
      hero: {
        backgroundImage: home.data.hero.backgroundImage,
        backgroundImageAlt: home.data.hero.backgroundImageAlt,
        logo: home.data.hero.logo,
        buttonText: home.data.hero.buttonText,
        textBox1: home.data.hero.textBox1,
        textBox2_Part_1: home.data.hero.textBox2_Part_1,
        textBox2_Part_2: home.data.hero.textBox2_Part_2,
        textBox2_Part_3: home.data.hero.textBox2_Part_3,
        textBox3: home.data.hero.textBox3,
        buttonOne: home.data.hero.buttonOne,
        buttonOneLink: home.data.hero.buttonOneLink,
        buttonTwo: home.data.hero.buttonTwo,
        telephoneNumber: home.data.hero.telephoneNumber,
      },
      about: {
        headingOne_Part_1: home.data.about.headingOne_Part_1,
        headingOne_Part_2: home.data.about.headingOne_Part_2,
        headingTwo: home.data.about.headingTwo,
        textOne: home.data.about.textOne,
        buttonOne: home.data.about.buttonOne,
        buttonOneLink: home.data.about.buttonOneLink,
        buttonTwo_Part_1: home.data.about.buttonTwo_Part_1,
        buttonTwo_Part_2: home.data.about.buttonTwo_Part_2,
        buttonTwo_Number: home.data.about.buttonTwo_Number,
      },
      treatmentGrid: {
        heading: home.data.treatmentGrid.heading,
        subheading: home.data.treatmentGrid.subheading,
        description: home.data.treatmentGrid.description,
        featuredImage: home.data.treatmentGrid.featuredImage,
        featuredImageAlt: home.data.treatmentGrid.featuredImageAlt,
        treatments: home.data.treatmentGrid.treatments.map((treatment) => ({
          icon: treatment.icon,
          title: treatment.title,
          description: treatment.description,
          link: treatment.link,
        })),
      },
      testimonials: {
        list: home.data.testimonials.list.map((testimonial) => ({
          name: testimonial.name,
          position: testimonial.position,
          text: testimonial.text,
          image: testimonial.image,
        })),
      },
      therapies: {
        image: home.data.therapies.image,
        mainHeading: home.data.therapies.mainHeading,
        coloredHeading: home.data.therapies.coloredHeading,
        description: home.data.therapies.description,
        buttonText: home.data.therapies.buttonText,
        buttonLink: home.data.therapies.buttonLink,
        buttonTwo_Part_1: home.data.therapies.buttonTwo_Part_1,
        buttonTwo_Part_2: home.data.therapies.buttonTwo_Part_2,
        buttonTwo_Number: home.data.therapies.buttonTwo_Number,
        list: home.data.therapies.list.map((therapy: Therapy) => ({
          title: therapy.title,
          description: therapy.description,
          image: therapy.image,
          link: therapy.link || "#", // Add link with fallback
        })),
      },
      programs: {
        heading: home.data.programs.heading,
        text: home.data.programs.text,
        programs: home.data.programs.programs.map((program) => ({
          title: program.title,
          image: program.image,
          link: program.link,
        })),
      },
      services: {
        heading: home.data.services.heading,
        description: home.data.services.description,
        services: home.data.services.services.map((service) => ({
          iconName: service.iconName,
          title: service.title,
          description: service.description,
        })),
      },
      patientJourney: {
        heading: home.data.patientJourney.heading,
        headingTwo_Part_1: home.data.patientJourney.headingTwo_Part_1,
        headingTwo_Part_2: home.data.patientJourney.headingTwo_Part_2,
        image: home.data.patientJourney.image,
        imageAlt: home.data.patientJourney.imageAlt,
        steps: home.data.patientJourney.steps.map((journey) => ({
          title: journey.title,
          description: journey.description,
        })),
      },
      disorders: {
        heading: home.data.disorders.heading,
        headingTwo_Part_1: home.data.disorders.headingTwo_Part_1,
        headingTwo_Part_2: home.data.disorders.headingTwo_Part_2,
        headingTwo_Part_3: home.data.disorders.headingTwo_Part_3,
        disorders: home.data.disorders.disorders.map((disorder) => ({
          link: disorder.link,
          title: disorder.title,
          image: disorder.image,
        })),
      },
      faq: {
        heading: home.data.faq.heading,
        subheading: home.data.faq.subheading,
        faq: home.data.faq.faq.map((faq) => ({
          title: faq.title,
          details: faq.details,
        })),
      },
      insuranceOptions: {
        headingOne: home.data.insuranceOptions.headingOne,
        headingTwo: home.data.insuranceOptions.headingTwo,
        description: home.data.insuranceOptions.description,
        buttonOneText: home.data.insuranceOptions.buttonOneText,
        buttonOneLink: home.data.insuranceOptions.buttonOneLink,
        buttonTwoTextOne: home.data.insuranceOptions.buttonSecondTextOne,
        buttonTwoTextTwo: home.data.insuranceOptions.buttonSecondTextTwo,
        buttonTwoLink: home.data.insuranceOptions.buttonSecondLink,
        insuranceOptions: home.data.insuranceOptions.insuranceOptions.map(
          (option) => ({
            logo: option.logo,
            alt: option.alt,
          })
        ),
      },
      cta: {
        heading: home.data.cta.heading,
        text: home.data.cta.text,
        buttonText: home.data.cta.buttonText,
        buttonLink: home.data.cta.buttonLink,
        image: home.data.cta.image,
        altText: home.data.cta.altText,
        phoneTextOne: home.data.cta.phoneTextOne,
        phoneTextTwo: home.data.cta.phoneTextTwo,
        phoneNumber: home.data.cta.phoneNumber,
      },
    },
  };
}

export async function fetchAdmissions(): Promise<Admissions> {
  const [admissions] = await getCollection(
    "pages",
    (page) => page.id === "admissions"
  );

  return {
    data: {
      hero: {
        heading: admissions.data.hero.heading,
        text: admissions.data.hero.text,
        videoLink: admissions.data.hero.videoLink,
        video: {
          img: admissions.data.hero.video.img,
          videoSrc: admissions.data.hero.video.videoSrc,
        },
      },
      cta: {
        heading: admissions.data.cta.heading,
        text: admissions.data.cta.text,
        buttonText: admissions.data.cta.buttonText,
      },
      steps: admissions.data.steps.map((step) => ({
        name: step.name,
        title: step.title,
        text: step.text,
        icon: step.icon,
        modalText: step.modalText,
      })),
      nextSteps: {
        heading: admissions.data.nextSteps.heading,
        description: admissions.data.nextSteps.description,
        nextSteps: admissions.data.nextSteps.nextSteps.map((nextStep) => ({
          title: nextStep.title,
          linkOne: nextStep.linkOne,
          linkOneUrl: nextStep.linkOneUrl,
          linkTwo: nextStep.linkTwo,
          linkTwoUrl: nextStep.linkTwoUrl,
        })),
      },
      pdf: {
        heading: admissions.data.pdf.heading,
        description: admissions.data.pdf.description,
        pdf: {
          link: admissions.data.pdf.pdf.link,
          linkUrl: admissions.data.pdf.pdf.linkUrl,
        },
      },
      faq: {
        heading: admissions.data.faq.heading,
        subheading: admissions.data.faq.subheading,
        faq: admissions.data.faq.faq.map((faqItem) => ({
          title: faqItem.title,
          details: faqItem.details,
        })),
      },
    },
  };
}

export async function fetchSubProgramData(sub_page): Promise<Program> {
  const type = sub_page;
  const [programData] = await getCollection(
    "programs",
    (item) => item.id === type
  );

  return {
    data: {
      title: programData.data.title,
      seo: (programData.data as any).seo,
      jsonLd: (programData.data as any).jsonLd,
      hero: {
        heading: programData.data.hero.heading,
        text: programData.data.hero.text,
        buttonText: programData.data.hero.buttonText,
        buttonLink: programData.data.hero.buttonLink,
        phoneQuestionText: programData.data.hero.phoneQuestionText,
        treatmentsLabel: programData.data.hero.treatmentsLabel,
        callButtonText: programData.data.hero.callButtonText,
        callButtonLink: programData.data.hero.callButtonLink,
      },
      about: {
        headingOne: programData.data.about.headingOne,
        headingTwo: programData.data.about.headingTwo,
        textOne: programData.data.about.textOne,
        textTwo: programData.data.about.textTwo,
        buttonText: programData.data.about.buttonText,
        buttonLink: programData.data.about.buttonLink,
        buttonTwo_Part_1: programData.data.about.buttonTwo_Part_1,
        buttonTwo_Part_2: programData.data.about.buttonTwo_Part_2,
        buttonTwo_Number: programData.data.about.buttonTwo_Number,
        images: {
          imageOne: programData.data.about?.images?.imageOne || "",
          imageTwo: programData.data.about?.images?.imageTwo || "",
        },
      },
      video: {
        heading: programData.data.video.heading,
        headingColored: programData.data.video.headingColored,
        description: programData.data.video.description,
        image: programData.data.video.image,
        imageAlt: programData.data.video.imageAlt,
      },
      team: {
        heading: programData.data.team?.heading || "",
        description: programData.data.team?.description || "",
        team: (programData.data.team?.team || []).map((member: any) => ({
          name: member.name,
          designation: member.designation,
          image: member.image,
        })),
      },
      nextSteps: {
        heading: programData.data.nextSteps.heading,
        description: programData.data.nextSteps.description,
        nextSteps: programData.data.nextSteps.nextSteps.map((step: any) => ({
          title: step.title,
          linkOne: step.linkOne,
          linkOneUrl: step.linkOneUrl,
          linkTwo: step.linkTwo,
          linkTwoUrl: step.linkTwoUrl,
        })),
      },
      singleReview: {
        heading: programData.data.singleReview.heading,
        description: programData.data.singleReview.description,
        buttonText: programData.data.singleReview.buttonText,
        cardDetail: programData.data.singleReview.cardDetail,
        cardTitle: programData.data.singleReview.cardTitle,
      },
      pdf: {
        heading: programData.data.pdf.heading,
        description: programData.data.pdf.description,
        pdf: {
          link: programData.data.pdf.pdf.link,
          linkUrl: programData.data.pdf.pdf.linkUrl,
        },
      },
      howWeTreat: {
        heading: programData.data.howWeTreat?.heading || "",
        description: programData.data.howWeTreat?.description || "",
        process: (programData.data.howWeTreat?.process || []).map((process: any) => ({
          title: process.title,
          details: process.details,
        })),
      },
      residentialRehab: {
        img: programData.data.residentialRehab?.img || "",
        heading: programData.data.residentialRehab?.heading || "",
        description: programData.data.residentialRehab?.description || "",
        cardTitle: programData.data.residentialRehab?.cardTitle || "",
        process: (programData.data.residentialRehab?.process || []).map(
          (process: any) => ({
            title: process.title,
            details: process.details,
          })
        ),
      },
      therapies: {
        heading: programData.data.therapies.heading,
        description: programData.data.therapies.description,
        therapies: programData.data.therapies.therapies.map((therapy: any) => ({
          title: therapy.title,
          details: therapy.details,
        })),
      },
      amenities: {
        img: programData.data.amenities?.img || "",
        heading: programData.data.amenities?.heading || "",
        description: programData.data.amenities?.description || "",
      },
      cta: {
        heading: programData.data.cta.heading,
        text: programData.data.cta.text,
        buttonText: programData.data.cta.buttonText,
        buttonLink: programData.data.cta.buttonLink,
        image: programData.data.cta.image,
        altText: programData.data.cta.altText,
        phoneTextOne: programData.data.cta.phoneTextOne,
        phoneTextTwo: programData.data.cta.phoneTextTwo,
        phoneNumber: programData.data.cta.phoneNumber,
      },
      disorders: {
        heading: programData.data.disorders.heading,
        headingTwo_Part_1: programData.data.disorders.headingTwo_Part_1,
        headingTwo_Part_2: programData.data.disorders.headingTwo_Part_2,
        headingTwo_Part_3: programData.data.disorders.headingTwo_Part_3,
        disorders: programData.data.disorders.disorders.map((disorder) => ({
          link: disorder.link,
          title: disorder.title,
          image: disorder.image,
        })),
      },

      faq: {
        heading: programData.data.faq.heading,
        subheading: programData.data.faq.subheading,
        faq: programData.data.faq.faq.map((item: any) => ({
          title: item.title,
          details: item.details,
        })),
      },
      otherTreatments: {
        heading: programData.data.otherTreatments.heading,
        buttonText: programData.data.otherTreatments.buttonText,
        buttonUrl: programData.data.otherTreatments.buttonUrl,
        cards: programData.data.otherTreatments.cards.map((card: any) => ({
          title: card.title,
          buttonText: card.buttonText,
          image: card.image,
        })),
      },
      treatmentGrid: {
        heading: programData.data.treatmentGrid.heading,
        subheading: programData.data.treatmentGrid.subheading,
        description: programData.data.treatmentGrid.description,
        featuredImage: programData.data.treatmentGrid.featuredImage,
        treatments: programData.data.treatmentGrid.treatments.map(
          (treatment: any) => ({
            icon: treatment.icon,
            title: treatment.title,
            description: treatment.description,
            link: treatment.link,
          })
        ),
      },
      whyChoose: {
        headingOne: programData.data.whyChoose?.headingOne || "",
        headingTwo: programData.data.whyChoose?.headingTwo || "",
        textOne: programData.data.whyChoose?.textOne || "",
        textTwo: programData.data.whyChoose?.textTwo || "",
        buttonText: programData.data.whyChoose?.buttonText || "",
        buttonLink: programData.data.whyChoose?.buttonLink || "",
        buttonTwo_Part_1: programData.data.whyChoose?.buttonTwo_Part_1 || "",
        buttonTwo_Part_2: programData.data.whyChoose?.buttonTwo_Part_2 || "",
        buttonTwo_Number: programData.data.whyChoose?.buttonTwo_Number || "",
        images: {
          imageOne: programData.data.whyChoose?.images?.imageOne || "",
          imageTwo: programData.data.whyChoose?.images?.imageTwo || "",
        },
      },
      benefits: {
        headingOne: programData.data.benefits?.headingOne || "",
        headingTwo: programData.data.benefits?.headingTwo || "",
        textOne: programData.data.benefits?.textOne || "",
        textTwo: programData.data.benefits?.textTwo || "",
        buttonText: programData.data.benefits?.buttonText || "",
        buttonLink: programData.data.benefits?.buttonLink || "",
        buttonTwo_Part_1: programData.data.benefits?.buttonTwo_Part_1 || "",
        buttonTwo_Part_2: programData.data.benefits?.buttonTwo_Part_2 || "",
        buttonTwo_Number: programData.data.benefits?.buttonTwo_Number || "",
        images: {
          imageOne: programData.data.benefits?.images?.imageOne || "",
          imageTwo: programData.data.benefits?.images?.imageTwo || "",
        },
      },
      whoNeeds: {
        heading: programData.data.whoNeeds.heading,
        headingColored: programData.data.whoNeeds.headingColored,
        headingEnd: programData.data.whoNeeds.headingEnd,
        description: programData.data.whoNeeds.description,
        listHeading: programData.data.whoNeeds.listHeading,
        listItems: programData.data.whoNeeds.listItems,
        listDescription: programData.data.whoNeeds.listDescription,
        buttonText: programData.data.whoNeeds.buttonText,
        buttonLink: programData.data.whoNeeds.buttonLink,
        buttonTwo_Part_1: programData.data.whoNeeds.buttonTwo_Part_1,
        buttonTwo_Part_2: programData.data.whoNeeds.buttonTwo_Part_2,
        buttonTwo_Number: programData.data.whoNeeds.buttonTwo_Number,
      },
      program12: {
        badgeText: programData.data.program12.badgeText,
        heading: programData.data.program12.heading,
        description: programData.data.program12.description,
        mainImage: programData.data.program12.mainImage,
        mainImageAlt: programData.data.program12.mainImageAlt,
        steps: programData.data.program12.steps.map((step: any) => ({
          stepNumber: step.stepNumber,
          title: step.title,
          description: step.description,
        })),
      },
      programTMS: {
        mainHeading: programData.data.programTMS.mainHeading,
        coloredHeading: programData.data.programTMS.coloredHeading,
        description: programData.data.programTMS.description,
        buttonText: programData.data.programTMS.buttonText,
        buttonLink: programData.data.programTMS.buttonLink,
        buttonTwo_Part_1: programData.data.programTMS.buttonTwo_Part_1,
        buttonTwo_Part_2: programData.data.programTMS.buttonTwo_Part_2,
        buttonTwo_Number: programData.data.programTMS.buttonTwo_Number,
        image: programData.data.programTMS.image,
        imageAlt: programData.data.programTMS.imageAlt,
        conditions: programData.data.programTMS.conditions.map(
          (condition: any) => ({
            title: condition.title,
            icon: condition.icon,
            description: condition.description,
          })
        ),
      },
    },
  };
}

export async function fetchProgramarchiveData(): Promise<Programarchive> {
  const [programData] = await getCollection(
    "pages",
    (page) => page.id === "programarchive"
  );

  return {
    data: {
      hero: {
        heading: programData.data.hero.heading,
        text: programData.data.hero.text,
      },
      about: {
        headingOne: programData.data.about.headingOne,
        textOne: programData.data.about.textOne,
        headingTwo: programData.data.about.headingTwo,
        textTwo: programData.data.about.textTwo,
        images: {
          imageOne: programData.data.about?.images?.imageOne || "",
          imageTwo: programData.data.about?.images?.imageTwo || "",
        },
      },
      cta: {
        heading: programData.data.cta.heading,
        text: programData.data.cta.text,
        buttonText: programData.data.cta.buttonText,
      },
      footerCta: {
        heading: programData.data.footerCta.heading,
        text: programData.data.footerCta.text,
        buttonText: programData.data.footerCta.buttonText,
      },
      coreValues: {
        heading: programData.data.coreValues.heading,
        text: programData.data.coreValues.text,
        list: programData.data.coreValues.list.map((item: any) => ({
          title: item.title,
          description: item.description,
        })),
        buttonText: programData.data.coreValues.buttonText,
      },
      programs: {
        heading: programData.data.programs.heading,
        text: programData.data.programs.text,
        programs: programData.data.programs.programs.map((program: any) => ({
          title: program.title,
          description: program.description,
          image: program.image,
        })),
      },
      facility: {
        heading: programData.data.facility.heading,
        text: programData.data.facility.text,
        buttonText: programData.data.facility.buttonText,
        images: {
          imageOne: programData.data.facility.images.imageOne,
          imageTwo: programData.data.facility.images.imageTwo,
        },
      },
      approach: {
        headingOne: programData.data.approach.headingOne,
        textOne: programData.data.approach.textOne,
        headingTwo: programData.data.approach.headingTwo,
        textTwo: programData.data.approach.textTwo,
        images: {
          imageOne: programData.data.approach.images.imageOne,
          imageTwo: programData.data.approach.images.imageTwo,
        },
      },
      faq: {
        heading: programData.data.faq.heading,
        subheading: programData.data.faq.subheading,
        faq: programData.data.faq.faq.map((item: any) => ({
          title: item.title,
          details: item.details,
        })),
      },
    },
  };
}

export async function fetchTeamData(): Promise<Team> {
  const [team] = await getCollection("pages", (page) => page.id === "team");

  return {
    data: {
      hero: {
        heading: team.data.hero.heading,
        text: team.data.hero.text,
      },
      cta: {
        heading: team.data.cta.heading,
        text: team.data.cta.text,
        buttonText: team.data.cta.buttonText,
      },
      team: {
        heading: team.data.team.heading,
        buttonText: team.data.team.buttonText,
        description: team.data.team.description,
        team: team.data.team.team.map((member) => ({
          name: member.name,
          designation: member.designation,
          image: member.image,
        })),
      },
      faq: {
        heading: team.data.faq.heading,
        subheading: team.data.faq.subheading,
        faq: team.data.faq.faq.map((item) => ({
          title: item.title,
          details: item.details,
        })),
      },
    },
  };
}

export async function fetchTreatmentarchive(): Promise<Treatmentarchive> {
  const [treatmentArchive] = await getCollection(
    "pages",
    (page) => page.id === "treatmentarchive"
  );

  return {
    data: {
      hero: {
        heading: treatmentArchive.data.hero.heading,
        text: treatmentArchive.data.hero.text,
      },
      about: {
        headingOne: treatmentArchive.data.about.headingOne,
        textOne: treatmentArchive.data.about.textOne,
        headingTwo: treatmentArchive.data.about.headingTwo,
        textTwo: treatmentArchive.data.about.textTwo,
        images: {
          imageOne: treatmentArchive.data.about.images.imageOne,
          imageTwo: treatmentArchive.data.about.images.imageTwo,
        },
      },
      cta: {
        heading: treatmentArchive.data.cta.heading,
        text: treatmentArchive.data.cta.text,
        buttonText: treatmentArchive.data.cta.buttonText,
      },
      footerCta: {
        heading: treatmentArchive.data.footerCta.heading,
        text: treatmentArchive.data.footerCta.text,
        buttonText: treatmentArchive.data.footerCta.buttonText,
      },
      coreValues: {
        heading: treatmentArchive.data.coreValues.heading,
        text: treatmentArchive.data.coreValues.text,
        list: treatmentArchive.data.coreValues.list.map((item) => ({
          title: item.title,
          description: item.description,
        })),
        buttonText: treatmentArchive.data.coreValues.buttonText,
      },
      programs: {
        heading: treatmentArchive.data.programs.heading,
        text: treatmentArchive.data.programs.text,
        programs: treatmentArchive.data.programs.programs.map((program) => ({
          title: program.title,
          description: program.description,
          image: program.image,
        })),
      },
      facility: {
        heading: treatmentArchive.data.facility.heading,
        text: treatmentArchive.data.facility.text,
        buttonText: treatmentArchive.data.facility.buttonText,
        images: {
          imageOne: treatmentArchive.data.facility.images.imageOne,
          imageTwo: treatmentArchive.data.facility.images.imageTwo,
        },
      },
      approach: {
        headingOne: treatmentArchive.data.approach.headingOne,
        textOne: treatmentArchive.data.approach.textOne,
        headingTwo: treatmentArchive.data.approach.headingTwo,
        textTwo: treatmentArchive.data.approach.textTwo,
        images: {
          imageOne: treatmentArchive.data.approach.images.imageOne,
          imageTwo: treatmentArchive.data.approach.images.imageTwo,
        },
      },
      disorders: {
        heading: treatmentArchive.data.disorders.heading,
        description: treatmentArchive.data.disorders.description,
        disorders: treatmentArchive.data.disorders.disorders.map(
          (disorder) => ({
            iconName: disorder.iconName,
            title: disorder.title,
          })
        ),
      },
      faq: {
        heading: treatmentArchive.data.faq.heading,
        subheading: treatmentArchive.data.faq.subheading,
        faq: treatmentArchive.data.faq.faq.map((question) => ({
          title: question.title,
          details: question.details,
        })),
      },
    },
  };
}

export async function fetchBlogPageData(): Promise<BlogPage> {
  const [blogPage] = await getCollection("pages", (page) => page.id === "blog");

  return {
    data: {
      hero: {
        heading: blogPage.data.hero.heading,
        text: blogPage.data.hero.text,
        buttonText: blogPage.data.hero.buttonText,
        buttonLink: blogPage.data.hero.buttonLink,
        phoneQuestionText: blogPage.data.hero.phoneQuestionText,
        treatmentsLabel: blogPage.data.hero.treatmentsLabel,
        callButtonText: blogPage.data.hero.callButtonText,
        callButtonLink: blogPage.data.hero.callButtonLink,
      },
      disorders: {
        heading: blogPage.data.disorders.heading,
        headingTwo_Part_1: blogPage.data.disorders.headingTwo_Part_1,
        headingTwo_Part_2: blogPage.data.disorders.headingTwo_Part_2,
        headingTwo_Part_3: blogPage.data.disorders.headingTwo_Part_3,
        disorders: blogPage.data.disorders.disorders.map((disorder) => ({
          link: disorder.link,
          title: disorder.title,
          image: disorder.image,
        })),
      },
      cta: {
        heading: blogPage.data.cta.heading,
        text: blogPage.data.cta.text,
        buttonText: blogPage.data.cta.buttonText,
        buttonLink: blogPage.data.cta.buttonLink,
        image: blogPage.data.cta.image,
        altText: blogPage.data.cta.altText,
        phoneTextOne: blogPage.data.cta.phoneTextOne,
        phoneTextTwo: blogPage.data.cta.phoneTextTwo,
        phoneNumber: blogPage.data.cta.phoneNumber,
      },
    },
  };
}

export async function fetchInsuranceData(): Promise<Insurance> {
  const insurancePages = await getCollection(
    "pages",
    (page) => page.id === "insurance"
  );

  const insurance = insurancePages[0];

  return {
    data: {
      hero: {
        heading: insurance.data.hero.heading,
        text: insurance.data.hero.text,
        buttonText: insurance.data.hero.buttonText,
        buttonLink: insurance.data.hero.buttonLink,
        phoneQuestionText: insurance.data.hero.phoneQuestionText,
        treatmentsLabel: insurance.data.hero.treatmentsLabel,
        callButtonText: insurance.data.hero.callButtonText,
        callButtonLink: insurance.data.hero.callButtonLink,
      },
      contactHero: {
        title: {
          line1: insurance.data.contactHero.title.line1,
          line2: insurance.data.contactHero.title.line2,
          line3: insurance.data.contactHero.title.line3,
        },
        description: insurance.data.contactHero.description,
        bottomDescription: insurance.data.contactHero.bottomDescription,
        formTitle: insurance.data.contactHero.formTitle,
        formSubtitle: insurance.data.contactHero.formSubtitle,
        insuranceProviders: insurance.data.contactHero.insuranceProviders.map(
          (provider) => ({
            name: provider.name,
          })
        ),
        privacyNotice: insurance.data.contactHero.privacyNotice,
      },
      insuranceProviders: {
        heading: insurance.data.insuranceProviders.heading,
        subheading: insurance.data.insuranceProviders.subheading,
        buttonText: insurance.data.insuranceProviders.buttonText,
        buttonLink: insurance.data.insuranceProviders.buttonLink,
        callText: insurance.data.insuranceProviders.callText,
        callTextTwo: insurance.data.insuranceProviders.callTextTwo,
        phoneNumber: insurance.data.insuranceProviders.phoneNumber,
        footerText: insurance.data.insuranceProviders.footerText,
        verifyButtonText: insurance.data.insuranceProviders.verifyButtonText,
        verifyButtonLink: insurance.data.insuranceProviders.verifyButtonLink,
        providers: insurance.data.insuranceProviders.providers.map(
          (provider) => ({
            name: provider.name,
            description: provider.description,
            logo: provider.logo,
          })
        ),
      },

      treatmentGrid: {
        heading: insurance.data.treatmentGrid.heading,
        subheading: insurance.data.treatmentGrid.subheading,
        description: insurance.data.treatmentGrid.description,
        featuredImage: insurance.data.treatmentGrid.featuredImage,
        treatments: insurance.data.treatmentGrid.treatments.map(
          (treatment: any) => ({
            icon: treatment.icon,
            title: treatment.title,
            description: treatment.description,
            link: treatment.link,
          })
        ),
      },
      cta: {
        heading: insurance.data.cta.heading,
        text: insurance.data.cta.text,
        buttonText: insurance.data.cta.buttonText,
        buttonLink: insurance.data.cta.buttonLink,
        image: insurance.data.cta.image,
        altText: insurance.data.cta.altText,
        phoneTextOne: insurance.data.cta.phoneTextOne,
        phoneTextTwo: insurance.data.cta.phoneTextTwo,
        phoneNumber: insurance.data.cta.phoneNumber,
      },
      insuranceVerification: {
        title: {
          line1: insurance.data.insuranceVerification.title.line1,
          line2: insurance.data.insuranceVerification.title.line2,
        },
        description: insurance.data.insuranceVerification.description,
        features: insurance.data.insuranceVerification.features.map(
          (feature) => ({
            text: feature.text,
          })
        ),
        cta: {
          heading: insurance.data.insuranceVerification.cta.heading,
          subheading: insurance.data.insuranceVerification.cta.subheading,
          buttonText: insurance.data.insuranceVerification.cta.buttonText,
          buttonLink: insurance.data.insuranceVerification.cta.buttonLink,
          callText: insurance.data.insuranceVerification.cta.callText,
          callTextTwo: insurance.data.insuranceVerification.cta.callTextTwo,
          phoneNumber: insurance.data.insuranceVerification.cta.phoneNumber,
        },
      },
    },
  };
}

export async function fetchLocationData(): Promise<Location> {
  const [locationPage] = await getCollection(
    "pages",
    (page) => page.id === "location"
  );
  const locationData = locationPage.data as Location["data"];

  return {
    data: {
      hero: {
        heading: locationData.hero.heading,
        text: locationData.hero.text,
        buttonText: locationData.hero.buttonText,
        buttonLink: locationData.hero.buttonLink,
        phoneQuestionText: locationData.hero.phoneQuestionText,
        treatmentsLabel: locationData.hero.treatmentsLabel,
        callButtonText: locationData.hero.callButtonText,
        callButtonLink: locationData.hero.callButtonLink,
      },
      locationHero: {
        header: locationData.locationHero.header,
        subheaderHighlight: locationData.locationHero.subheaderHighlight,
        description: locationData.locationHero.description,
        locationInfo: {
          title: locationData.locationHero.locationInfo.title,
          addressLine1: locationData.locationHero.locationInfo.addressLine1,
          addressLine2: locationData.locationHero.locationInfo.addressLine2,
          email: locationData.locationHero.locationInfo.email,
          phone: locationData.locationHero.locationInfo.phone,
          hours: locationData.locationHero.locationInfo.hours,
          buttonText: locationData.locationHero.locationInfo.buttonText,
          buttonLink: locationData.locationHero.locationInfo.buttonLink,
        },
      },
      therapies: locationData.therapies,
      programs: locationData.programs,
      services: locationData.services,
      patientJourney: locationData.patientJourney,
      disorders: {
        heading: locationData.disorders.heading,
        headingTwo_Part_1: locationData.disorders.headingTwo_Part_1,
        headingTwo_Part_2: locationData.disorders.headingTwo_Part_2,
        headingTwo_Part_3: locationData.disorders.headingTwo_Part_3,
        disorders: locationData.disorders.disorders.map((disorder: any) => ({
          link: disorder.link,
          title: disorder.title,
          image: disorder.image,
        })),
      },
      faq: locationData.faq,
      insuranceOptions: locationData.insuranceOptions,
      testimonials: locationData.testimonials,
      about: locationData.about,
      cta: {
        heading: locationData.cta.heading,
        text: locationData.cta.text,
        buttonText: locationData.cta.buttonText,
        buttonLink: locationData.cta.buttonLink,
        image: locationData.cta.image,
        altText: locationData.cta.altText,
        phoneTextOne: locationData.cta.phoneTextOne,
        phoneTextTwo: locationData.cta.phoneTextTwo,
        phoneNumber: locationData.cta.phoneNumber,
      },
    },
  };
}

export async function fetchLocationHomeData(
  locationSlug: string
): Promise<Home> {
  const [locationHome] = await getCollection(
    "locations",
    (item) => item.id === locationSlug
  );

  const locationData = locationHome.data as Location["data"];

  return {
    data: {
      hero: {
        backgroundImage: locationHome.data.hero.backgroundImage,
        backgroundImageAlt: locationHome.data.hero.backgroundImageAlt,
        logo: locationHome.data.hero.logo,
        buttonText: locationHome.data.hero.buttonText,
        textBox1: locationHome.data.hero.textBox1,
        textBox2_Part_1: locationHome.data.hero.textBox2_Part_1,
        textBox2_Part_2: locationHome.data.hero.textBox2_Part_2,
        textBox2_Part_3: locationHome.data.hero.textBox2_Part_3,
        textBox3: locationHome.data.hero.textBox3,
        buttonOne: locationHome.data.hero.buttonOne,
        buttonOneLink: locationHome.data.hero.buttonOneLink,
        buttonTwo: locationHome.data.hero.buttonTwo,
        telephoneNumber: locationHome.data.hero.telephoneNumber,
      },
      about: {
        headingOne_Part_1: locationHome.data.about.headingOne_Part_1,
        headingOne_Part_2: locationHome.data.about.headingOne_Part_2,
        headingTwo: locationHome.data.about.headingTwo,
        textOne: locationHome.data.about.textOne,
        buttonOne: locationHome.data.about.buttonOne,
        buttonOneLink: locationHome.data.about.buttonOneLink,
        buttonTwo_Part_1: locationHome.data.about.buttonTwo_Part_1,
        buttonTwo_Part_2: locationHome.data.about.buttonTwo_Part_2,
        buttonTwo_Number: locationHome.data.about.buttonTwo_Number,
      },
      testimonials: {
        list: locationHome.data.testimonials.list.map((testimonial: any) => ({
          name: testimonial.name,
          position: testimonial.position,
          text: testimonial.text,
          image: testimonial.image,
        })),
      },
      therapies: {
        image: (locationHome.data.therapies as any)?.image,
        mainHeading: (locationHome.data.therapies as any)?.mainHeading,
        coloredHeading: (locationHome.data.therapies as any)?.coloredHeading,
        description: (locationHome.data.therapies as any)?.description,
        buttonText: (locationHome.data.therapies as any)?.buttonText,
        buttonLink: (locationHome.data.therapies as any)?.buttonLink,
        buttonTwo_Part_1: (locationHome.data.therapies as any)
          ?.buttonTwo_Part_1,
        buttonTwo_Part_2: (locationHome.data.therapies as any)
          ?.buttonTwo_Part_2,
        buttonTwo_Number: (locationHome.data.therapies as any)
          ?.buttonTwo_Number,
        list: (locationHome.data.therapies as any)?.list.map(
          (therapy: Therapy) => ({
            title: therapy.title,
            description: therapy.description,
            image: therapy.image,
            link: therapy.link || "#",
          })
        ),
      },
      programs: {
        heading: (locationHome.data as any).programs?.heading || "",
        text: (locationHome.data as any).programs?.text || "",
        programs: (locationHome.data as any).programs?.programs
          ? (locationHome.data as any).programs.programs.map(
              (program: any) => ({
                title: program.title,
                image: program.image,
                link: program.link,
              })
            )
          : [],
      },
      services: {
        heading: (locationHome.data as any).services?.heading || "",
        description: (locationHome.data as any).services?.description || "",
        services: (locationHome.data as any).services?.services
          ? (locationHome.data as any).services.services.map(
              (service: any) => ({
                iconName: service.iconName,
                title: service.title,
                description: service.description,
              })
            )
          : [],
      },
      patientJourney: {
        heading: (locationHome.data.patientJourney as any)?.heading || "",
        headingTwo_Part_1:
          (locationHome.data.patientJourney as any)?.headingTwo_Part_1 || "",
        headingTwo_Part_2:
          (locationHome.data.patientJourney as any)?.headingTwo_Part_2 || "",
        image: (locationHome.data.patientJourney as any)?.image || "",
        imageAlt: (locationHome.data.patientJourney as any)?.imageAlt || "",
        steps:
          (locationHome.data.patientJourney as any)?.steps?.map(
            (journey: any) => ({
              title: journey.title,
              description: journey.description,
            })
          ) || [],
      },
      disorders: {
        heading: (locationHome.data as any).disorders?.heading || "",
        headingTwo_Part_1:
          (locationHome.data as any).disorders?.headingTwo_Part_1 || "",
        headingTwo_Part_2:
          (locationHome.data as any).disorders?.headingTwo_Part_2 || "",
        headingTwo_Part_3:
          (locationHome.data as any).disorders?.headingTwo_Part_3 || "",
        disorders: (locationHome.data as any).disorders?.disorders
          ? (locationHome.data as any).disorders.disorders.map(
              (disorder: any) => ({
                link: disorder.link,
                title: disorder.title,
                image: disorder.image,
              })
            )
          : [],
      },
      faq: {
        heading: (locationHome.data as any).faq?.heading || "",
        subheading: (locationHome.data as any).faq?.subheading || "",
        faq: (locationHome.data as any).faq?.faq
          ? (locationHome.data as any).faq.faq.map((faqItem: any) => ({
              title: faqItem.title,
              details: faqItem.details,
            }))
          : [],
      },
      insuranceOptions: {
        headingOne: (locationHome.data.insuranceOptions as any).headingOne,
        headingTwo: (locationHome.data.insuranceOptions as any).headingTwo,
        description: (locationHome.data.insuranceOptions as any).description,
        buttonOneText: (locationHome.data.insuranceOptions as any)
          .buttonOneText,
        buttonOneLink: (locationHome.data.insuranceOptions as any)
          .buttonOneLink,
        buttonTwoTextOne: (locationHome.data.insuranceOptions as any)
          .buttonSecondTextOne,
        buttonTwoTextTwo: (locationHome.data.insuranceOptions as any)
          .buttonSecondTextTwo,
        buttonTwoLink: (locationHome.data.insuranceOptions as any)
          .buttonSecondLink,
        insuranceOptions: (
          locationHome.data.insuranceOptions as any
        ).insuranceOptions.map((option: any) => ({
          logo: option.logo,
          alt: option.alt,
        })),
      },
      cta: {
        heading: (locationHome.data as any).cta?.heading || "",
        text: (locationHome.data as any).cta?.text || "",
        buttonText: (locationHome.data as any).cta?.buttonText || "",
        buttonLink: (locationHome.data as any).cta?.buttonLink || "",
        image: (locationHome.data as any).cta?.image || "",
        altText: (locationHome.data as any).cta?.altText || "",
        phoneTextOne: (locationHome.data as any).cta?.phoneTextOne || "",
        phoneTextTwo: (locationHome.data as any).cta?.phoneTextTwo || "",
        phoneNumber: (locationHome.data as any).cta?.phoneNumber || "",
      },
      treatmentGrid: {
        heading: (locationHome.data as any).treatmentGrid?.heading || "",
        subheading: (locationHome.data as any).treatmentGrid?.subheading || "",
        description:
          (locationHome.data as any).treatmentGrid?.description || "",
        featuredImage:
          (locationHome.data as any).treatmentGrid?.featuredImage || "",
        featuredImageAlt:
          (locationHome.data as any).treatmentGrid?.featuredImageAlt || "",
        treatments: (locationHome.data as any).treatmentGrid?.treatments
          ? (locationHome.data as any).treatmentGrid.treatments.map(
              (treatment: any) => ({
                icon: treatment.icon,
                title: treatment.title,
                description: treatment.description,
                link: treatment.link,
              })
            )
          : [],
      },
    },
  };
}

export async function fetchLocationProgramData(
  locationSlug: string,
  programSlug: string
): Promise<Program> {
  // First try to get location-specific treatment data
  try {
    const [locationTreatment] = await getCollection(
      "location_program",
      (item) => item.id === `${locationSlug}-${programSlug}`
    );

    return {
      data: {
        title: locationTreatment.data.title,
        hero: {
          heading: locationTreatment.data.hero.heading,
          text: locationTreatment.data.hero.text,
          buttonText: locationTreatment.data.hero.buttonText,
          buttonLink: locationTreatment.data.hero.buttonLink,
          phoneQuestionText: locationTreatment.data.hero.phoneQuestionText,
          treatmentsLabel: locationTreatment.data.hero.treatmentsLabel,
          callButtonText: locationTreatment.data.hero.callButtonText,
          callButtonLink: locationTreatment.data.hero.callButtonLink,
        },
        about: {
          headingOne: locationTreatment.data.about.headingOne,
          headingTwo: locationTreatment.data.about.headingTwo,
          textOne: locationTreatment.data.about.textOne,
          textTwo: locationTreatment.data.about.textTwo,
          buttonText: locationTreatment.data.about.buttonText,
          buttonLink: locationTreatment.data.about.buttonLink,
          buttonTwo_Part_1: locationTreatment.data.about.buttonTwo_Part_1,
          buttonTwo_Part_2: locationTreatment.data.about.buttonTwo_Part_2,
          buttonTwo_Number: locationTreatment.data.about.buttonTwo_Number,
          images: {
            imageOne: locationTreatment.data.about.images.imageOne,
            imageTwo: locationTreatment.data.about.images.imageTwo,
          },
        },
        video: {
          heading: locationTreatment.data.video.heading,
          headingColored: locationTreatment.data.video.headingColored,
          description: locationTreatment.data.video.description,
          image: locationTreatment.data.video.image,
          imageAlt: locationTreatment.data.video.imageAlt,
        },
        team: {
          heading: (locationTreatment.data as any).team?.heading || "",
          description: (locationTreatment.data as any).team?.description || "",
          team: (locationTreatment.data as any).team?.team
            ? (locationTreatment.data as any).team.team.map((member: any) => ({
                name: member.name,
                designation: member.designation,
                image: member.image,
              }))
            : [],
        },
        nextSteps: {
          heading: (locationTreatment.data as any).nextSteps?.heading || "",
          description:
            (locationTreatment.data as any).nextSteps?.description || "",
          nextSteps: (locationTreatment.data as any).nextSteps?.nextSteps
            ? (locationTreatment.data as any).nextSteps.nextSteps.map(
                (step: any) => ({
                  title: step.title,
                  linkOne: step.linkOne,
                  linkOneUrl: step.linkOneUrl,
                  linkTwo: step.linkTwo,
                  linkTwoUrl: step.linkTwoUrl,
                })
              )
            : [],
        },
        singleReview: {
          heading: (locationTreatment.data as any).singleReview?.heading || "",
          description:
            (locationTreatment.data as any).singleReview?.description || "",
          buttonText:
            (locationTreatment.data as any).singleReview?.buttonText || "",
          cardDetail:
            (locationTreatment.data as any).singleReview?.cardDetail || "",
          cardTitle:
            (locationTreatment.data as any).singleReview?.cardTitle || "",
        },
        pdf: {
          heading: (locationTreatment.data as any).pdf?.heading || "",
          description: (locationTreatment.data as any).pdf?.description || "",
          pdf: {
            link: (locationTreatment.data as any).pdf?.pdf?.link || "",
            linkUrl: (locationTreatment.data as any).pdf?.pdf?.linkUrl || "",
          },
        },
        howWeTreat: {
          heading: (locationTreatment.data as any).howWeTreat?.heading || "",
          description:
            (locationTreatment.data as any).howWeTreat?.description || "",
          process: (locationTreatment.data as any).howWeTreat?.process
            ? (locationTreatment.data as any).howWeTreat.process.map(
                (process: any) => ({
                  title: process.title,
                  details: process.details,
                })
              )
            : [],
        },
        residentialRehab: {
          img: (locationTreatment.data as any).residentialRehab?.img || "",
          heading:
            (locationTreatment.data as any).residentialRehab?.heading || "",
          description:
            (locationTreatment.data as any).residentialRehab?.description || "",
          cardTitle:
            (locationTreatment.data as any).residentialRehab?.cardTitle || "",
          process: (locationTreatment.data as any).residentialRehab?.process
            ? (locationTreatment.data as any).residentialRehab.process.map(
                (process: any) => ({
                  title: process.title,
                  details: process.details,
                })
              )
            : [],
        },
        therapies: {
          heading: (locationTreatment.data as any).therapies?.heading || "",
          description:
            (locationTreatment.data as any).therapies?.description || "",
          therapies: (locationTreatment.data as any).therapies?.therapies
            ? (locationTreatment.data as any).therapies.therapies.map(
                (therapy: any) => ({
                  title: therapy.title,
                  details: therapy.details,
                })
              )
            : [],
        },
        amenities: {
          img: (locationTreatment.data as any).amenities?.img || "",
          heading: (locationTreatment.data as any).amenities?.heading || "",
          description:
            (locationTreatment.data as any).amenities?.description || "",
        },
        faq: {
          heading: locationTreatment.data.faq.heading,
          subheading: locationTreatment.data.faq.subheading,
          faq: locationTreatment.data.faq.faq.map((item: any) => ({
            title: item.title,
            details: item.details,
          })),
        },
        otherTreatments: {
          heading:
            (locationTreatment.data as any).otherTreatments?.heading || "",
          buttonText:
            (locationTreatment.data as any).otherTreatments?.buttonText || "",
          buttonUrl:
            (locationTreatment.data as any).otherTreatments?.buttonUrl || "",
          cards: (locationTreatment.data as any).otherTreatments?.cards
            ? (locationTreatment.data as any).otherTreatments.cards.map(
                (card: any) => ({
                  title: card.title,
                  buttonText: card.buttonText,
                  image: card.image,
                })
              )
            : [],
        },
        treatmentGrid: {
          heading: (locationTreatment.data as any).treatmentGrid?.heading || "",
          subheading: locationTreatment.data.treatmentGrid.subheading,
          description: locationTreatment.data.treatmentGrid.description,
          featuredImage: locationTreatment.data.treatmentGrid.featuredImage,
          treatments: (
            locationTreatment.data as any
          ).treatmentGrid?.treatments?.map((treatment: any) => ({
            icon: treatment.icon,
            title: treatment.title,
            description: treatment.description,
            link: treatment.link,
          })),
        },
        whyChoose: {
          headingOne:
            (locationTreatment.data as any).whyChoose?.headingOne || "",
          headingTwo:
            (locationTreatment.data as any).whyChoose?.headingTwo || "",
          textOne: (locationTreatment.data as any).whyChoose?.textOne || "",
          textTwo: (locationTreatment.data as any).whyChoose?.textTwo || "",
          buttonText:
            (locationTreatment.data as any).whyChoose?.buttonText || "",
          buttonLink:
            (locationTreatment.data as any).whyChoose?.buttonLink || "",
          buttonTwo_Part_1:
            (locationTreatment.data as any).whyChoose?.buttonTwo_Part_1 || "",
          buttonTwo_Part_2:
            (locationTreatment.data as any).whyChoose?.buttonTwo_Part_2 || "",
          buttonTwo_Number:
            (locationTreatment.data as any).whyChoose?.buttonTwo_Number || "",
          images: {
            imageOne:
              (locationTreatment.data as any).whyChoose?.images?.imageOne || "",
            imageTwo:
              (locationTreatment.data as any).whyChoose?.images?.imageTwo || "",
          },
        },
        benefits: {
          headingOne:
            (locationTreatment.data as any).benefits?.headingOne || "",
          headingTwo:
            (locationTreatment.data as any).benefits?.headingTwo || "",
          textOne: (locationTreatment.data as any).benefits?.textOne || "",
          textTwo: (locationTreatment.data as any).benefits?.textTwo || "",
          buttonText:
            (locationTreatment.data as any).benefits?.buttonText || "",
          buttonLink:
            (locationTreatment.data as any).benefits?.buttonLink || "",
          buttonTwo_Part_1:
            (locationTreatment.data as any).benefits?.buttonTwo_Part_1 || "",
          buttonTwo_Part_2:
            (locationTreatment.data as any).benefits?.buttonTwo_Part_2 || "",
          buttonTwo_Number:
            (locationTreatment.data as any).benefits?.buttonTwo_Number || "",
          images: {
            imageOne:
              (locationTreatment.data as any).benefits?.images?.imageOne || "",
            imageTwo:
              (locationTreatment.data as any).benefits?.images?.imageTwo || "",
          },
        },
        whoNeeds: {
          heading: locationTreatment.data.whoNeeds.heading,
          headingColored: locationTreatment.data.whoNeeds.headingColored,
          headingEnd: locationTreatment.data.whoNeeds.headingEnd,
          description: locationTreatment.data.whoNeeds.description,
          listHeading: locationTreatment.data.whoNeeds.listHeading,
          listItems: locationTreatment.data.whoNeeds.listItems,
          listDescription: locationTreatment.data.whoNeeds.listDescription,
          buttonText: locationTreatment.data.whoNeeds.buttonText,
          buttonLink: locationTreatment.data.whoNeeds.buttonLink,
          buttonTwo_Part_1: locationTreatment.data.whoNeeds.buttonTwo_Part_1,
          buttonTwo_Part_2: locationTreatment.data.whoNeeds.buttonTwo_Part_2,
          buttonTwo_Number: locationTreatment.data.whoNeeds.buttonTwo_Number,
        },
        program12: {
          badgeText: locationTreatment.data.program12?.badgeText || "",
          heading: locationTreatment.data.program12?.heading || "",
          description: locationTreatment.data.program12?.description || "",
          mainImage: locationTreatment.data.program12?.mainImage || "",
          mainImageAlt: locationTreatment.data.program12?.mainImageAlt || "",
          steps: locationTreatment.data.program12?.steps
            ? locationTreatment.data.program12.steps.map((step: any) => ({
                stepNumber: step.stepNumber,
                title: step.title,
                description: step.description,
              }))
            : [],
        },
        programTMS: {
          mainHeading: locationTreatment.data.programTMS?.mainHeading || "",
          coloredHeading:
            locationTreatment.data.programTMS?.coloredHeading || "",
          description: locationTreatment.data.programTMS?.description || "",
          buttonText: locationTreatment.data.programTMS?.buttonText || "",
          buttonLink: locationTreatment.data.programTMS?.buttonLink || "",
          buttonTwo_Part_1:
            locationTreatment.data.programTMS?.buttonTwo_Part_1 || "",
          buttonTwo_Part_2:
            locationTreatment.data.programTMS?.buttonTwo_Part_2 || "",
          buttonTwo_Number:
            locationTreatment.data.programTMS?.buttonTwo_Number || "",
          image: locationTreatment.data.programTMS?.image || "",
          imageAlt: locationTreatment.data.programTMS?.imageAlt || "",
          conditions: locationTreatment.data.programTMS?.conditions
            ? locationTreatment.data.programTMS.conditions.map(
                (condition: any) => ({
                  title: condition.title,
                  icon: condition.icon || "",
                  description: condition.description || "",
                })
              )
            : [],
        },
        cta: {
          heading: (locationTreatment.data as any).cta?.heading || "",
          text: (locationTreatment.data as any).cta?.text || "",
          buttonText: (locationTreatment.data as any).cta?.buttonText || "",
          buttonLink: (locationTreatment.data as any).cta?.buttonLink || "",
          image: (locationTreatment.data as any).cta?.image || "",
          altText: (locationTreatment.data as any).cta?.altText || "",
          phoneTextOne: (locationTreatment.data as any).cta?.phoneTextOne || "",
          phoneTextTwo: (locationTreatment.data as any).cta?.phoneTextTwo || "",
          phoneNumber: (locationTreatment.data as any).cta?.phoneNumber || "",
        },
        disorders: {
          heading: (locationTreatment.data as any).disorders?.heading || "",
          headingTwo_Part_1:
            (locationTreatment.data as any).disorders?.headingTwo_Part_1 || "",
          headingTwo_Part_2:
            (locationTreatment.data as any).disorders?.headingTwo_Part_2 || "",
          headingTwo_Part_3:
            (locationTreatment.data as any).disorders?.headingTwo_Part_3 || "",
          disorders: (locationTreatment.data as any).disorders?.disorders
            ? (locationTreatment.data as any).disorders.disorders.map(
                (disorder: any) => ({
                  link: disorder.link,
                  title: disorder.title,
                  image: disorder.image,
                })
              )
            : [],
        },
      },
    };
  } catch (error) {
    // Fallback to regular treatment data if location-specific doesn't exist
    return await fetchSubProgramData(programSlug);
  }
}

export async function fetchLocationTreatmentData(
  locationSlug: string,
  treatmentSlug: string
): Promise<Program> {
  // First try to get location-specific treatment data
  try {
    const [locationTreatment] = await getCollection(
      "location_treatment",
      (item) => item.id === `${locationSlug}-${treatmentSlug}`
    );

    return {
      data: {
        title: locationTreatment.data.title,
        hero: {
          heading: locationTreatment.data.hero.heading,
          text: locationTreatment.data.hero.text,
          buttonText: locationTreatment.data.hero.buttonText,
          buttonLink: locationTreatment.data.hero.buttonLink,
          phoneQuestionText: locationTreatment.data.hero.phoneQuestionText,
          treatmentsLabel: locationTreatment.data.hero.treatmentsLabel,
          callButtonText: locationTreatment.data.hero.callButtonText,
          callButtonLink: locationTreatment.data.hero.callButtonLink,
        },
        about: {
          headingOne: locationTreatment.data.about.headingOne,
          headingTwo: locationTreatment.data.about.headingTwo,
          textOne: locationTreatment.data.about.textOne,
          textTwo: locationTreatment.data.about.textTwo,
          buttonText: locationTreatment.data.about.buttonText,
          buttonLink: locationTreatment.data.about.buttonLink,
          buttonTwo_Part_1: locationTreatment.data.about.buttonTwo_Part_1,
          buttonTwo_Part_2: locationTreatment.data.about.buttonTwo_Part_2,
          buttonTwo_Number: locationTreatment.data.about.buttonTwo_Number,
          images: {
            imageOne: locationTreatment.data.about.images.imageOne,
            imageTwo: locationTreatment.data.about.images.imageTwo,
          },
        },
        video: {
          heading: locationTreatment.data.video.heading,
          headingColored: locationTreatment.data.video.headingColored,
          description: locationTreatment.data.video.description,
          image: locationTreatment.data.video.image,
          imageAlt: locationTreatment.data.video.imageAlt,
        },
        team: {
          heading: (locationTreatment.data as any).team?.heading || "",
          description: (locationTreatment.data as any).team?.description || "",
          team: (locationTreatment.data as any).team?.team
            ? (locationTreatment.data as any).team.team.map((member: any) => ({
                name: member.name,
                designation: member.designation,
                image: member.image,
              }))
            : [],
        },
        nextSteps: {
          heading: (locationTreatment.data as any).nextSteps?.heading || "",
          description:
            (locationTreatment.data as any).nextSteps?.description || "",
          nextSteps: (locationTreatment.data as any).nextSteps?.nextSteps
            ? (locationTreatment.data as any).nextSteps.nextSteps.map(
                (step: any) => ({
                  title: step.title,
                  linkOne: step.linkOne,
                  linkOneUrl: step.linkOneUrl,
                  linkTwo: step.linkTwo,
                  linkTwoUrl: step.linkTwoUrl,
                })
              )
            : [],
        },
        singleReview: {
          heading: (locationTreatment.data as any).singleReview?.heading || "",
          description:
            (locationTreatment.data as any).singleReview?.description || "",
          buttonText:
            (locationTreatment.data as any).singleReview?.buttonText || "",
          cardDetail:
            (locationTreatment.data as any).singleReview?.cardDetail || "",
          cardTitle:
            (locationTreatment.data as any).singleReview?.cardTitle || "",
        },
        pdf: {
          heading: (locationTreatment.data as any).pdf?.heading || "",
          description: (locationTreatment.data as any).pdf?.description || "",
          pdf: {
            link: (locationTreatment.data as any).pdf?.pdf?.link || "",
            linkUrl: (locationTreatment.data as any).pdf?.pdf?.linkUrl || "",
          },
        },
        howWeTreat: {
          heading: (locationTreatment.data as any).howWeTreat?.heading || "",
          description:
            (locationTreatment.data as any).howWeTreat?.description || "",
          process: (locationTreatment.data as any).howWeTreat?.process
            ? (locationTreatment.data as any).howWeTreat.process.map(
                (process: any) => ({
                  title: process.title,
                  details: process.details,
                })
              )
            : [],
        },
        residentialRehab: {
          img: (locationTreatment.data as any).residentialRehab?.img || "",
          heading:
            (locationTreatment.data as any).residentialRehab?.heading || "",
          description:
            (locationTreatment.data as any).residentialRehab?.description || "",
          cardTitle:
            (locationTreatment.data as any).residentialRehab?.cardTitle || "",
          process: (locationTreatment.data as any).residentialRehab?.process
            ? (locationTreatment.data as any).residentialRehab.process.map(
                (process: any) => ({
                  title: process.title,
                  details: process.details,
                })
              )
            : [],
        },
        therapies: {
          heading: (locationTreatment.data as any).therapies?.heading || "",
          description:
            (locationTreatment.data as any).therapies?.description || "",
          therapies: (locationTreatment.data as any).therapies?.therapies
            ? (locationTreatment.data as any).therapies.therapies.map(
                (therapy: any) => ({
                  title: therapy.title,
                  details: therapy.details,
                })
              )
            : [],
        },
        amenities: {
          img: (locationTreatment.data as any).amenities?.img || "",
          heading: (locationTreatment.data as any).amenities?.heading || "",
          description:
            (locationTreatment.data as any).amenities?.description || "",
        },
        faq: {
          heading: locationTreatment.data.faq.heading,
          subheading: locationTreatment.data.faq.subheading,
          faq: locationTreatment.data.faq.faq.map((item: any) => ({
            title: item.title,
            details: item.details,
          })),
        },
        otherTreatments: {
          heading:
            (locationTreatment.data as any).otherTreatments?.heading || "",
          buttonText:
            (locationTreatment.data as any).otherTreatments?.buttonText || "",
          buttonUrl:
            (locationTreatment.data as any).otherTreatments?.buttonUrl || "",
          cards: (locationTreatment.data as any).otherTreatments?.cards
            ? (locationTreatment.data as any).otherTreatments.cards.map(
                (card: any) => ({
                  title: card.title,
                  buttonText: card.buttonText,
                  image: card.image,
                })
              )
            : [],
        },
        treatmentGrid: {
          heading: (locationTreatment.data as any).treatmentGrid?.heading || "",
          subheading: locationTreatment.data.treatmentGrid.subheading,
          description: locationTreatment.data.treatmentGrid.description,
          featuredImage: locationTreatment.data.treatmentGrid.featuredImage,
          treatments: (
            locationTreatment.data as any
          ).treatmentGrid?.treatments?.map((treatment: any) => ({
            icon: treatment.icon,
            title: treatment.title,
            description: treatment.description,
            link: treatment.link,
          })),
        },
        whyChoose: {
          headingOne:
            (locationTreatment.data as any).whyChoose?.headingOne || "",
          headingTwo:
            (locationTreatment.data as any).whyChoose?.headingTwo || "",
          textOne: (locationTreatment.data as any).whyChoose?.textOne || "",
          textTwo: (locationTreatment.data as any).whyChoose?.textTwo || "",
          buttonText:
            (locationTreatment.data as any).whyChoose?.buttonText || "",
          buttonLink:
            (locationTreatment.data as any).whyChoose?.buttonLink || "",
          buttonTwo_Part_1:
            (locationTreatment.data as any).whyChoose?.buttonTwo_Part_1 || "",
          buttonTwo_Part_2:
            (locationTreatment.data as any).whyChoose?.buttonTwo_Part_2 || "",
          buttonTwo_Number:
            (locationTreatment.data as any).whyChoose?.buttonTwo_Number || "",
          images: {
            imageOne:
              (locationTreatment.data as any).whyChoose?.images?.imageOne || "",
            imageTwo:
              (locationTreatment.data as any).whyChoose?.images?.imageTwo || "",
          },
        },
        benefits: {
          headingOne:
            (locationTreatment.data as any).benefits?.headingOne || "",
          headingTwo:
            (locationTreatment.data as any).benefits?.headingTwo || "",
          textOne: (locationTreatment.data as any).benefits?.textOne || "",
          textTwo: (locationTreatment.data as any).benefits?.textTwo || "",
          buttonText:
            (locationTreatment.data as any).benefits?.buttonText || "",
          buttonLink:
            (locationTreatment.data as any).benefits?.buttonLink || "",
          buttonTwo_Part_1:
            (locationTreatment.data as any).benefits?.buttonTwo_Part_1 || "",
          buttonTwo_Part_2:
            (locationTreatment.data as any).benefits?.buttonTwo_Part_2 || "",
          buttonTwo_Number:
            (locationTreatment.data as any).benefits?.buttonTwo_Number || "",
          images: {
            imageOne:
              (locationTreatment.data as any).benefits?.images?.imageOne || "",
            imageTwo:
              (locationTreatment.data as any).benefits?.images?.imageTwo || "",
          },
        },
        whoNeeds: {
          heading: locationTreatment.data.whoNeeds.heading,
          headingColored: locationTreatment.data.whoNeeds.headingColored,
          headingEnd: locationTreatment.data.whoNeeds.headingEnd,
          description: locationTreatment.data.whoNeeds.description,
          listHeading: locationTreatment.data.whoNeeds.listHeading,
          listItems: locationTreatment.data.whoNeeds.listItems,
          listDescription: locationTreatment.data.whoNeeds.listDescription,
          buttonText: locationTreatment.data.whoNeeds.buttonText,
          buttonLink: locationTreatment.data.whoNeeds.buttonLink,
          buttonTwo_Part_1: locationTreatment.data.whoNeeds.buttonTwo_Part_1,
          buttonTwo_Part_2: locationTreatment.data.whoNeeds.buttonTwo_Part_2,
          buttonTwo_Number: locationTreatment.data.whoNeeds.buttonTwo_Number,
        },
        program12: {
          badgeText: locationTreatment.data.program12?.badgeText || "",
          heading: locationTreatment.data.program12?.heading || "",
          description: locationTreatment.data.program12?.description || "",
          mainImage: locationTreatment.data.program12?.mainImage || "",
          mainImageAlt: locationTreatment.data.program12?.mainImageAlt || "",
          steps: locationTreatment.data.program12?.steps
            ? locationTreatment.data.program12.steps.map((step: any) => ({
                stepNumber: step.stepNumber,
                title: step.title,
                description: step.description,
              }))
            : [],
        },
        programTMS: {
          mainHeading: locationTreatment.data.programTMS?.mainHeading || "",
          coloredHeading:
            locationTreatment.data.programTMS?.coloredHeading || "",
          description: locationTreatment.data.programTMS?.description || "",
          buttonText: locationTreatment.data.programTMS?.buttonText || "",
          buttonLink: locationTreatment.data.programTMS?.buttonLink || "",
          buttonTwo_Part_1:
            locationTreatment.data.programTMS?.buttonTwo_Part_1 || "",
          buttonTwo_Part_2:
            locationTreatment.data.programTMS?.buttonTwo_Part_2 || "",
          buttonTwo_Number:
            locationTreatment.data.programTMS?.buttonTwo_Number || "",
          image: locationTreatment.data.programTMS?.image || "",
          imageAlt: locationTreatment.data.programTMS?.imageAlt || "",
          conditions: locationTreatment.data.programTMS?.conditions
            ? locationTreatment.data.programTMS.conditions.map(
                (condition: any) => ({
                  title: condition.title,
                  icon: condition.icon || "",
                  description: condition.description || "",
                })
              )
            : [],
        },
        cta: {
          heading: (locationTreatment.data as any).cta?.heading || "",
          text: (locationTreatment.data as any).cta?.text || "",
          buttonText: (locationTreatment.data as any).cta?.buttonText || "",
          buttonLink: (locationTreatment.data as any).cta?.buttonLink || "",
          image: (locationTreatment.data as any).cta?.image || "",
          altText: (locationTreatment.data as any).cta?.altText || "",
          phoneTextOne: (locationTreatment.data as any).cta?.phoneTextOne || "",
          phoneTextTwo: (locationTreatment.data as any).cta?.phoneTextTwo || "",
          phoneNumber: (locationTreatment.data as any).cta?.phoneNumber || "",
        },
        disorders: {
          heading: (locationTreatment.data as any).disorders?.heading || "",
          headingTwo_Part_1:
            (locationTreatment.data as any).disorders?.headingTwo_Part_1 || "",
          headingTwo_Part_2:
            (locationTreatment.data as any).disorders?.headingTwo_Part_2 || "",
          headingTwo_Part_3:
            (locationTreatment.data as any).disorders?.headingTwo_Part_3 || "",
          disorders: (locationTreatment.data as any).disorders?.disorders
            ? (locationTreatment.data as any).disorders.disorders.map(
                (disorder: any) => ({
                  link: disorder.link,
                  title: disorder.title,
                  image: disorder.image,
                })
              )
            : [],
        },
      },
    };
  } catch (error) {
    // Fallback to regular treatment data if location-specific doesn't exist
    return await fetchSubTreatmentData(treatmentSlug);
  }
}

export async function fetchSubTreatmentData(
  sub_page: string
): Promise<Program> {
  const type = sub_page;
  const [programData] = await getCollection(
    "treatments",
    (item) => item.id === type
  );

  return {
    data: {
      title: programData.data.title,
      hero: {
        heading: programData.data.hero.heading,
        text: programData.data.hero.text,
        buttonText: programData.data.hero.buttonText,
        buttonLink: programData.data.hero.buttonLink,
        phoneQuestionText: programData.data.hero.phoneQuestionText,
        treatmentsLabel: programData.data.hero.treatmentsLabel,
        callButtonText: programData.data.hero.callButtonText,
        callButtonLink: programData.data.hero.callButtonLink,
      },
      about: {
        headingOne: programData.data.about.headingOne,
        headingTwo: programData.data.about.headingTwo,
        textOne: programData.data.about.textOne,
        textTwo: programData.data.about.textTwo,
        buttonText: programData.data.about.buttonText,
        buttonLink: programData.data.about.buttonLink,
        buttonTwo_Part_1: programData.data.about.buttonTwo_Part_1,
        buttonTwo_Part_2: programData.data.about.buttonTwo_Part_2,
        buttonTwo_Number: programData.data.about.buttonTwo_Number,
        images: {
          imageOne: programData.data.about?.images?.imageOne || "",
          imageTwo: programData.data.about?.images?.imageTwo || "",
        },
      },
      video: {
        heading: programData.data.video.heading,
        headingColored: programData.data.video.headingColored,
        description: programData.data.video.description,
        image: programData.data.video.image,
        imageAlt: programData.data.video.imageAlt,
      },
      team: {
        heading: programData.data.team?.heading || "",
        description: programData.data.team?.description || "",
        team: (programData.data.team?.team || []).map((member: any) => ({
          name: member.name,
          designation: member.designation,
          image: member.image,
        })),
      },
      nextSteps: {
        heading: programData.data.nextSteps.heading,
        description: programData.data.nextSteps.description,
        nextSteps: programData.data.nextSteps.nextSteps.map((step: any) => ({
          title: step.title,
          linkOne: step.linkOne,
          linkOneUrl: step.linkOneUrl,
          linkTwo: step.linkTwo,
          linkTwoUrl: step.linkTwoUrl,
        })),
      },
      singleReview: {
        heading: programData.data.singleReview.heading,
        description: programData.data.singleReview.description,
        buttonText: programData.data.singleReview.buttonText,
        cardDetail: programData.data.singleReview.cardDetail,
        cardTitle: programData.data.singleReview.cardTitle,
      },
      pdf: {
        heading: programData.data.pdf.heading,
        description: programData.data.pdf.description,
        pdf: {
          link: programData.data.pdf.pdf.link,
          linkUrl: programData.data.pdf.pdf.linkUrl,
        },
      },
      howWeTreat: {
        heading: programData.data.howWeTreat?.heading || "",
        description: programData.data.howWeTreat?.description || "",
        process: (programData.data.howWeTreat?.process || []).map((process: any) => ({
          title: process.title,
          details: process.details,
        })),
      },
      residentialRehab: {
        img: programData.data.residentialRehab?.img || "",
        heading: programData.data.residentialRehab?.heading || "",
        description: programData.data.residentialRehab?.description || "",
        cardTitle: programData.data.residentialRehab?.cardTitle || "",
        process: (programData.data.residentialRehab?.process || []).map(
          (process: any) => ({
            title: process.title,
            details: process.details,
          })
        ),
      },
      therapies: {
        heading: programData.data.therapies.heading,
        description: programData.data.therapies.description,
        therapies: programData.data.therapies.therapies.map((therapy: any) => ({
          title: therapy.title,
          details: therapy.details,
        })),
      },
      amenities: {
        img: programData.data.amenities?.img || "",
        heading: programData.data.amenities?.heading || "",
        description: programData.data.amenities?.description || "",
      },
      cta: {
        heading: programData.data.cta.heading,
        text: programData.data.cta.text,
        buttonText: programData.data.cta.buttonText,
        buttonLink: programData.data.cta.buttonLink,
        image: programData.data.cta.image,
        altText: programData.data.cta.altText,
        phoneTextOne: programData.data.cta.phoneTextOne,
        phoneTextTwo: programData.data.cta.phoneTextTwo,
        phoneNumber: programData.data.cta.phoneNumber,
      },
      disorders: {
        heading: programData.data.disorders.heading,
        headingTwo_Part_1: programData.data.disorders.headingTwo_Part_1,
        headingTwo_Part_2: programData.data.disorders.headingTwo_Part_2,
        headingTwo_Part_3: programData.data.disorders.headingTwo_Part_3,
        disorders: programData.data.disorders.disorders.map((disorder) => ({
          link: disorder.link,
          title: disorder.title,
          image: disorder.image,
        })),
      },

      faq: {
        heading: programData.data.faq.heading,
        subheading: programData.data.faq.subheading,
        faq: programData.data.faq.faq.map((item: any) => ({
          title: item.title,
          details: item.details,
        })),
      },
      otherTreatments: {
        heading: programData.data.otherTreatments.heading,
        buttonText: programData.data.otherTreatments.buttonText,
        buttonUrl: programData.data.otherTreatments.buttonUrl,
        cards: programData.data.otherTreatments.cards.map((card: any) => ({
          title: card.title,
          buttonText: card.buttonText,
          image: card.image,
        })),
      },
      treatmentGrid: {
        heading: programData.data.treatmentGrid.heading,
        subheading: programData.data.treatmentGrid.subheading,
        description: programData.data.treatmentGrid.description,
        featuredImage: programData.data.treatmentGrid.featuredImage,
        treatments: programData.data.treatmentGrid.treatments.map(
          (treatment: any) => ({
            icon: treatment.icon,
            title: treatment.title,
            description: treatment.description,
            link: treatment.link,
          })
        ),
      },
      whyChoose: {
        headingOne: programData.data.whyChoose?.headingOne || "",
        headingTwo: programData.data.whyChoose?.headingTwo || "",
        textOne: programData.data.whyChoose?.textOne || "",
        textTwo: programData.data.whyChoose?.textTwo || "",
        buttonText: programData.data.whyChoose?.buttonText || "",
        buttonLink: programData.data.whyChoose?.buttonLink || "",
        buttonTwo_Part_1: programData.data.whyChoose?.buttonTwo_Part_1 || "",
        buttonTwo_Part_2: programData.data.whyChoose?.buttonTwo_Part_2 || "",
        buttonTwo_Number: programData.data.whyChoose?.buttonTwo_Number || "",
        images: {
          imageOne: programData.data.whyChoose?.images?.imageOne || "",
          imageTwo: programData.data.whyChoose?.images?.imageTwo || "",
        },
      },
      benefits: {
        headingOne: programData.data.benefits?.headingOne || "",
        headingTwo: programData.data.benefits?.headingTwo || "",
        textOne: programData.data.benefits?.textOne || "",
        textTwo: programData.data.benefits?.textTwo || "",
        buttonText: programData.data.benefits?.buttonText || "",
        buttonLink: programData.data.benefits?.buttonLink || "",
        buttonTwo_Part_1: programData.data.benefits?.buttonTwo_Part_1 || "",
        buttonTwo_Part_2: programData.data.benefits?.buttonTwo_Part_2 || "",
        buttonTwo_Number: programData.data.benefits?.buttonTwo_Number || "",
        images: {
          imageOne: programData.data.benefits?.images?.imageOne || "",
          imageTwo: programData.data.benefits?.images?.imageTwo || "",
        },
      },
      whoNeeds: {
        heading: programData.data.whoNeeds.heading,
        headingColored: programData.data.whoNeeds.headingColored,
        headingEnd: programData.data.whoNeeds.headingEnd,
        description: programData.data.whoNeeds.description,
        listHeading: programData.data.whoNeeds.listHeading,
        listItems: programData.data.whoNeeds.listItems,
        listDescription: programData.data.whoNeeds.listDescription,
        buttonText: programData.data.whoNeeds.buttonText,
        buttonLink: programData.data.whoNeeds.buttonLink,
        buttonTwo_Part_1: programData.data.whoNeeds.buttonTwo_Part_1,
        buttonTwo_Part_2: programData.data.whoNeeds.buttonTwo_Part_2,
        buttonTwo_Number: programData.data.whoNeeds.buttonTwo_Number,
      },
      program12: {
        badgeText: programData.data.program12.badgeText,
        heading: programData.data.program12.heading,
        description: programData.data.program12.description,
        mainImage: programData.data.program12.mainImage,
        mainImageAlt: programData.data.program12.mainImageAlt,
        steps: programData.data.program12.steps.map((step: any) => ({
          stepNumber: step.stepNumber,
          title: step.title,
          description: step.description,
        })),
      },
      programTMS: {
        mainHeading: programData.data.programTMS.mainHeading,
        coloredHeading: programData.data.programTMS.coloredHeading,
        description: programData.data.programTMS.description,
        buttonText: programData.data.programTMS.buttonText,
        buttonLink: programData.data.programTMS.buttonLink,
        buttonTwo_Part_1: programData.data.programTMS.buttonTwo_Part_1,
        buttonTwo_Part_2: programData.data.programTMS.buttonTwo_Part_2,
        buttonTwo_Number: programData.data.programTMS.buttonTwo_Number,
        image: programData.data.programTMS.image,
        imageAlt: programData.data.programTMS.imageAlt,
        conditions: programData.data.programTMS.conditions.map(
          (condition: any) => ({
            title: condition.title,
            icon: condition.icon,
            description: condition.description,
          })
        ),
      },
    },
  };
}
