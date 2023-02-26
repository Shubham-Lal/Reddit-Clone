import { DirectoryMenuItem, directoryMenuState } from "../atoms/directoryMenuAtom";
import { useRecoilState, useRecoilValue } from "recoil";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { communityState } from "../atoms/communitiesAtom";
import { FaReddit } from "react-icons/fa";


const useDirectory = () => {
    const [directoryState, setDirectoryState] = useRecoilState(directoryMenuState);
    const router = useRouter();
    const communityStateValue = useRecoilValue(communityState);

    const onSelectMenuItem = (menuItem: DirectoryMenuItem) => {
        setDirectoryState((prev) => ({
            ...prev,
            selectedMenuItem: menuItem
        }));
        router.push(menuItem.link);
        if (directoryState.isOpen) {
            toggleMenuOpen();
        }
    };

    const toggleMenuOpen = () => {
        setDirectoryState((prev) => ({
            ...prev,
            isOpen: !directoryState.isOpen
        }));
    };

    useEffect(() => {
        const { currentCommunity } = communityStateValue;
        if (currentCommunity) {
            setDirectoryState((prev) => ({
                ...prev,
                selectedMenuItem: {
                    displayText: `r/${currentCommunity.id}`,
                    link: `/r/${currentCommunity.id}`,
                    imageURL: currentCommunity.imageURL,
                    icon: FaReddit,
                    iconColor: "blue.500"
                }
            }));
        }
    }, [communityStateValue.currentCommunity]);

    return {
        directoryState,
        toggleMenuOpen,
        onSelectMenuItem,
    };
}
export default useDirectory;