export interface Message {
    id: number;
    content: string;
    sender: string;
    receiver: string;
    timestamp: string;
    reported: boolean;
    likes?: number;
    isAnonymous: boolean;
}

export interface Stats {
    totalMessages: number;
    todayMessages: number;
    reportedMessages: number;
    activeUsers: number;
    pendingModeration: number;
}

export interface User {
    id: number;
    name: string;
    email: string;
    messagesSent: number;
    messagesReceived: number;
    isActive: boolean;
    lastActive: string;
}

// Données mockées pour les messages
export const mockMessages: Message[] = [
    {
        id: 1,
        content: "Tu es incroyable, chaque instant avec toi est magique",
        sender: "Anonyme",
        receiver: "Marie",
        timestamp: "2024-02-14 10:30",
        reported: false,
        likes: 3,
        isAnonymous: true
    },
    {
        id: 2,
        content: "J'admire ton sourire qui illumine mes journées",
        sender: "Alexandre",
        receiver: "Lucas",
        timestamp: "2024-02-13 15:45",
        reported: true,
        likes: 5,
        isAnonymous: false
    },
    {
        id: 3,
        content: "Tu rends chaque instant spécial, merci d'exister",
        sender: "Anonyme",
        receiver: "Sophie",
        timestamp: "2024-02-14 09:15",
        reported: false,
        likes: 12,
        isAnonymous: true
    },
    {
        id: 4,
        content: "On se voit ce soir pour une surprise ?",
        sender: "Pierre",
        receiver: "Emma",
        timestamp: "2024-02-12 20:20",
        reported: false,
        likes: 8,
        isAnonymous: false
    },
    {
        id: 5,
        content: "Message contenant des propos inappropriés",
        sender: "Anonyme",
        receiver: "Thomas",
        timestamp: "2024-02-14 11:10",
        reported: true,
        likes: 0,
        isAnonymous: true
    },
    {
        id: 6,
        content: "Merci pour ton soutien, tu es une personne exceptionnelle",
        sender: "Anonyme",
        receiver: "Clara",
        timestamp: "2024-02-13 14:30",
        reported: false,
        likes: 7,
        isAnonymous: true
    },
    {
        id: 7,
        content: "Tu mérites tout le bonheur du monde",
        sender: "Juliette",
        receiver: "Romain",
        timestamp: "2024-02-14 08:45",
        reported: false,
        likes: 15,
        isAnonymous: false
    },
    {
        id: 8,
        content: "Contenu signalé pour harcèlement",
        sender: "Anonyme",
        receiver: "Lisa",
        timestamp: "2024-02-11 16:20",
        reported: true,
        likes: 1,
        isAnonymous: true
    },
];

// Données mockées pour les statistiques
export const mockStats: Stats = {
    totalMessages: 1247,
    todayMessages: 89,
    reportedMessages: 12,
    activeUsers: 342,
    pendingModeration: 8,
};

// Données mockées pour les utilisateurs
export const mockUsers: User[] = [
    { id: 1, name: "Marie", email: "marie@example.com", messagesSent: 45, messagesReceived: 89, isActive: true, lastActive: "2024-02-14 10:15" },
    { id: 2, name: "Lucas", email: "lucas@example.com", messagesSent: 23, messagesReceived: 67, isActive: true, lastActive: "2024-02-14 09:45" },
    { id: 3, name: "Sophie", email: "sophie@example.com", messagesSent: 89, messagesReceived: 145, isActive: true, lastActive: "2024-02-14 11:20" },
    { id: 4, name: "Emma", email: "emma@example.com", messagesSent: 34, messagesReceived: 78, isActive: false, lastActive: "2024-02-13 18:30" },
    { id: 5, name: "Thomas", email: "thomas@example.com", messagesSent: 12, messagesReceived: 56, isActive: true, lastActive: "2024-02-14 08:10" },
];

// Données pour les graphiques
export const mockChartData = {
    labels: ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"],
    datasets: [
        {
            label: "Messages reçus",
            data: [120, 190, 300, 500, 200, 300, 450],
            color: "rgb(244, 114, 182)",
        },
        {
            label: "Messages envoyés",
            data: [80, 150, 250, 400, 150, 250, 380],
            color: "rgb(236, 72, 153)",
        }
    ]
};

// Fonctions utilitaires pour manipuler les mock data
export const getMessageById = (id: number): Message | undefined => {
    return mockMessages.find(msg => msg.id === id);
};

export const getReportedMessages = (): Message[] => {
    return mockMessages.filter(msg => msg.reported);
};

export const getTodayMessages = (): Message[] => {
    return mockMessages.filter(msg => msg.timestamp.includes("2024-02-14"));
};

export const getAnonymousMessages = (): Message[] => {
    return mockMessages.filter(msg => msg.isAnonymous);
};
