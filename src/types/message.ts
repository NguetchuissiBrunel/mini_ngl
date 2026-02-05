import { Timestamp } from 'firebase/firestore';

export interface Message {
    id?: string;
    content: string;
    created_at: Timestamp;
    destinataire: string;
    genre: string;
    likes: number;
    pseudo: string;
    reported?: boolean;
}

