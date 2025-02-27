export interface Member {
  id: string;
  displayName: string;
  email: string;
  role: string;
  groups: string[];
  createdAt: { seconds: number };
}

export interface Group {
  id: string;
  name: string;
  members: string[];
  createdBy: string;
  createdAt: { seconds: number };
  memberCount?: number;
}

export interface TableStructure {
  type: string;
  head: string[];
  body: any[];
} 