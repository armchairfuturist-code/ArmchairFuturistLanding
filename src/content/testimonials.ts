/** Testimonial content — presentation-free. */
export interface Testimonial {
  name: string;
  title: string;
  text: string;
  fullText?: string;
  imageSrc?: string;
  dataAiHint?: string;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    imageSrc: "/brenda-fonseca.png",
    name: "Brenda Fonseca",
    title: "PhD",
    text: "I have been working with Alex for four months now and the sessions with him have been a game changer for me. When I first reached out to him, I wasn't even sure what type of training to ask for. Now I have a foundational understanding of what AI actually is and how I can use it as a tool in my daily productivity for both work and personal - even using it to do my own coding to create customized productivity skills. I would highly recommend Alex - he is professional, always prepared and does a great job of tailoring each session to my specific needs and knowledge level. Thanks Alex - I couldn't be happier with my progress!",
    dataAiHint: "profile person",
  },
  {
    imageSrc: "/shannon-myers.jpg",
    name: "Shannon Myers",
    title: "Founder of The Integrative Practitioner",
    text: "I'm a solo small business owner. I do it all, and I love what I do - but there are pieces of running a small business that I don't like doing. Alex is multi-talented. A patient consultant who understands workflows, efficiency, and how to keep things human-centric. He found what was blocking me, got me the technology training I was missing, and built a website that gets seen. He has saved me over $10,000 a year. I save 10 to 20 hours a week now. The technology was the bridge to getting unstuck and more aligned in my life and work. Now I do more of the work I love.",
    fullText: "I'm a solo small business owner. I do it all. I love what I do - but there are pieces of running a small business that I don't like doing. I didn't know what I could outsource. I didn't have updated technology training. I did not know all the tools I could use and for what. And the boring work was the thing keeping me stuck. Alex is multi-talented. A patient consultant who understands workflows, efficiency, and how to keep things human-centric. He looked at what was actually blocking me, taught me the tools, and built a website that felt like me - a digital presence that gets seen. He has saved me over $10,000 a year in small business costs. I save 10 to 20 hours a week now. The technology was the bridge to getting unstuck and more aligned in my life and work. And now I do more of the work I love.",
    dataAiHint: "profile person",
  },
  {
    name: "Maria Fonseca",
    title: "",
    // No portrait yet — the initials avatar renders until a photo lands in
    // public/ (see ProofSection).
    text: "I met Alex at a Braga AI builders meeting, a group inside the Braga expats community that he created. I was impressed by his knowledge and teaching skills: he was able to explain all this new concepts and tools in a way that even I, a neophyte, could follow even if, of course, part of it was too complex for my needs. I then asked him to give my husband and me classes to help us starting using some of those tools. Alex has been very organized and obliging us to focus just on what we really needed making a point of giving us the tools in order not to need him around and that is something rare so he is helping us not to be dependent on him in the future! I couldn't advise someone better to guide you in your AI journey.",
    dataAiHint: "profile person",
  },
  {
    imageSrc: "/stephan-kerby.jpg",
    name: "Stephan Kerby",
    title: "Co-Founder, Mindscape Psychedelic Institute",
    text: "Alex is a fantastic communicator who made the website redesign process effortless. I'm thrilled with the outcome and the creative ideas Alex brought to the project that I never would have thought of.",
    dataAiHint: "profile person",
  },
  {
    imageSrc: "/Alexaragon.jpg",
    name: "Alex A.",
    title: "COO at Aragon.org",
    text: "Alex has a strong work ethic and real attention to detail. He's open-minded about how to approach problems, and he's good at getting people on the same page. I'd work with him again without hesitating.",
    dataAiHint: "profile person",
  },
  {
    imageSrc: "/Karrie.jpg",
    name: "Karrie S.",
    title: "CEO at Culminate Strategy Group",
    text: "Alex is one of the best change and program management professionals I've run across in transformation. He approaches each initiative with an eye toward the future technologies and how they impact the organization, productivity, and value creation. He's also just a high EQ leader who loves mentoring and coaching others into the next best version of themselves.",
    dataAiHint: "profile person",
  },
  {
    imageSrc: "/marco.jpg",
    name: "Marco",
    title: "Sr. Product Designer",
    text: "Alex is professional and genuinely cares about the people he works with. He pushed our team toward continuous improvement without making it feel forced. I'd recommend him to any organization that values both competence and decency.",
    dataAiHint: "profile person",
  },
  {
    imageSrc: "/Evan.jpg",
    name: "Evan H.",
    title: "Head of Strategy",
    text: "Alex was one of the most significant members of the Aragon team throughout 2022 and 2023. He is extraordinarily proactive, doesn't wait to be told what to do, and will always give his ear to bounce ideas off of. If anyone needs this kind of dynamic energy on their team, it is an absolute no brainer that they should speak with Alex.",
    dataAiHint: "profile person",
  },
  {
    imageSrc: "/Lia-Savillo.webp",
    name: "Lia S.",
    title: "Marketing Strategist",
    text: "Alex really made a huge difference in the operations at Aragon, ensuring every member of the team felt heard and seen - rare in many tech companies today. He also ensured that each member was focused on their personal development and helped us adapt our skills as the organization's needs shifted. He would make a great addition to any project.",
    dataAiHint: "profile person",
  },
  {
    imageSrc: "/tessa.jpg",
    name: "Tessa M.",
    title: "Marketing Strategist",
    text: "I had the pleasure of meeting Alex through Lunchclub. We talked about the future and Web3, and it was then that I realized I might have found myself a Web3 mentor. Alex is calm, patient, and is very generous with his knowledge. Alex is a great mentor and I would recommend him to anyone who wants to do a deep dive into Web3.",
    dataAiHint: "profile person",
  },
  {
    imageSrc: "/Sepehr.jpg",
    name: "Sepehr S.",
    title: "Co-Founder & Sr. Software Engineer",
    text: "Alex's energy is contagious - he walks into a room and people actually want to work. His understanding of Scrum is deep and practical, and it made a real difference in how our HR department operates. The whole team runs better when he's involved.",
    dataAiHint: "profile person",
  },
  {
    imageSrc: "/jasper.jpg",
    name: "Jasper",
    title: "Sr. Manager - Launch by NTT Data",
    text: "Alex is the best SCRUM master I've worked with. He catches risks early and nothing slips past him. He also genuinely cares about helping the people around him grow, which is rare. Great to work with.",
    dataAiHint: "profile person",
  },
];
