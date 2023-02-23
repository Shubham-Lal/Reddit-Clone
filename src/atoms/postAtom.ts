import { Timestamp } from "firebase/firestore";
import { atom } from "recoil";

export type Post = {
    id?: string;
    communityId: string;
    creatorId: string;
    creatorDisplayName: string;
    title: string;
    body: string;
    numberOfComments: number;
    voteStatus: number;
    imageURL?: string;
    communityImageURL?: string;
    createdAt: Timestamp;
    // id: string;
    // communityId: string;
    // communityImageURL?: string;
    // creatorDisplayName: string;
    // creatorId: string;
    // title: string;
    // body: string;
    // numberOfComments: number;
    // voteStatus: number;
    // currentUserVoteStatus?: {
    //     id: string;
    //     voteValue: number;
    // };
    // imageURL?: string;
    // postIdx?: number;
    // createdAt: Timestamp;
    // editedAt?: Timestamp;
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