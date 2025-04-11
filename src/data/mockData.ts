
import { Manhwa, Gender, WeekDay } from '@/types';

// Generate a random ID
const generateId = () => {
  return Math.random().toString(36).substring(2, 15);
};

// Generate random chapters for a manhwa
const generateChapters = (count: number, baseUrl: string) => {
  const chapters = [];
  
  // Start from the most recent chapter and go backwards
  for (let i = count; i >= 1; i--) {
    const releaseDate = new Date();
    releaseDate.setDate(releaseDate.getDate() - (count - i) * 7); // One chapter per week
    
    chapters.push({
      id: generateId(),
      number: i,
      title: `Chapter ${i}`,
      releaseDate,
      isRead: i < count - 3, // Mark older chapters as read
      readUrl: `${baseUrl}/chapter-${i}`,
    });
  }
  
  return chapters;
};

export const mockManhwaData: Manhwa[] = [
  {
    id: generateId(),
    title: "Solo Leveling",
    coverImage: "https://cdn.pixabay.com/photo/2023/04/13/11/41/ai-generated-7922768_1280.jpg",
    description: "When a portal connecting our world to a different dimension full of monsters appears, some people gain powers to hunt these monsters. Sung Jin-Woo, the weakest of all hunters, gets a strange power and embarks on a journey to become the strongest hunter.",
    author: "Chugong",
    illustrator: "Jang Sung-rak",
    country: "South Korea",
    gender: "Straight",
    categories: ["Action", "Adventure", "Fantasy"],
    releaseDay: "Wednesday",
    releaseYear: 2018,
    status: "Completed",
    chapters: generateChapters(178, "https://xbato.com/v3x/solo-leveling"),
    officialUrl: "https://m.webtoons.com/en/action/solo-leveling/list?title_no=3162",
    hasNewChapter: true,
    nextChapterDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // 2 days from now
  },
  {
    id: generateId(),
    title: "The Beginning After The End",
    coverImage: "https://cdn.pixabay.com/photo/2023/07/04/10/10/ai-generated-8105960_1280.jpg",
    description: "King Grey has unrivaled strength, wealth, and prestige in a world governed by martial ability. However, solitude lingers closely behind those with great power. Beneath the glamorous exterior of a powerful king lurks the shell of a man, devoid of purpose and will.",
    author: "TurtleMe",
    illustrator: "Fuyuki23",
    country: "South Korea",
    gender: "Straight",
    categories: ["Action", "Adventure", "Fantasy", "Reincarnation"],
    releaseDay: "Friday",
    releaseYear: 2018,
    status: "Ongoing",
    chapters: generateChapters(160, "https://xbato.com/v3x/the-beginning-after-the-end"),
    officialUrl: "https://tapas.io/series/TBATE",
    hasNewChapter: false,
    nextChapterDate: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000), // 4 days from now
  },
  {
    id: generateId(),
    title: "Omniscient Reader's Viewpoint",
    coverImage: "https://cdn.pixabay.com/photo/2023/06/29/10/33/ai-generated-8096034_1280.jpg",
    description: "Only I know the end of this world. One day our MC finds himself stuck in the world of his favorite webnovel. What does he do to survive? It is a world struck by catastrophe and danger all around.",
    author: "Sing-Shong",
    illustrator: "REDICE Studio",
    country: "South Korea",
    gender: "Straight",
    categories: ["Action", "Adventure", "Fantasy", "Post-Apocalyptic"],
    releaseDay: "Monday",
    releaseYear: 2020,
    status: "Ongoing",
    chapters: generateChapters(150, "https://xbato.com/v3x/omniscient-readers-viewpoint"),
    officialUrl: "https://m.webtoons.com/en/action/omniscient-reader/list?title_no=2154",
    hasNewChapter: true,
    nextChapterDate: new Date(Date.now() + 6 * 24 * 60 * 60 * 1000), // 6 days from now
  },
  {
    id: generateId(),
    title: "Tower of God",
    coverImage: "https://cdn.pixabay.com/photo/2023/07/05/18/13/ai-generated-8108870_1280.jpg",
    description: "What do you desire? Money and wealth? Honor and pride? Authority and power? Revenge? Or something that transcends them all? Whatever you desire—it's here.",
    author: "SIU",
    illustrator: "SIU",
    country: "South Korea",
    gender: "Straight",
    categories: ["Action", "Adventure", "Fantasy", "Mystery"],
    releaseDay: "Sunday",
    releaseYear: 2010,
    status: "Ongoing",
    chapters: generateChapters(550, "https://xbato.com/v3x/tower-of-god"),
    officialUrl: "https://m.webtoons.com/en/fantasy/tower-of-god/list?title_no=95",
    hasNewChapter: false,
    nextChapterDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), // 5 days from now
  },
  {
    id: generateId(),
    title: "Heartstopper",
    coverImage: "https://cdn.pixabay.com/photo/2023/06/23/10/44/ai-generated-8083508_1280.jpg",
    description: "Charlie, a highly-strung, openly gay over-thinker, and Nick, a cheerful, soft-hearted rugby player, meet at a British all-boys grammar school. Friendship blooms quickly, but could there be something more...?",
    author: "Alice Oseman",
    illustrator: "Alice Oseman",
    country: "United Kingdom",
    gender: "Yaoi",
    categories: ["Romance", "Drama", "Slice of Life", "School Life"],
    releaseDay: "Tuesday",
    releaseYear: 2016,
    status: "Ongoing",
    chapters: generateChapters(120, "https://yaoiscan.com/heartstopper"),
    officialUrl: "https://www.webtoons.com/en/romance/heartstopper/list?title_no=1181",
    hasNewChapter: true,
    nextChapterDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000), // 1 day from now
  },
  {
    id: generateId(),
    title: "Bloom Into You",
    coverImage: "https://cdn.pixabay.com/photo/2023/09/14/15/48/ai-generated-8253091_1280.jpg",
    description: "Yuu has always loved shoujo manga and awaits the day she gets a love confession that sends her heart aflutter. Yet when a junior high classmate confesses his feelings to her, she feels nothing. Confused and troubled by her lack of response, Yuu enters high school with her heart in flux.",
    author: "Nio Nakatani",
    illustrator: "Nio Nakatani",
    country: "Japan",
    gender: "Yuri",
    categories: ["Romance", "Drama", "School Life"],
    releaseDay: "Thursday",
    releaseYear: 2015,
    status: "Completed",
    chapters: generateChapters(75, "https://vyvymanga.net/bloom-into-you"),
    officialUrl: "https://flowermanga.net/bloom-into-you",
    hasNewChapter: false,
    nextChapterDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days from now
  },
  {
    id: generateId(),
    title: "The God of High School",
    coverImage: "https://cdn.pixabay.com/photo/2023/09/10/18/26/ai-generated-8245382_1280.jpg",
    description: "It all began as a fighting tournament to seek out for the best fighter among all high school students in Korea. Mori Jin, a Taekwondo specialist and a high school student, soon learns that there is something much greater beneath the stage of the tournament.",
    author: "Yongje Park",
    illustrator: "Yongje Park",
    country: "South Korea",
    gender: "Straight",
    categories: ["Action", "Adventure", "Supernatural", "Martial Arts"],
    releaseDay: "Saturday",
    releaseYear: 2011,
    status: "Ongoing",
    chapters: generateChapters(530, "https://xbato.com/v3x/the-god-of-high-school"),
    officialUrl: "https://m.webtoons.com/en/action/the-god-of-high-school/list?title_no=66",
    hasNewChapter: true,
    nextChapterDate: new Date(Date.now() + 0.5 * 24 * 60 * 60 * 1000), // 12 hours from now
  },
  {
    id: generateId(),
    title: "Love for Sale",
    coverImage: "https://cdn.pixabay.com/photo/2023/09/25/19/58/ai-generated-8275350_1280.jpg",
    description: "A heart-warming BL story about finding love in unexpected places.",
    author: "Deadbeats",
    illustrator: "Gavin Lin",
    country: "China",
    gender: "Yaoi",
    categories: ["Romance", "Drama", "Modern"],
    releaseDay: "Wednesday",
    releaseYear: 2021,
    status: "Ongoing",
    chapters: generateChapters(92, "https://portalyaoi.com/love-for-sale"),
    officialUrl: "https://weebrook.com/love-for-sale",
    hasNewChapter: false,
    nextChapterDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
  },
];

// Generate categories list from mock data
export const getAllCategories = () => {
  const categoriesSet = new Set<string>();
  
  mockManhwaData.forEach(manhwa => {
    manhwa.categories.forEach(category => {
      categoriesSet.add(category);
    });
  });
  
  return Array.from(categoriesSet).sort();
};

// Generate countries list from mock data
export const getAllCountries = () => {
  const countriesSet = new Set<string>();
  
  mockManhwaData.forEach(manhwa => {
    countriesSet.add(manhwa.country);
  });
  
  return Array.from(countriesSet).sort();
};

// Get all possible gender values
export const getAllGenders = (): Gender[] => {
  return ["Straight", "Yaoi", "Yuri", "Other"];
};

// Get all possible weekdays
export const getAllWeekdays = (): WeekDay[] => {
  return ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
};
