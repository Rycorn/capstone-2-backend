const User = require('../model/User');

const getAllUsers = async (req, res) => {
    const Users = await User.find();
    if (!Users) return res.status(204).json({ 'message': 'No Users found.' });
    res.json(Users);
}

const createNewUser = async (req, res) => {
    if (!req?.body?.firstname || !req?.body?.lastname) {
        return res.status(400).json({ 'message': 'First and last names are required' });
    }

    try {
        const result = await User.create({
            firstname: req.body.firstname,
            lastname: req.body.lastname
        });

        res.status(201).json(result);
    } catch (err) {
        console.error(err);
    }
}

const updateUser = async (req, res) => {
    if (!req?.body?.user) {
        return res.status(400).json({ 'message': 'user parameter is required.' });
    }

    const User = await User.findOne({ user: req.body.user }).exec();
    if (!User) {
        return res.status(204).json({ "message": `No User matches ${req.body.user}.` });
    }
    if (req.body?.wins) User.wins = req.body.wins;
    if (req.body?.losses) User.losses = req.body.losses;
    const result = await User.save();
    res.json(result);
}

const deleteUser = async (req, res) => {
    if (!req?.body?.id) return res.status(400).json({ 'message': 'User ID required.' });

    const User = await User.findOne({ _id: req.body.id }).exec();
    if (!User) {
        return res.status(204).json({ "message": `No User matches ID ${req.body.id}.` });
    }
    const result = await User.deleteOne(); //{ _id: req.body.id }
    res.json(result);
}

const getUser = async (req, res) => {
    if (!req?.params?.id) return res.status(400).json({ 'message': 'User ID required.' });

    const User = await User.findOne({ _id: req.params.id }).exec();
    if (!User) {
        return res.status(204).json({ "message": `No User matches ID ${req.params.id}.` });
    }
    res.json(User);
}

module.exports = {
    getAllUsers,
    createNewUser,
    updateUser,
    deleteUser,
    getUser
}
