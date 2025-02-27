import { ReactNode } from 'react';

// User types
export interface User {
  uid: string;
  email: string;
  displayName: string;
  role: UserRole;
  groups: string[];
  createdAt: Date;
}

export type UserRole = 'admin' | 'member';

// Task types
export interface Task {
  id?: string;
  title: string;
  description: string;
  status: 'TODO' | 'IN_PROGRESS' | 'DONE';
  priority: 'HIGH' | 'MEDIUM' | 'LOW';
  dueDate: string;
  time: string;
  assignedTo: string[];
  createdBy: string;
  createdAt: Date;
  comments?: Comment[];
}

export type TaskPriority = 'LOW' | 'MEDIUM' | 'HIGH';
export type TaskStatus = 'TODO' | 'IN_PROGRESS' | 'DONE';

// Comment type
export interface Comment {
  id: string;
  text: string;
  createdBy: string;
  createdAt: Date;
}

// Group types
export interface Group {
  id?: string;
  name: string;
  members: string[];
  createdBy: string;
  createdAt: Date;
}

// Payment types
export interface PaymentMethod {
  id?: string;
  type: 'card';
  last4: string;
  holderName: string;
  expirationDate: string;
}

export interface PaymentPlan {
  id: string;
  name: string;
  price: number;
  features: string[];
  billingCycle: 'monthly' | 'yearly';
} 