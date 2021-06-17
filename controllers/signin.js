const handleSignin = (req,res,db,bcrypt)=>{
    const{email, pass} = req.body;
    if(!email || !pass){
        return res.status(400).json("Incorrect Form Submission");
      }
    db.select('email','hash').from('login')
    .where('email' , '=' , email)
    .then(data => {
      const isValid =  bcrypt.compareSync(pass, data[0].hash);
      console.log(isValid)
      if(isValid)
      {
         return db.select('*').from('users').where('email', '=', email)
          .then(user=>{
              console.log(user[0])
              res.json(user[0])
          })
          .catch(err => res.json.status(400).json('Unable to get user'))
      }
      else{
        res.status(400).json('Wrong credential')
      }
      
    })
    .catch(err => res.status(400).json('Wrong credential'))
    
}

module.exports = {
    handleSignin: handleSignin
}