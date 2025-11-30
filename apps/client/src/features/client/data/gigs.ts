export interface Gig {
  id: string;
  title: string;
  description: string;
  category: string;
  budgetRange: string;
  status: "Open" | "In-Progress" | "Completed" | "Approved" | "Pending Review";
  proposals: number;
  createdAt: string;
}

// export const gigs: Gig[] = []

export const gigs: Gig[] = [
  {
    id: "1",
    title: "Senior Product Designer for SaaD Platforms",
    description: `We are seeking a highly experienced and innovative Senior Product Designer to join our dynamic team, focusing on Software-as-a-Service (SaaS) and Data-as-a-Service (DaaS) platforms. The ideal candidate will have a proven track record of designing intuitive, engaging, and effective user experiences for complex enterprise applications. You will be responsible for the entire design lifecycle, from user research and conceptualization to prototyping, testing, and implementation support. Collaborating closely with product managers, engineers, and other stakeholders, you will translate business requirements and user needs into compelling design solutions that drive product adoption and user satisfaction. Strong communication skills and a deep understanding of modern design tools and methodologies are essential. This role requires a strategic thinker who can balance user desirability, technical feasibility, and business viability to deliver exceptional products.`,
    category: "Product Design",
    budgetRange: "$8000 - $12000",
    status: "Open",
    proposals: 10,
    createdAt: "2025-11-28T09:00:00Z",
  },
  {
    id: "2",
    title: "Full-Stack JavaScript Developer for E-commerce Platform",
    description: `We are looking for a talented Full-Stack JavaScript Developer to enhance our growing e-commerce platform. The successful candidate will work on both front-end (React/Next.js) and back-end (Node.js/Express) development, contributing to new features, optimizations, and maintaining high performance. Experience with database technologies like MongoDB or PostgreSQL, API design, and cloud platforms (AWS, Azure) is highly valued. You should be passionate about writing clean, efficient code and have a strong problem-solving mindset. Join a collaborative team focused on delivering an exceptional online shopping experience to our users.`,
    category: "Web Development",
    budgetRange: "$6000 - $10000",
    status: "Approved",
    proposals: 22,
    createdAt: "2025-11-25T14:30:00Z",
  },
  {
    id: "3",
    title: "AI/Machine Learning Engineer for Predictive Analytics",
    description: `Seeking an experienced AI/Machine Learning Engineer to develop and implement predictive analytics models for our data-driven products. You will be responsible for designing, building, and deploying scalable machine learning solutions, working with large datasets to extract actionable insights. Proficiency in Python, machine learning frameworks (TensorFlow, PyTorch), and cloud-based ML services is essential. A strong understanding of statistical modeling, data preprocessing, and model evaluation techniques is required. This role involves close collaboration with data scientists and product teams to integrate AI capabilities into our core offerings.`,
    category: "Data Science & AI",
    budgetRange: "$10000 - $15000",
    status: "Pending Review",
    proposals: 8,
    createdAt: "2025-11-29T11:00:00Z",
  },
  {
    id: "4",
    title: "UX/UI Designer for Mobile Application",
    description: `We need a creative and user-focused UX/UI Designer to craft engaging interfaces for our upcoming mobile application. You will be involved in every stage of the design process, from user research and wireframing to creating high-fidelity prototypes and final UI specifications. A strong portfolio demonstrating expertise in mobile app design, understanding of iOS and Android design guidelines, and proficiency with design tools like Figma or Sketch is a must. The ideal candidate will have a keen eye for detail and a passion for creating intuitive and beautiful user experiences.`,
    category: "Design",
    budgetRange: "$3000 - $5000",
    status: "Open",
    proposals: 18,
    createdAt: "2025-11-27T16:00:00Z",
  },
  {
    id: "5",
    title: "Technical Content Writer for Developer Documentation",
    description: `Hiring a skilled Technical Content Writer to produce clear, concise, and accurate documentation for our developer API and SDKs. You will work closely with engineering teams to understand complex technical concepts and translate them into user-friendly guides, tutorials, and reference materials. Experience with Markdown, Git, and a developer-centric approach to writing is highly desirable. The ideal candidate will have a strong command of English, an ability to explain technical topics simply, and a passion for helping developers succeed.`,
    category: "Writing & Documentation",
    budgetRange: "$1500 - $2500",
    status: "In-Progress",
    proposals: 5,
    createdAt: "2025-11-26T10:00:00Z",
  },
];
