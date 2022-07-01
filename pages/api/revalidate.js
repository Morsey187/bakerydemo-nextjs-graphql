// pages/api/revalidate.js

export default async function handler(req, res) {
    // Check for secret to confirm this is a valid request
    console.log("revalidate.js API request -> ", req.query)
    if (req.query.secret !== process.env.MY_SECRET_NEXT_JS_REVALIDATION_TOKEN) {
        return res.status(401).json({ message: 'Invalid token' })
    }

    if (!req.query.urlpath) {
        return res.status(401).json({ message: 'You must provide a urlpath' })
    }

    try {
        // this should be the actual path not a rewritten path
        // e.g. for "/blog/[slug]" this should be "/blog/post-1"
        await res.unstable_revalidate(req.query.urlpath)
        return res.json({ revalidated: true })
    } catch (err) {
        // If there was an error, Next.js will continue
        // to show the last successfully generated page
        console.log("error",err)
        return res.status(500).send('Error revalidating')
    }
}
