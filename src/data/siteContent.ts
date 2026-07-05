export const contact = {
  whatsappNumber: import.meta.env.VITE_WHATSAPP_NUMBER || "351920807520",
  instagramUrl: import.meta.env.VITE_INSTAGRAM_URL || "https://www.instagram.com/mionga__",
  linkedinUrl: import.meta.env.VITE_LINKEDIN_URL || "",
  email: "hello@mionga.com",
};

export function whatsappLink(message?: string) {
  const cleanNumber = contact.whatsappNumber.replace(/\D/g, "");
  const text = message || "";
  return `https://wa.me/${cleanNumber}${text ? `?text=${encodeURIComponent(text)}` : ""}`;
}

/** Image URLs shared across translations — not language-dependent */
export const serviceImages = [
  "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=80",
];

export const businessSolutionImages = [
  "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=900&q=80",
];

export const processImages = [
  "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=900&q=80",
];

export const processVideo = {
  src: "https://assets.mixkit.co/videos/32833/32833-720.mp4",
  poster: "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1200&q=80",
};

export const trustImages = {
  proof: "https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=1000&q=80",
  team: "https://images.unsplash.com/photo-1556761175-4b46a572b786?auto=format&fit=crop&w=900&q=80",
};
