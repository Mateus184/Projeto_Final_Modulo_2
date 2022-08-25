import app from './SRC/app.js'
import mongoose from 'mongoose';


mongoose.connect('mongodb+srv://OlucasPio:wkcNSLiRGJD1Os9v@apicluster.9snmg0v.mongodb.net/?retryWrites=true&w=majority')
.then(()=>{

    app.listen(3000)
    console.log('Conectado ao Banco de dados')
})

.catch((err)=> console.log(err))