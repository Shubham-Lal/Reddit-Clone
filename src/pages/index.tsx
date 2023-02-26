import SEO from './seo';
import Footer from '../components/Footer/Footer';
import { NextPage } from 'next';
import PageContent from '../components/Layout/PageContent';
import CreatePostLink from '../components/Community/CreatePostLink';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase/clientApp';
import { useEffect, useState } from "react";

const Home: NextPage = () => {
  const [user, loadingUser] = useAuthState(auth);
    const [loading, setLoading] = useState(false);

  const buildUserHomeFeed = () => {

  };

  const buildNoUserHomeFeed = () => {

  };

  const getUserPostVotes = () => {

  };

  useEffect(() => {
    if (!user && !loadingUser) buildNoUserHomeFeed();

  }, [user, loadingUser]);

  return (
    <>
      <SEO />
      <PageContent>
        <>
          <CreatePostLink />
        </>
        <>

        </>
      </PageContent>
      <Footer />
    </>
  )
}
export default Home;