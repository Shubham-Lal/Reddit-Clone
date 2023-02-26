import useDirectory from '../../../hooks/useDirectory';
import { ChevronDownIcon } from '@chakra-ui/icons';
import { Flex, Icon, Image, Menu, MenuButton, MenuList, Text } from '@chakra-ui/react';
import React from 'react';
import Communities from './Communities';

const Directory: React.FC = () => {
    const { directoryState, toggleMenuOpen } = useDirectory()

    return (
        <Menu isOpen={directoryState.isOpen}>
            <MenuButton mr={2} ml={2} cursor="pointer" padding="0 6px" borderRadius={4} _hover={{ outline: "1px solid", outlineColor: "gray.300" }}
                onClick={toggleMenuOpen}
            >
                <Flex align="center" justify="space-between" width={{ base: "40px", lg: "200px" }}>
                    <Flex align="center">
                        {directoryState.selectedMenuItem.imageURL ? (
                            <Image
                                src={directoryState.selectedMenuItem.imageURL}
                                borderRadius="full"
                                boxSize="24px"
                                mr={{ base: 0, md: 2 }}
                                alt="Community Image"
                            />
                        ) : (
                            <Icon
                                as={directoryState.selectedMenuItem.icon}
                                color={directoryState.selectedMenuItem.iconColor}
                                fontSize={20}
                                mr={{ base: 1, md: 2 }}
                            />
                        )}
                        <Flex display={{ base: "none", lg: "flex" }}>
                            <Text fontWeight={500} fontSize="11pt">
                                {directoryState.selectedMenuItem.displayText}
                            </Text>
                        </Flex>
                    </Flex>
                    <ChevronDownIcon />
                </Flex>
            </MenuButton>
            <MenuList>
                <Communities />
            </MenuList>
        </Menu>
    )
}
export default Directory;