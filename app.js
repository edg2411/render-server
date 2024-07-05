const express = require('express');
  
const app = express();
const PORT = 5000;
  
app.get('/', (req, res)=>{
    res.status(200);
    res.send("This is from root!");
});
  
app.listen(PORT, (error) =>{
    if(!error)
        console.log(`Server is running on port: ${PORT}`);
    else
        console.log("Error: ", error);
    }
);