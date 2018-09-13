import express from 'express';

async function getAll(req, res) {
    res.status(200).send({});
}

export async function create(req, res) {
}

export async function createFromOffer(req, res) {
}

let router = express.Router();
router.get('/', getAll);
router.post('/create', create);
router.post('/create-from-offer', createFromOffer);

export default router;
