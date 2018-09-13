import express from 'express';

async function getAll(req, res) {
    res.status(200).send({});
}

export async function create(req, res) {
}

export async function retract(req, res) {
}

export async function decline(req, res) {
}

let router = express.Router();
router.get('/', getAll);
router.post('/create', create);
router.patch('/retract', retract);
router.patch('/decline', decline);

export default router;
