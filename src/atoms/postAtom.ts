import { Timestamp } from "firebase/firestore";
import { atom } from "recoil";

export type Post = {
    id?: string;
    communityId: string;
    communityImageURL?: string;
    creatorDisplayName: string;
    creatorId: string;
    title: string;
    body: string; 
    numberOfComments: number;
    voteStatus: number;
    imageURL?: string;
    linkURL?: string;
    createdAt: Timestamp;
};

export type Comment = {
    id: string;
    creatorId: string;
    creatorDisplayText: string;
    communityId: string;
    postId: string;
    postTitle: string;
    text: string;
    createdAt: Timestamp;
};

export type PostVote = {
    id: string;
    postId: string;
    communityId: string;
    voteValue: number;
};

interface PostState {
    selectedPost: Post | null;
    posts: Post[];
    postVotes: PostVote[];
}

const defaultPostState: PostState = {
    selectedPost: null,
    posts: [],
    postVotes: [],
};

export const postState = atom<PostState>({
    key: "postState",
    default: defaultPostState,
});