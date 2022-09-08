const express = require('express');
const router = express.Router();
const Subscriber = require('../models/subscriber');

//Get all the subscribers
router.get('/', async (req, res) => {
    try {
        const subscribers = await Subscriber.find();
        res.json(subscribers);
    } catch(err) {
        res.status(500).json({error : err.message});
    }
});

//Get one subscriber
router.get('/:id', getSubscriber, (req, res) => {
    res.json(res.subscriber);
});

//Add new subscriber
router.post('/', async(req, res) => {
    const subscriber = new Subscriber({
        name: req.body.name,
        subscribedToChannel : req.body.subscribedToChannel
    });

    try{
        const newSubscriber = await subscriber.save();
        res.status(201).json(newSubscriber);
    } catch(err) {
        res.status(400).json({error : err.message});
    }
});

//Update existing subscriber
router.patch('/:id', getSubscriber, async (req, res) => {

    if(req.body.name != null){
        res.subscriber.name = req.body.name;
    }

    if(req.body.subscribedToChannel != null) {
        res.subscriber.subscribedToChannel = req.body.subscribedToChannel;
    }

    try{
        const updatedSubscriber = await res.subscriber.save();
        res.json(updatedSubscriber);
    } catch (err) {
        res.status(400).json({ message : err.message});
    }
});

//Delete existing subscriber
router.delete('/:id', getSubscriber, async (req, res) => {
    try{
        await res.subscriber.delete();
        res.json({ message : 'Deleted Sucessfully!!!'})
    } catch (err) {
        res.status(500).json({ message : err.message});
    }
});

//Helper methods
async function getSubscriber(req, res, next) {

    let subscriber;
    try {
        subscriber = await Subscriber.findById(req.params.id);
        if(subscriber == null) {
            res.status(404).json({ message : 'Cannot find subscriber with given id'});
        }
    } catch (err) {
        res.status(500).json({ error : err.message});
    }
    res.subscriber = subscriber;
    next();
}


module.exports = router;