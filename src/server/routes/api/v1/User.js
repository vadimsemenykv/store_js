import express from 'express';

async function get(req, res) {
    res.status(200).send({});
}

export async function create(req, res) {
}

export async function update(req, res) {
}


export async function login(req, res) {
}


export async function logout(req, res) {
}

let router = express.Router();
router.get('/', get);
router.post('/create', create);
router.patch('/update', update);
router.post('/login', login);
router.post('/logout', logout);

export default router;
