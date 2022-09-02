import express from "express";
import mongoose from "mongoose";




const app = express();
app.use(
    express.urlencoded({
        extended:true,
    })
)
app.use(express.json());

const Products = mongoose.model('Product',{
    nomeProduto: String,
    valorProduto: Number,
    descricaoProduto:String
})
app.get('/',(req,res) => {

    res.status(200).send('Selecione a uma rota valida');
})
app.get('/produtos', async (req,res)=>{                             // Rota que recebe as Informações do BD

    try {                                                       //Retorna os produtos se a busca ocorrer perfeitamente
        const allProducts = await Products.find()
        res.status(200).json(allProducts)
    } catch (error) {                                           // retorna Erro 
        res.status(500).json({error:error})
    }

})

app.post('/newProduct', async (req,res) =>{                          // Rota que cria novos produtos no BD
   const {nomeProduto,valorProduto,descricaoProduto} = req.body
    if(!nomeProduto){
        res.status(422).json({error:'O Produto não foi encontrado'})
        return
    }
   const product = {
        nomeProduto,
        valorProduto,
        descricaoProduto
    }
    try {
        await Products.create(product)
        res.status(201).json({mensage:"Produto inserido com sucesso"})
        
    } catch (error) {
        res.status(500).json({error:error})
    }

    
})

app.patch ('/edit/:id', async (req,res) =>{                            // Rota edita o produto, buscando pelo ID. Pode editar apenas 1 informação do produto
    const id = req.params.id 
    const {nomeProduto,valorProduto,descricaoProduto} = req.body
    const product = {
        nomeProduto,
        valorProduto,
        descricaoProduto
    }

    try {
        const editProduto = await Products.updateOne({_id:id},product)
        if (editProduto.matchedCount===0){
            res.status(422).json({error:"Produto não encontrado"})
        return
        }
        res.status(200).json(product)
    } catch (error) {
        res.status(500).json({error:error})
    }

})

app.delete ('/delete/:id', async (req,res) =>{                         // ROta apaga o produto buscando pelo Id
    const id = req.params.id 
    const product = await Products.findOne({_id:id})
    if(!product){
        res.status(422).json({error:"Produto não encontrado"})
        return
    }

    try {
        await Products.deleteOne({_id:id})
        res.status(200).json({ message: 'Usuário removido com sucesso!' })
    } catch (error) {
        res.status(500).json({error:error})
    }

})


export default app
