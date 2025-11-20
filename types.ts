/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

export interface Project {
  id: string;
  title: string;
  client: string;
  category: string;
  images: string[]; // Changed from image: string to images: string[]
  description: string;
  year: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  isError?: boolean;
}

export interface Skill {
  name: string;
  level: number; // 0-100
  icon?: React.ElementType;
}

export interface Experience {
  company: string;
  role: string;
  period: string;
  logo?: string;
}