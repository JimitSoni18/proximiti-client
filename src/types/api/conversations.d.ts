export type Conversation = {
	id: number;
	otherUser?: {
		id: number;
		username: string;
		profilePictureUrl?: string;
	};
};
