
const index = (req, res) => {
    res.render('index', { title: 'Node Sample in Express' });
};

module.exports = {
    index
}