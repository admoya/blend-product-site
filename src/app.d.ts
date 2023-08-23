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
    namespace Organization {
      interface Public {
        name: string;
        contactEmail: string;
      }
      interface Private {
        members: {
          [uid: string]: {
            role: 'admin' | '';
          };
        };
      }
      interface Locked {
        active: boolean;
        seats: number;
        termEnd: number;
        termStart: number;
      }

      interface NewMember {
        email: string;
        name?: string;
        status?: string;
        error?: boolean;
        validated?: boolean;
      }
    }
    interface Organization {
      public: Organization.Public;
      private?: Organization.Private;
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
