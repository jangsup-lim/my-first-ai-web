/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type PolicyCategory = '생계' | '의료' | '주거' | '교육';

export interface Policy {
  id: string;
  category: PolicyCategory;
  title: string;
  description: string;
  benefits: string[];
  eligibility: string;
  isPopular?: boolean;
}

export interface ProTip {
  id: string;
  title: string;
  content: string;
  category: string;
  icon: string;
}

export interface SuccessStory {
  id: string;
  author: string;
  title: string;
  content: string;
  date: string;
  likes: number;
}

export interface CalculatorData {
  familySize: number;
  income: number;
  property: number;
  debt: number;
}
