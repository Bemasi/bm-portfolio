import Image from "next/image";
import Container from '../components/ui/Container'
import Head from "next/head";
import { Stack } from "@chakra-ui/react";
import Introduction from "@/components/ui/Introduction";
import * as contentful from 'contentful'


export default async function Index({ introduction, projects, contactMe }) {
    const contentClient = contentful.createClient({
        // This is the space ID. A space is like a project folder in Contentful terms
        space: process.env.CONTENTFUL_SPACE_ID,
        // This is the access token for this space. Normally you get both ID and the token in the Contentful web app
        accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
      })
    let projectsData = await contentClient.getEntries({
        content_type: 'featuredProjects',
        order: 'fields.order',
    })
    let introData = await contentClient.getEntries({
        content_type: 'introduction',
        limit: 2,
        order: 'sys.createdAt',
    })

    let contactData = await contentClient.getEntries({
        content_type: 'contactMe',
        limit: 1,
        order: 'sys.createdAt',
    })
        return (
        <>
            <Container enableTransition={true}>
                <Stack as="main"
                    alignItems="flex-start"
                    mt={{ base: '15vh', md: '20vh' }}
                    pb="144px"
                    spacing={{ base: '100px', md: '144px' }}
                >
                    <Introduction introduction={introData.items} />
                </Stack>
            </Container>

        </>
    )
}