const preview = async (req, res) => {
    const { content_type: contentType, token } = req.query;

    if (!token) {
        return res.status(401).json({ message: 'Missing preview token.' });
    }

    res.setPreviewData(
        { contentType, token },
        {
            maxAge: 60 * 60, // The preview mode cookies expire in 1 hour.
        }
    );
    
    if (contentType === "base.HomePage") {
        res.redirect('/_preview-homepage');
    } else {
        res.redirect('/_preview');
    }
    return res.end();
};

export default preview;