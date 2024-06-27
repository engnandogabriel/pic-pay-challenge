# pic-pay-challeng

## Resolução do desafio backend da empresa PicPay usando NodeJs com typescript.
O [desafio resolvido](https://github.com/PicPay/picpay-desafio-backend) foi um sistema de transferência bancária, no qual temos 2 tipos de usuários:
os comuns e lojistas, ambos têm carteira com dinheiro e realizam transferências entre eles.

## Desenvolvimento
* O sistema foi desenvolvido usando clean architecture e clean code
* Uso de DDD e SOLID;
* Utilização de alguns desing patterns;
* banco de dados mysql e o framework express para criação de API's;

## Instalação

rode os seguintes comandos no terminal
```
git clone git@github.com:engnandogabriel/desafio-picpay-nodejs.git
npm iinstall 
npm run dev
```
Versão do node: v18.13

### Payload

#### Rota para criação de usuários
POST /user

expemplo:
```json
{
   "name:"john doe",
    "document":"12345678910",
    "email":"teste@gmail.com",
    "password":"12345678",
    "balance":1000,
    "typeUser":"merchant"
    }
```
#### Rota para listar usuários
GET /user

expemplo:
```
json
  {
        "id": "0047ade4-a4fe-405a-9e54-93892805ab9e",
        "document": "628.031.203-80",
        "email": "nando@gmail.com",
        "password": "123456",
        "balance": 1000,
        "typeUser": "common"
    },
    {
        "id": "e9494622-02dc-4152-9932-4b8895483460",
        "document": "030.559.163-01",
        "email": "marcosg@gmail.com",
        "password": "123456",
        "balance": 500,
        "typeUser": "merchant"
    
}
```


#### Rota para criação de uma transação
POST /transfer

```json
{
    "value" : 260.35,
    "payer" : "0047ade4-a4fe-405a-9e54-93892805ab9e",
    "payee" : "e9494622-02dc-4152-9932-4b8895483460"
}
```

#### Rota para listar as transações
GET /transfer

```json
  {
            "id": "0047ade4-a4fe-405a-9e54-93892805ab9e",
            "value": "260.35",
            "payer": {
                "id": "0047ade4-a4fe-405a-9e54-93892805ab9e",
                "firstName": "Nando Gabriel",
                "lastName": "Machado Bezerra",
                "document": "628.031.203-80",
                "email": "nando@gmail.com",
                "password": "123456",
                "balance": 739.65,
                "typeUser": "common"
            },
            "payee": {
                "id": "e9494622-02dc-4152-9932-4b8895483460",
                "firstName": "Marcos",
                "lastName": "Leonardo",
                "document": "030.559.163-01",
                "email": "marcosg@gmail.com",
                "password": "123456",
                "balance": 760.35,
                "typeUser": "merchant"
            },
            "created_at": "2023-08-28T17:30:35.966Z"
        }
```

