import app from './SRC/app.js'

const port = process.env.PORT || 3000;



app.listen(port,()=>{ 
    console.log('Servidor local na porta http://localhost:' + port +' Ok')

})