
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

export interface StaffMember {
  id: string;
  name: string;
  position: string;
  field: string;
  image: string;
  description: string;
}

export interface NewsItem {
  id: string;
  date: string;
  timestamp: string;
  title: string;
  category: string;
  img: string;           
  fullContentImg: string; 
  description: string;
}

export interface Artist {
  id: string;
  name: string;
  genre: string;
  image: string;
  day: string;
  description: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  isError?: boolean;
}

export type SectionType = 'hero' | 'kakitangan' | 'profil' | 'program' | 'berita';
