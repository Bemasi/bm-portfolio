import Image from "next/image";
import Container from '../components/ui/Container'
import Head from "next/head";
import { Stack } from "@chakra-ui/react";

export default function Index({ introduction, projects, articles, contactMe }) {
    return (
        <>
            <Container enableTransition={true}>
                <Head>
                    <title>Benjamin Mato - Software Engineer</title>
                    <meta content="Benjamin Mato - Software Engineer" name="title" />

                    <meta content="Spanish software engineer, licensed in Compute Engineering" name="description" />
                </Head>
                <Stack as="main"
                    alignItems="flex-start"
                    mt={{ base: '15vh', md: '20vh' }}
                    pb="144px"
                    spacing={{ base: '100px', md: '144px' }}
                >

                </Stack>
            </Container>

        </>
    )

    /*let client = require('contentful').createClient({
        space: process.env.CONTENTFUL_SPACE_ID,
        accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
      })*/

}  