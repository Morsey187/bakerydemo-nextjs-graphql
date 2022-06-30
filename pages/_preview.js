import client from '../lib/apolloClient'
import { gql } from 'graphql-tag';

export const getServerSideProps = async ({ preview, previewData }) => {
    if (!preview) return { notFound: true };

    const { contentType, token } = previewData;

    const { data } = await client.query({
        query: gql`
            query ($contentType: String $token: String) {
                page(contentType: $contentType, token: $token) {
                    title
                    contentType
                }
            }
        `,
        variables: { contentType, token }
    });

    if (data.page === null) return { notFound: true };

    return {
        props: { page: data.page },
    };
};

export { default } from './[[...slug]]';
