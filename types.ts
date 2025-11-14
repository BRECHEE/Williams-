
// types.ts

export interface User {
  id: string;
  name: string;
  email: string;
  studentId: string;
  major: string;
  profilePicture?: string;
  cvUrl?: string;
  isLoggedIn: boolean;
}

export interface Course {
  id: string;
  title: string;
  code: string;
  lecturer: string;
  semester: string;
  discipline: string;
  level: string;
  resources: Resource[];
}

export interface Resource {
  id: string;
  name: string;
  url: string; // Placeholder for downloadable file
  type: 'PDF' | 'PPT' | 'DOC' | 'VIDEO';
}

export interface TimetableEntry {
  id: string;
  courseId: string;
  courseTitle: string;
  day: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';
  startTime: string; // e.g., "09:00"
  endTime: string; // e.g., "10:30"
  room: string;
  semester: string;
  group: string;
}

export interface ForumPost {
  id: string;
  title: string;
  content: string;
  author: string;
  category: 'Homework Help' | 'Announcements' | 'Events' | 'Campus Life' | 'General';
  date: string; // ISO date string
  comments: Comment[];
}

export interface Comment {
  id: string;
  postId: string;
  author: string;
  content: string;
  date: string; // ISO date string
}

export interface Scholarship {
  id: string;
  title: string;
  organization: string;
  country: string;
  deadline: string; // ISO date string
  domain: string;
  type: 'Scholarship' | 'Internship' | 'Student Job';
  applyLink: string;
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  date: string; // ISO date string
  type: 'event' | 'news' | 'urgent';
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}
