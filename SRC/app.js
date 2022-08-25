import express from "express";
import mongoose from "mongoose";


const app = express();
app.use(
    express.urlencoded({
        extended:true,
    })
)
app.use(express.json());


const produtos = [
    {
        id:1,
        item:"Edredon",
        preço:16990/100, 
    
    },

    {
        id:2,
        item:"Jogo de panela",
        preço:22990/100, 
    }
]

app.get('/',(req,res) => {

    res.status(200).send('Selecione a uma rota valida');
})
app.get('/produtos', async (req,res)=>{

    try {
        const allProducts = await Products.find()
        res.status(200).json(allProducts)
    } catch (error) {
        res.status(500).json({error:error})
    }
    
})
app.get ('/produtos/:id', async (req,res) =>{
    const id = req.params.id    

    try {
        const produtoOne = await Products.findOne({_id: id})

        if(!produtoOne){
        res.status(422).json({message:'O Produto não foi encontrado'})      
        return
        }
        res.status(200).json(produtoOne)
    } catch (error) {
        res.status(500).json({error:error})
    }   

})
app.post('/newProduct', async (req,res) =>{
   const {nomeProduto,valorProduto,descricaoProduto} = req.body
    if(!nomeProduto){
        res.status(422).json({error:"o nome do"})
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

app.patch ('/edit/:id', async (req,res) =>{
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

app.delete ('/delete/:id', async (req,res) =>{
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