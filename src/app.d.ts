// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace Blog {
		interface HeadingBlock {
			type: "heading",
			size: 1 | 2 | 3,
			content: string
		}

		interface ImageBlock {
			type: "image",
			align?: "left" | "right",
			size?: { width?: number, height?: number }
			src: string,
			altText: string,
			caption?: string,
		}

		interface TextBlock {
			type: "text",
			content: string
		}

		interface YoutubeBlock {
			type: 'youtube',
			source: string,
			size?: { width?: number, height?: number }
		}

		type BlogBlock = HeadingBlock | ImageBlock | TextBlock | YoutubeBlock

		interface BlogPost { title: string, slug: string, previewImg?: ImageBlock, blocks: BlogBlock[], summary: string }
	}
}

export { };
