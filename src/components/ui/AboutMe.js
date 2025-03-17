import {
    SimpleGrid,
    Text,
    Stack,
    Heading,
    Image,
    Flex,
    Box,
    chakra,
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverBody,
    PopoverArrow,
} from '@chakra-ui/react'


import useMediaQuery from '../utils/useMediaQuery'
//import SlideUpWhenVisible from '../hook/SlideUpWhenVisible'
import ReactGA from 'react-ga4'

export default function AboutMe() {
    const isLargerThan800 = useMediaQuery(800)
    const handleHover = (event) => {
        ReactGA.event({
            category: 'hover',
            action: event,
        })
    }
    const MoreInfo = ({ text, content }) => {
        return (
            <>
                {' '}
                {isLargerThan800 ? (
                    <Popover isLazy placement="right" trigger="hover">
                        <PopoverTrigger>
                            <chakra.span color="button1" cursor="help" onMouseOver={() => handleHover(`about_${text}`)}
                            >
                                {text}
                            </chakra.span>
                        </PopoverTrigger>
                        <PopoverContent color="white" bg="secondary" borderColor="button1">
                            <PopoverArrow bg="button1" />
                            <PopoverBody color="textPrimary" fontSize="sm">
                                {content}
                            </PopoverBody>
                        </PopoverContent>
                    </Popover>
                ) : (
                    <Text as="span" color="button1">
                        {text}
                    </Text>
                ) }{' '}
            </>
        )
    }
}