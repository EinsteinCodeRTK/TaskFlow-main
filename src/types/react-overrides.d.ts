import { ReactNode } from 'react';

declare module '@hello-pangea/dnd' {
  export interface DroppableProps {
    children: (provided: DroppableProvided, snapshot: DroppableStateSnapshot) => ReactNode;
  }

  export interface DraggableProps {
    children: (provided: DraggableProvided, snapshot: DraggableStateSnapshot) => ReactNode;
  }
} 