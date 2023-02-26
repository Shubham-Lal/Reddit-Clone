import Link from 'next/link';
import SEO from './seo';
import { Flex, Text } from "@chakra-ui/react"
import Footer from '../components/Footer/Footer';
import CreatePostLink from '@/components/Community/CreatePostLink';

export default function Home() {
  return (
    <>
      <SEO />
      <Flex mt={5} width="100%" justify="center" align="center" direction="column">
        <CreatePostLink />
        <Flex>
          <Text>Welcome to the Reddit Clone</Text>
        </Flex>
        <Flex>
          <Text mr={1}>Currently working on</Text>
          <Link href="/r/WeKnewHow">
            <Text color="blue.500" textDecoration="underline">Community</Text>
          </Link>
          <Text ml={1}>page.</Text>
        </Flex>
      </Flex>
      <Footer />
    </>
  )
}