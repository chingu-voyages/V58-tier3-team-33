export interface Gig {
  id: string;
  title: string;
  description: string;
  budget: number;
  status: "Open" | "In-Progress" | "Completed";
  proposals: number;
}

// export const gigs: Gig[] = []

export const gigs: Gig[] = [
  {
    id: "1",
    title: "E-commerce Website Development",
    description:
      "Looking for a skilled developer to build a full-featured e-commerce website from scratch.",
    budget: 5000,
    status: "Open",
    proposals: 25,
  },
  {
    id: "2",
    title: "Mobile App Design",
    description:
      "Need a creative designer to design a user-friendly mobile app for our new startup.",
    budget: 3000,
    status: "Open",
    proposals: 15,
  },
  {
    id: "3",
    title: "Content Writing for Blog",
    description:
      "Hiring a talented writer to create engaging content for our company blog on a regular basis.",
    budget: 1000,
    status: "In-Progress",
    proposals: 5,
  },
];
