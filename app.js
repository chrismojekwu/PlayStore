const express = require('express');
const morgan = require('morgan');
const playstore = require('./playstore')


const app = express();
app.use(morgan('common'));
app.listen(8000, () => {
    console.log('Server started')
})

app.get('/apps', (req,res) => {
    let apps = playstore
    
    const { sort , genre } = req.query;

   if(sort){
        if(!["Rating", "App", "rating", "app"].includes(sort)){
            res.status(400).send('Please sort by app or rating')
        }
    }

   if(sort === "Rating" || sort === "rating"){
     
      apps.sort((a, b) => {
         return a.Rating > b.Rating ? 1 : -1;
        })
    }

   if(sort === "App" || sort === "app"){
      
      apps.sort((a,b) => {
	  	return a.App < b.App? -1 : a.App > b.App ? 1 : 0;
	  })
    }

    if(genre){
        if(!['Action','Puzzle','Strategy', 'Casual', 'Arcade', 'Card'].includes(genre)){
            res.status(400).send("Please choose one of the following genres 'Action', 'Puzzle', 'Strategy', 'Casual', 'Arcade', 'Card' ")
        }
    } 
    
    if(genre){
        
       const newApps = apps.filter(app => {
            return app.Genres === `${genre}`
        })

       apps = newApps 
    }

   console.log(genre) 
   res.send(apps)
})
