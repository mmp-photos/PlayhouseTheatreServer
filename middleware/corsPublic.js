const corsPublic = (req, res, next) => {
    // Allow access to all domains for requests to the /public folder
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
};

export default corsPublic;