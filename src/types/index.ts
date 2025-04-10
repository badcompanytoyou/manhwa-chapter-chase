
export type Gender = "Straight" | "Yaoi" | "Yuri" | "Other";

export type WeekDay = "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | "Saturday" | "Sunday";

export interface ManhwaChapter {
  id: string;
  number: number;
  title: string;
  releaseDate: Date;
  isRead: boolean;
  readUrl: string;
}

export interface Manhwa {
  id: string;
  title: string;
  coverImage: string;
  description: string;
  author: string;
  illustrator: string;
  country: string;
  gender: Gender;
  categories: string[];
  releaseDay: WeekDay;
  chapters: ManhwaChapter[];
  officialUrl: string;
  hasNewChapter: boolean;
  nextChapterDate?: Date;
}
