import { getCollection } from "astro:content";

// Phone numbers have been removed sitewide; users are funnelled to contact forms.
// These functions are kept for backwards compatibility with importing files.
export async function getGlobalPhoneNumber(): Promise<string> {
  return "";
}

export async function getGlobalPhoneDisplayText(): Promise<string> {
  return "";
}

export async function getGlobalData() {
  const [general] = await getCollection("general");
  return {
    phoneNumber: "",
    phoneNumber2: "",
    companyName: general.data.companyName,
    email: general.data.Email,
    city: general.data.city,
    state: general.data.state,
    address: general.data.address,
  };
}
