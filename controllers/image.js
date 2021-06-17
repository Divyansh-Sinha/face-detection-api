const Clarifai = require('clarifai');

const app = new Clarifai.App({
    apiKey: "9de7c18ec75c47e7a89bb925d7562f43",
   });

const  handleApiCall = (req,res)=>{
    app.models
        .predict(Clarifai.FACE_DETECT_MODEL,req.body.input)
        .then(data => {
            res.json(data)
        })
        .catch(err=> res.status(400).json("Unable to Work with Api"))

}

const handleImage = (req,res,db)=>{
    const {id} = req.body;
    db('users').where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries =>{
        res.json(entries[0])
    })
    .catch(err => res.status(400).json('unable to get entries'))
}

module.exports = {
    handleImage,
    handleApiCall
}