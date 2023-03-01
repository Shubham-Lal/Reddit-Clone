import { Button, Flex, Input, Stack } from '@chakra-ui/react'

type LinksPostFormProps = {
  linkURL: string;
  setLinkURL: (value: string) => void;
  setSelectedTab: (value: string) => void;
}

const LinksPostForm: React.FC<LinksPostFormProps> = ({ linkURL, setSelectedTab, setLinkURL }) => {
  return (
    <Stack spacing={3} width='100%'>
      <Input
        name='title'
        value={linkURL}
        onChange={(e) => setLinkURL(e.target.value)}
        fontSize='12pt'
        borderRadius={4}
        placeholder='Enter or paste link url here'
        _placeholder={{ color: 'gray.500' }}
        _focus={{
          outline: 'none',
          bg: 'white',
          border: '1px solid',
          borderColor: 'black'
        }}
      />
      <Flex justify='flex-end'>
        <Button height='28px' onClick={() => setSelectedTab('Post')}>
          Back to Post
        </Button>
      </Flex>
    </Stack>
  )
}
export default LinksPostForm
