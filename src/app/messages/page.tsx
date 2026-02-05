import MessagesPage from '@/components/MessagesPage';
import type { Message } from '@/types/message';

// Fonction pour récupérer les messages depuis ton API/base de données
async function getMessages(): Promise<Message[]> {
  try {
    // Option 1: Depuis ton API
    const res = await fetch('http://localhost:3000/api/messages', {
      cache: 'no-store', // Pour avoir les données fraîches à chaque requête
    });

    if (!res.ok) {
      throw new Error('Erreur lors de la récupération des messages');
    }

    const messages = await res.json();

    // Si vous avez moins de 10 messages, ajoutez des données de test
    if (messages.length < 10) {
      return [...messages, ...getMockMessages(15 - messages.length)];
    }

    return messages;

  } catch (error) {
    console.error('Erreur:', error);
    // Retourner des données de test complètes
    return getMockMessages(15);
  }
}

// Fonction pour générer des messages fictifs
function getMockMessages(count: number): Message[] {
  const mockMessages = [
    {
      pseudo: { stringValue: 'Anonyme123' },
      destinataire: { stringValue: 'Marie' },
      genre: { stringValue: 'femme' },
      content: { stringValue: 'Tu illumines ma journée chaque fois que je te vois. Joyeuse Saint-Valentin ! ❤️' },
      likes: { integerValue: '5' },
      created_at: { timestampValue: new Date().toISOString() }
    },
    {
      pseudo: { stringValue: 'Secret_Admirer' },
      destinataire: { stringValue: 'Thomas' },
      genre: { stringValue: 'homme' },
      content: { stringValue: 'Ton sourire est la plus belle chose que j\'ai vue aujourd\'hui. Continue de briller !' },
      likes: { integerValue: '12' },
      created_at: { timestampValue: new Date().toISOString() }
    },
    {
      pseudo: { stringValue: 'Coeur2026' },
      destinataire: { stringValue: 'Sophie' },
      genre: { stringValue: 'femme' },
      content: { stringValue: 'Tu es incroyable et tu mérites tout le bonheur du monde. Bisous 💕' },
      likes: { integerValue: '8' },
      created_at: { timestampValue: new Date().toISOString() }
    },
    {
      pseudo: { stringValue: 'AmoureuxDiscret' },
      destinataire: { stringValue: 'Lucas' },
      genre: { stringValue: 'homme' },
      content: { stringValue: 'J\'adore passer du temps avec toi. Chaque moment est précieux.' },
      likes: { integerValue: '3' },
      created_at: { timestampValue: new Date().toISOString() }
    },
    {
      pseudo: { stringValue: 'PapillonRose' },
      destinataire: { stringValue: 'Emma' },
      genre: { stringValue: 'femme' },
      content: { stringValue: 'Tu es mon rayon de soleil dans les jours gris. Je t\'aime ! 🌞' },
      likes: { integerValue: '7' },
      created_at: { timestampValue: new Date().toISOString() }
    },
    {
      pseudo: { stringValue: 'RêveurEternel' },
      destinataire: { stringValue: 'Chloé' },
      genre: { stringValue: 'femme' },
      content: { stringValue: 'Si je pouvais te donner une chose, ce serait un miroir pour que tu vois à quel point tu es magnifique.' },
      likes: { integerValue: '15' },
      created_at: { timestampValue: new Date().toISOString() }
    },
    {
      pseudo: { stringValue: 'Protecteur' },
      destinataire: { stringValue: 'Sarah' },
      genre: { stringValue: 'femme' },
      content: { stringValue: 'Ton rire est la plus belle musique que j\'ai jamais entendue.' },
      likes: { integerValue: '9' },
      created_at: { timestampValue: new Date().toISOString() }
    },
    {
      pseudo: { stringValue: 'AngeGardiens' },
      destinataire: { stringValue: 'Antoine' },
      genre: { stringValue: 'homme' },
      content: { stringValue: 'Merci d\'être toi. Ne change jamais pour personne.' },
      likes: { integerValue: '6' },
      created_at: { timestampValue: new Date().toISOString() }
    },
    {
      pseudo: { stringValue: 'EtoileFilante' },
      destinataire: { stringValue: 'Juliette' },
      genre: { stringValue: 'femme' },
      content: { stringValue: 'Avec toi, chaque jour est une nouvelle aventure merveilleuse.' },
      likes: { integerValue: '11' },
      created_at: { timestampValue: new Date().toISOString() }
    },
    {
      pseudo: { stringValue: 'CoeurBattant' },
      destinataire: { stringValue: 'Nicolas' },
      genre: { stringValue: 'homme' },
      content: { stringValue: 'Tu fais battre mon cœur plus fort que jamais. 💓' },
      likes: { integerValue: '4' },
      created_at: { timestampValue: new Date().toISOString() }
    },
    {
      pseudo: { stringValue: 'PoèteSecret' },
      destinataire: { stringValue: 'Laura' },
      genre: { stringValue: 'femme' },
      content: { stringValue: 'Dans tes yeux, je vois tout un univers de douceur et de beauté.' },
      likes: { integerValue: '13' },
      created_at: { timestampValue: new Date().toISOString() }
    },
    {
      pseudo: { stringValue: 'GuitaristeRomantique' },
      destinataire: { stringValue: 'Clara' },
      genre: { stringValue: 'femme' },
      content: { stringValue: 'Je composerais mille chansons pour toi, mais aucune ne serait assez belle.' },
      likes: { integerValue: '10' },
      created_at: { timestampValue: new Date().toISOString() }
    },
    {
      pseudo: { stringValue: 'ChevalierModerne' },
      destinataire: { stringValue: 'Léa' },
      genre: { stringValue: 'femme' },
      content: { stringValue: 'Tu mérites tout le bonheur du monde et je ferai tout pour te le donner.' },
      likes: { integerValue: '8' },
      created_at: { timestampValue: new Date().toISOString() }
    },
    {
      pseudo: { stringValue: 'PapillonNocturne' },
      destinataire: { stringValue: 'Pierre' },
      genre: { stringValue: 'homme' },
      content: { stringValue: 'Même dans l\'obscurité, ton sourire éclaire mon chemin.' },
      likes: { integerValue: '5' },
      created_at: { timestampValue: new Date().toISOString() }
    },
    {
      pseudo: { stringValue: 'ArcEnCiel' },
      destinataire: { stringValue: 'Camille' },
      genre: { stringValue: 'femme' },
      content: { stringValue: 'Tu apportes des couleurs dans ma vie comme un arc-en-ciel après la pluie. 🌈' },
      likes: { integerValue: '14' },
      created_at: { timestampValue: new Date().toISOString() }
    }
  ];

  // Retourner le nombre demandé de messages
  return mockMessages.slice(0, count);
}

// Page Server Component (par défaut dans Next.js 14+)
export default async function Page() {
  const messages = await getMessages();

  return <MessagesPage messages={messages} />;
}

// Métadonnées de la page
export const metadata = {
  title: 'Messages - Mini NGL',
  description: 'Découvrez tous vos messages secrets pour la Saint-Valentin',
};
