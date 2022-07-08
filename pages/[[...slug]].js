import Error from 'next/error';
import { useRouter } from 'next/router'
import client from '../lib/apolloClient'
import HomePage from '../components/pages/HomePage'
import BreadPage from '../components/pages/BreadPage'
import BlogPage from '../components/pages/BlogPage'
import { gql } from '@apollo/client'

const Page = ({ page }) => {
    const router = useRouter()

    // If the page is not yet generated, this will be displayed
    // initially until getStaticProps() finishes running
    if (router.isFallback) {
        return <div>Loading...</div>
    }

    // Render page based of its contentType
    switch (page.contentType) {
        case 'base.HomePage':
            return (
                <>
                    <div>SSG Example</div>
                    <HomePage page={page} />
                </>
            )
        case 'breads.BreadPage':
            return (
                <>
                    <div>SSG Example</div>
                    <BreadPage page={page} />
                </>
            )
        case 'blog.BlogPage':
            return (
                <>
                    <div>SSG Example</div>
                    <BlogPage page={page} />
                </>
            )
        default:
            console.error('Unsupported page contentType:');
            return <Error statusCode={404} />;
    }
}


export const getStaticPaths = async ({ params }) => {
    const { data } = await client.query({
        query: gql` 
        query {
            pages(limit: 100) {
                title
                contentType
                url
            }
        }
        `,
    });

    // Get the paths we want to pre-render
    const paths = data.pages.map((page) => {
        const slugArray = page.url.match(/([^\/]+)/g)
        return {
            params: {
                slug: slugArray ? slugArray : ['/']
            }
        }
    })

    return { paths, fallback: true }
}

export async function getStaticProps({ params }) {
    // Create url path, set as to query home page if no slug
    const urlPath = !params.hasOwnProperty('slug') ? '/' : Array.isArray(params.slug) ? params.slug.join('/') : params.slug

    try {
        const { data } = await client.query({
            query: gql` 
            query($urlPath: String) {
                page(urlPath: $urlPath) {
                    title
                    contentType
                    url
                }
            }
            `,
            variables: {
                urlPath,
            },
            fetchPolicy: 'network-only',
        });

        if (data.page === null) return { notFound: true };
        return {
            props: {
                page: data.page,
            },
        };
    } catch (error) {
        console.error(error);
        return { notFound: true };
    }

}


export default Page;
