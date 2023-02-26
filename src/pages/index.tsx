import SEO from './seo';
import Footer from '../components/Footer/Footer';
import { NextPage } from 'next';
import PageContent from '../components/Layout/PageContent';
import CreatePostLink from '../components/Community/CreatePostLink';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, firestore } from '../firebase/clientApp';
import { useEffect, useState } from "react";
import { collection, getDocs, limit, orderBy, query, where } from 'firebase/firestore';
import usePosts from '../hooks/usePosts';
import { Post, PostVote } from '../atoms/postAtom';
import PostLoader from '../components/Posts/PostLoader';
import { Stack } from '@chakra-ui/react';
import PostItem from '../components/Posts/PostItem';
import useCommunityData from '../hooks/useCommunityData';

const Home: NextPage = () => {
  const [user, loadingUser] = useAuthState(auth);
  const [loading, setLoading] = useState(false);
  const { postStateValue, setPostStateValue, onSelectPost, onDeletePost, onVote } = usePosts();
  const { communityStateValue } = useCommunityData();

  const buildUserHomeFeed = async () => {
    setLoading(true);
    try {
      if (communityStateValue.mySnippets.length) {
        const myCommunityIds = communityStateValue.mySnippets.map((snippet) => snippet.communityId);
        // Add here logic for more posts using Pagination
        const postQuery = query(
          collection(firestore, "posts"),
          where("communityId", "in", myCommunityIds),
          orderBy("createdAt", "desc"),
          limit(10),
        );
        const postDocs = await getDocs(postQuery);
        const posts = postDocs.docs.map((doc) => ({
          id: doc.id,
          ...doc.data()
        }));
        setPostStateValue((prev) => ({
          ...prev,
          posts: posts as Post[]
        }));
      }
      else {
        buildNoUserHomeFeed();
      }
    } catch (error: any) {
      console.log(error.message);
    }
    finally {
      setLoading(false);
    }
  };

  const buildNoUserHomeFeed = async () => {
    setLoading(true);
    try {
      const postQuery = query(
        collection(firestore, "posts"),
        orderBy("voteStatus", "desc"),
        limit(10)
      );
      const postDocs = await getDocs(postQuery);
      const posts = postDocs.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }));
      setPostStateValue((prev) => ({
        ...prev,
        posts: posts as Post[]
      }));
    }
    catch (error: any) {
      console.log(error.message);
    }
    finally {
      setLoading(false);
    }
  };

  const getUserPostVotes = async () => {
    try {
      const postIds = postStateValue.posts.map((post) => post.id);
      const postVotesQuery = query(
        collection(firestore, `users/${user?.uid}/postVotes`),
        where("postId", "in", postIds)
      );
      const postVoteDocs = await getDocs(postVotesQuery);
      const postVotes = postVoteDocs.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }));

      setPostStateValue((prev) => ({
        ...prev,
        postVotes: postVotes as PostVote[]
      }))
    }
    catch (error: any) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    if (communityStateValue.snippetsFetched) buildUserHomeFeed();
  }, [communityStateValue.snippetsFetched]);

  useEffect(() => {
    if (!user && !loadingUser) buildNoUserHomeFeed();

  }, [user, loadingUser]);

  useEffect(() => {
    if (user && postStateValue.posts.length) getUserPostVotes();

    return () => {
      setPostStateValue((prev) => ({
        ...prev,
        postVotes: [],
      }))
    } // Cleanup function
  }, [user, postStateValue.posts]);

  return (
    <>
      <SEO />
      <PageContent>
        <>
          <CreatePostLink />
          {loading ? (
            <PostLoader />
          ) : (
            <Stack>
              {postStateValue.posts.map((post) => (
                <PostItem
                  key={post.id}
                  post={post}
                  onSelectPost={onSelectPost}
                  onDelete={onDeletePost}
                  onVote={onVote}
                  userVoteValue={
                    postStateValue.postVotes.find((vote) => vote.postId === post.id)?.voteValue
                  }
                  userIsCreator={user?.uid === post.creatorId}
                  communityId={post.communityId}
                  shareEnabled={true}
                  homePage={true}
                />
              ))}
            </Stack>
          )}
        </>
        <>

        </>
      </PageContent>
      <Footer />
    </>
  )
}
export default Home;