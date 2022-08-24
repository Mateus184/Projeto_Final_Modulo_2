import express from "express";

const app = express();
app.use(express.json());


const produtos = [
    {
        id:1,
        item:"Edredon",
        preço:'R$' + 16990/100, 
    
    },

    {
        id:2,
        item:"Jogo de panela",
        preço:'R$' + 22990/100, 
    }
]

app.get('/',(req,res) => {
    res.status(200).send('Selecione a uma rota valida');

})
app.get('/lista', (req,res)=>{
    res.status(200).json(produtos)
})

app.get ('/lista/:id', (req,res) =>{
    let index = busca(req.params.id)
    res.json(produtos[index])

})


app.post('/lista', (req,res) =>{
    produtos.push(req.body);
    res.status(201).json(produtos)
})

app.put ('/lista/:id', (req,res) =>{
    let index = busca(req.params.id)
    produtos[index].item = req.body.item;
    produtos[index].preço = req.body.preço;
    res.json(produtos)

})

app.delete ('/lista/:id', (req,res) =>{
    let {id} = req.params;
    let index = busca(id)
    produtos[index].item = req.body.item;
    produtos[index].preço = req.body.preço;
    produtos.splice(index, 1)
    res.json(produtos)

})






function busca (id){
    return produtos.findIndex(produtos => produtos.id ==id)
}



export default app