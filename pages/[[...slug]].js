import Error from 'next/error';
import client from '../lib/apolloClient'
import HomePage from '../components/pages/HomePage'
import BreadPage from '../components/pages/BreadPage'
import BlogPage from '../components/pages/BlogPage'

import { gql } from '@apollo/client'

const Page = ({ page }) => {
    // Render page based of its contentType
    switch (page.contentType) {
        case 'base.HomePage':
            return (
                <>
                    <div>SSR Example</div>
                    <HomePage page={page} />
                </>
            )
        case 'breads.BreadPage':
            return (
                <>
                    <div>SSR Example</div>
                    <BreadPage page={page} />
                </>
            )
        case 'blog.BlogPage':
            return (
                <>
                    <div>SSR Example</div>
                    <BlogPage page={page} />
                </>
            )
        default:
            console.error('Unsupported page contentType:');
            return <Error statusCode={404} />;
    }
}


export const getServerSideProps = async ({ params }) => {
    // Create url path, set as to query home page if no slug
    const urlPath = !params.hasOwnProperty('slug') ? '/' : Array.isArray(params.slug) ? params.slug.join('/') : params.slug

    const { data } = await client.query({
        query: gql` 
        query($urlPath: String) {
          page(urlPath: $urlPath) {
            title
            contentType
          }
        }
        `,
        variables: {
            urlPath,
        }
    });

    if (data.page === null) return { notFound: true };

    return {
        props: {
            page: data.page,
        },
    };
};

export default Page;
