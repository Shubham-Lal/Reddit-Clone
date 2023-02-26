import SEO from './seo';
import Footer from '../components/Footer/Footer';
import { NextPage } from 'next';
import PageContent from '../components/Layout/PageContent';
import CreatePostLink from '../components/Community/CreatePostLink';

const Home: NextPage = () => {
  
  const buildUserHomeFeed = () => {

  };

  const buildNoUserHomeFeed = () => {

  };

  const getUserPostVotes = () => {

  };

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