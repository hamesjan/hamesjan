export const posts = [
  {
    slug: '2026/05/03',
    title: 'on starting this',
    date: 'may 3, 2026',
    isoDate: '2026-05-03',
    tags: ['general'],
    content: `I decided to start this blog because I wanted to create a space just for me. I've been an avid journaler for more than 10 years now and I really enjoy going back and reading through them because 1. it helps me remember minute details of my life in a vivid way 2. Its funny to see how I have changed/ haven't changed. I wanted to create a space on the web where its all mine and I can customize it however and I can just put as many cool things as I want because its like the ultimate version of my own cozy nook in the internet.

So just to give an overview of where Im at in life: I'm currently writing this in a quaint coffee shop in redwood city. I've been living in the SF bay area for 5 months now - working as an intern at Tesla on the Firmware platforms team. I really enjoy the work, its very fast-paced and startup-like, but there are development practices that one would only see in a huge company like itself. Its cool to work on both sides - a place where scalability really really matters but is kind of scrappy; it seems like the best place for me since I dream of starting my own thing one day but I want to really get years of experience learning best practices first. During my free time, I've been just doing random stuff around the city - yesterday I went to Pacifica pier to go crabbing with my roommates. Its funny, we were out there for hours and between the 5 of us we caught one crab that barely missed the 5 3/4 inch size requirement so we didn't even get to take it home and grub on it. Meanwhile, there's these people at the end of the pier that are having a fiesta - blaring corridos and drinking beer and smoking cigarettes - they are catching huge crabs, 2 - 3 at a time on their snare, and just leaving with buckets of them. We met this one guy who was from Mississippi and had traveled all the way west to catch crabs because his wife back home really liked them. Anyways - I'm looking forward to making this website as cool as possible in the future. I want to make really cool projects and post them here, and just stake out my own corner of the internet.`
  }
];

export function getPost(year, month, day) {
  return posts.find(p => p.slug === `${year}/${month}/${day}`) ?? null;
}

export function getPostsByTag(tag) {
  return posts.filter(p => p.tags.includes(tag));
}

export function getAllTags() {
  return [...new Set(posts.flatMap(p => p.tags))].sort();
}
