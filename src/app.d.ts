// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
  interface Window {
    dataLayer: Record<string, any>[];
    'ga-disable-G-LLGRDWVVEV': boolean;
  }
  namespace Blog {
    interface HeadingBlock {
      type: 'heading';
      size: 1 | 2 | 3;
      content: string;
    }

    interface ImageBlock {
      type: 'image';
      align?: 'left' | 'right';
      size?: {
        width?: number;
        height?: number;
      };
      src: string;
      altText: string;
      caption?: string;
    }

    interface TextBlock {
      type: 'text';
      content: string;
    }

    interface YoutubeBlock {
      type: 'youtube';
      source: string;
      size?: {
        width?: number;
        height?: number;
      };
    }

    type BlogBlock = HeadingBlock | ImageBlock | TextBlock | YoutubeBlock;

    interface BlogPost {
      title: string;
      slug: string;
      previewImg?: ImageBlock;
      blocks: BlogBlock[];
      summary: string;
    }
  }

  namespace Database {
    interface Deck {
      created_ts: string;
      modified_ts: string;
      is_editable: boolean;
      name: string;
      position: number;
      refId: number;
    }
    namespace Decks {
      interface Organization {
        [deckId: string]: {
          author?: string;
          deck: Deck;
        };
      }
      interface User {
        [deckId: string]: Deck;
      }
    }
    interface Playlist {
      created_ts: string;
      modified_ts: string;
      is_editable: boolean;
      name: string;
      position: number;
      refId: number;
      words: [][];
    }
    namespace Playlists {
      interface Organization {
        [playlistId: string]: {
          author?: string;
          originalRefId: number;
          playlist: Playlist;
        };
      }
      interface User {
        [playlistId: string]: Playlist;
      }
    }
    namespace Invite {
      interface Organization {
        orgId: string;
        inviteeEmail: string;
        inviteeUid?: string;
        emailSentTs?: number;
      }
      interface InviteDetails extends Organization {
        id: string;
        displayName?: string;
      }
      interface Validation {
        email: string;
        name?: string;
        uid?: string;
        status?: string;
        error?: boolean;
        validated?: boolean;
      }
    }

    namespace Organization {
      interface Member {
        role: 'admin' | '';
      }
      interface MemberDetails extends Member {
        displayName: string;
        email: string;
        uid: string;
      }

      interface Public {
        name: string;
        contactEmail: string;
      }
      interface Private {
        members: {
          [uid: string]: Member;
        };
        invites: string[];
      }
      interface Locked {
        active: boolean;
        seats: number;
        termEnd: number;
        termStart: number;
      }
    }
    interface Organization {
      public: Organization.Public;
      private: Organization.Private;
      locked: Organization.Locked;
    }

    namespace User {
      interface Protected {
        organizations?: string[];
      }
      interface Private {
        stripeCustomerId?: string;
      }
    }
    interface User {
      protected: User.Protected;
      private: User.Private;
    }
  }
}

export {};
