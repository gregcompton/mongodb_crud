app.post('/', (req,res,next)=>{
  const userInput = req.body;


  Joi.validate(userInput, schema, (err,result)=>{
    if(err){
      const error = new Error("Invalid Input");
      error.status = 400;
      next(error);
    }
    else{
      db.getDB().collection(collection).insertOne(userInput,(err,result)=>{
        if(err){
          const error = new Error("Failed to insert ToDo Document");
          error.status = 400;
          next(error);
        }
        else{
          res.json({result : result, document : result.ops[0],msg : "Successfully inserted Todo!", error : null});
        }
      });
    }
  });
});
