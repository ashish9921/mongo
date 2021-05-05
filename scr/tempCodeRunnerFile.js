
        const result=await studentin.save();
        res.status(201).render('index.hbs');
        console.log(result)