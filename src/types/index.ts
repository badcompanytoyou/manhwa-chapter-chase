
export interface ManhwaChapter {
  id: string;
  number: number;
  title: string;
  isRead: boolean;
  releaseDate: Date;
  readUrl?: string;
  lastReadAt?: Date;
  isNew?: boolean;
}

export interface Manhwa {
  id: string;
  title: string;
  coverImage: string;
  alternativeTitles?: string[];
  author: string;
  illustrator: string;
  description: string;
  status: 'Ongoing' | 'Completed' | 'Hiatus' | 'Canceled';
  releaseDay: string;
  releaseYear: number;
  categories: string[];
  gender: string;
  country: string;
  hasNewChapter: boolean;
  isNew?: boolean;
  nextChapterDate?: Date;
  publisher?: string;
  officialUrl?: string;
  reading?: boolean;
  planToRead?: boolean;
  onHold?: boolean;
  dropped?: boolean;
  dropNote?: string;
  favorite?: boolean;
  rereading?: boolean;
  mature?: boolean;
  chapters: ManhwaChapter[];
}

export interface User {
  id: string;
  username: string;
  email: string;
  profileImage?: string;
  role: 'user' | 'admin';
  createdAt: Date;
  totalManhwaRead: number;
  totalChaptersRead: number;
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  manhwaId?: string;
  chapterId?: string;
  isRead: boolean;
  createdAt: Date;
  type: 'new_chapter' | 'system' | 'follow' | 'comment';
}

export interface Comment {
  id: string;
  userId: string;
  username: string;
  userProfileImage?: string;
  manhwaId: string;
  content: string;
  likes: number;
  createdAt: Date;
  isEdited: boolean;
}
