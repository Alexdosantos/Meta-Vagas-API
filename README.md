<div style="background-color: black;">
  <p align="center">
      <img src="./assets/metavagas.png" width="350px" alt="Descrição da imagem" style="margin-top: 20px;">
  </p>
</div>


  

## 📝Descrição do Projeto

Meta Vagas é uma plataforma online dedicada à busca de oportunidades de emprego no setor de tecnologia, especialmente no mundo da programação. Com o objetivo de conectar profissionais qualificados a empresas inovadoras, o Meta Vagas oferece uma variedade de recursos para simplificar o processo de busca e aplicação para vagas de emprego.

## 📝Descrição da API do Meta Vagas

A API Meta Vagas é uma solução robusta que possibilita a construção de uma plataforma de oportunidades de emprego no setor de tecnologia. Com sua implementação, é possível oferecer aos usuários uma gama de funcionalidades essenciais, incluindo:

- Cadastro de Novos Usuários: Permite que novos usuários se cadastrem na plataforma, fornecendo informações de perfil e acesso a recursos personalizados, como favoritos e notificações de novas vagas.

- Cadastro de Vagas: Permite que empresas e recrutadores registrem oportunidades de emprego detalhadas, com especificações claras sobre requisitos e informações relevantes da vaga.

- Pesquisa Avançada: Oferece aos usuários a capacidade de realizar buscas refinadas por vagas de emprego, utilizando critérios como cidade, tecnologia específica e outros filtros personalizados.

- Estatísticas de Emprego: Disponibiliza insights valiosos sobre as tendências do mercado de trabalho, destacando as tecnologias mais demandadas e as regiões com maior número de oportunidades de emprego no campo da tecnologia.

- Favoritos Personalizados: Permite que os usuários marquem e salvem suas vagas de emprego favoritas, facilitando o acesso posterior e o acompanhamento das oportunidades desejadas.

A construção desta API visa proporcionar uma experiência completa e eficiente para usuários que buscam oportunidades de emprego no setor de tecnologia, ao mesmo tempo que oferece uma interface amigável e acessível para os desenvolvedores integrarem facilmente a funcionalidade de vagas de emprego em suas plataformas e aplicativos.

## 🔨 Tecnologias usadas para a construção da API do Meta Vagas

- [Nodejs](https://nodejs.org/en) O Node.js é uma plataforma de tempo de execução JavaScript de alto desempenho, que facilita a criação de APIs escaláveis e eficientes. Sua natureza assíncrona e baseada em eventos torna-o ideal para lidar com um grande volume de solicitações simultâneas, proporcionando uma base sólida para o desenvolvimento de serviços web ágeis e responsivos.

- [TypeScript](https://www.typescriptlang.org/) O TypeScript é uma linguagem de programação de código aberto que estende o JavaScript, adicionando tipagem estática opcional e outros recursos avançados. Ao ser usado no desenvolvimento de APIs, o TypeScript fornece uma base sólida para construir aplicativos escaláveis e robustos, oferecendo maior segurança e facilidade de manutenção por meio de verificações de tipo estático e uma sintaxe mais expressiva.

## 🔨 Banco de dados que armazena os dados do Meta Vagas

- [MongoDB](https://www.mongodb.com/pt-br) O MongoDB foi selecionado como o sistema de banco de dados principal para o projeto Meta Vagas devido à sua capacidade de lidar com dados não estruturados e semiestruturados, oferecendo flexibilidade e escalabilidade para a gestão eficiente de informações relacionadas a oportunidades de emprego e usuários.

## 🔨 Bibliotecas usadas para a construção da API do Meta Vagas

- [Express](https://expressjs.com/pt-br/) Utilizado como o principal framework de aplicativos da web Node.js, o Express fornece uma base sólida para o desenvolvimento de APIs RESTful, facilitando a criação de rotas, o gerenciamento de solicitações e respostas HTTP, e a integração de middleware para funcionalidades adicionais.

- [Bcrypt](https://www.npmjs.com/package/bcrypt) Utilizado para a criptografia avançada de senhas de usuários, o Bcrypt garante a segurança das informações confidenciais, protegendo as credenciais de login dos usuários de possíveis ameaças de segurança.

- [Mongoose](https://mongoosejs.com/) Implementado como uma camada de modelagem de dados para o MongoDB, o Mongoose oferece uma interface simples e baseada em esquemas para interagir com o banco de dados, facilitando o gerenciamento e a manipulação de dados relacionados a usuários e vagas de emprego.

- [Jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken) Empregado para a autenticação de usuários e geração de tokens de acesso, o Jsonwebtoken garante a segurança das interações entre os clientes e a API, proporcionando uma experiência segura e confiável para os usuários autenticados.

- [Yup](https://www.npmjs.com/package/yup) Utilizado como uma biblioteca de validação de esquemas, o Yup oferece uma maneira simples e robusta de validar dados de entrada, garantindo a integridade e consistência das informações fornecidas pelos usuários durante o processo de cadastro e atualização de perfil.

- [Vitest](https://vitest.dev/guide/coverage.html) Utilizado para testes automatizados, o Vitest permite a execução de testes de unidade e integração, garantindo a qualidade e a estabilidade da API Meta Vagas, e assegurando que todas as funcionalidades estejam funcionando conforme o esperado durante o desenvolvimento e implantação.

- [Dotenv](https://www.npmjs.com/package/dotenv) é uma biblioteca de dependência leve que permite carregar variáveis de ambiente de arquivos .env em aplicativos Node.js. Com o Dotenv, os desenvolvedores podem configurar facilmente variáveis de ambiente específicas do ambiente de desenvolvimento, como chaves de API, senhas e outras configurações sensíveis, sem precisar expô-las no código fonte. Isso ajuda a proteger informações confidenciais e simplifica a configuração de aplicativos em diferentes ambientes de desenvolvimento.
## 🚀 URL DA API PARA USAR DIRETO NO INSOMNIA OU POSTMAN
``` bash 
# URL DA API
https://meta-vagas.cyclic.cloud/{"COLOQUE AS ROTAS AQUI"}

# AS ROTAS ESTÃO NA DESCRIÇÃO ABAIXO

```


## 🚀 Caso queira rodar o projeto em sua maquina , aqui estão os comandos 👇👇👇
``` bash 
# Rodar o projeto
npm run start:dev

# Rodar o testes unitários
npm run test
```
## 🚀 Variáveis de Ambiente
``` bash 
# Conexão com banco de dados MongoDB
DATABASE_URL= "SUA CHAVE DE CONEXÃO COM MONGODB"

# Porta para conectar  o servidor
PORT = 3001 / "caso não passe a porta para a conexão do servidor, ele  irá rodar automaticamente na porta 3001"

# SecretKey
SECRET_KEY= "VOCÊ PRECISA PASSAR SUA CHAVE DE AUTENTICAÇÃO DO JWT PARA QUE OS TOKENS FUNCIONEM CORRETAMENTO."
```

## 🔌Rotas da API

A API Meta Vagas oferece várias rotas para realizar diferentes operações relacionadas a oportunidades de emprego e usuários. Abaixo estão detalhadas as principais rotas e os objetos retornados em cada rota:

### Rota de Cadastro de Usuários

- **Endpoint:** `{URL}/users/create`
- **Método:** POST
- **Descrição:** Esta rota permite que novos usuários se cadastrem na plataforma.
- **Objeto de Requisição:**
  
  ```json
  {
    "name": "example_user",
    "email": "user@example.com",
    "password": "your_password"
  }
### Rota de Login do Usuário

- **Endpoint:** `{URL}/users/login`
- **Método:** POST
- **Descrição:** Esta rota permite que os usuários realize o login.
- **Objeto de Resposta Sucesso:**
 
  ```json
  {
     "email": "user@example.com",
     "password": "your_password"
  }

### Rota de Edição do Usuário

- **Endpoint:** `{URL}/users/update/:_id`
- **Método:** PUT
- **Descrição:** Esta rota permite que os usuários realize a edição de seus dados.
- **Objeto de Resposta Sucesso:**
 
  ```json
  {
    "name": "example_user",
    "email": "user@example.com",
    "password": "your_password"
  }
### Rota de Favoritar Vagas 

- **Endpoint:** `{URL}/users/:_userId/jobs/:_jobsId/favorites`
- **Método:** POST
- **Descrição:** Esta rota permite que os usuários classifique as vagas como favoritas.
- **Objeto de Resposta Sucesso:**
 
  ```json
  {
    "_id": "650e6e6fe65fc44282ab2674",
	"name": "Alex santos",
	"email": "alex555@yahoo.com",
	"password": "$2b$10$dxhTfyUsiYPQcFmX.19Q8OgCmeZeIjX.3v6tH75A0eEE3ZRsxjAy.",
	"createdAt": "2023-09-23T04:49:51.903Z",
	"updatedAt": "2023-10-16T22:37:30.659Z",
	"__v": 0,
	"favoriteJobs": [
		"6523916df7325c7b262aaeff",
		"6524cc22dc06e01f88efd12b",
		"6523a5a54d8ec0af21c254df",
		"652c19a355e18dfa35c95907"
	]
  }
### Rota de Remover Vagas Favotiras 

- **Endpoint:** `{URL}/users/:_userId/jobs/:_jobsId/favorites`
- **Método:** DELETE
- **Descrição:** Esta rota permite que os usuários classifique as vagas como favoritas.
- **Objeto de Resposta Sucesso:**
 
  ```json
  {
    "_id": "650e6e6fe65fc44282ab2674",
	"name": "Alex santos",
	"email": "alex555@yahoo.com",
	"password": "$2b$10$dxhTfyUsiYPQcFmX.19Q8OgCmeZeIjX.3v6tH75A0eEE3ZRsxjAy.",
	"createdAt": "2023-09-23T04:49:51.903Z",
	"updatedAt": "2023-10-16T22:37:30.659Z",
	"__v": 0,
	"favoriteJobs": [
		"6523916df7325c7b262aaeff",
		"6524cc22dc06e01f88efd12b",
		"6523a5a54d8ec0af21c254df",
		
	]
  }
### Rota de Criação das Vagas

- **Endpoint:** `{URL}/jobs/create`
- **Método:** POST
- **Descrição:** Esta rota permite a criação de novas vagas.
- **Objeto de Resposta Sucesso:**
 
  ```json
  {
    "position": "Desenvolvedor Full Stack",
    "city": "São Paulo",
    "technology": "javascript",
    "company": " Alex technology ",
    "jobType": "Remoto",
    "workRegime": "Clt",
    "companySize": "Acima de 1000 funcionários",
    "description": "Precisamos com urgência",
    "experienceLevel":"Junior ou Pleno",
    "salary": "5000",
    "link": "https://www.google.com/"
  }

### Rota de Listagem das Vagas

- **Endpoint:** `{URL}/jobs/search`
- **Método:** GET
- **Descrição:** Esta rota permite a listagem de todos as vagas cadastras no sistema.
- **Objeto de Resposta Sucesso:**
 
  ```json
  {
    "_id": "652c19a355e18dfa35c95907",
	"position": "Desenvolvedor Full Stack",
	"city": "minas gerais",
	"technology": "javascript",
	"company": " Alex tecnologia ",
	"jobType": "Remoto",
	"workRegime": "PJ ou Clt",
	"companySize": "acima de 1000 funcionários",
	"description": "Precisamos com urgência",
	"experienceLevel": "Junior ou Pleno",
	"salary": "5000",
	"link": "https://www.google.com/",
	"createdAt": "2023-10-15T16:56:03.566Z",
	"updatedAt": "2023-10-15T16:56:03.566Z",
	"__v": 0
  }
### Rota de Listagem das 5 Cidades que mais Buscam as Tecnologias mais Buscadas

- **Endpoint:** `{URL}/citySearch/filterFiverCityAndTechnology`
- **Método:** GET
- **Descrição:** Esta rota permite buscar as 5 cidades que mais procuram a tecnologia mais buscada..
- **Objeto de Resposta Sucesso:**
 
  ```json
  
  [
        {
            "_id": null,
            "city": null,
            "totalCount": 285
        },
        {
            "_id": "Java",
            "city": "sorocaba",
            "totalCount": 63
        },
        {
            "_id": "javascript",
            "city": "sorocaba",
            "totalCount": 36
        },
        {
            "_id": "node",
            "city": null,
            "totalCount": 21
        },
        {
            "_id": "nodejs",
            "city": "Bauru",
            "totalCount": 20
        }
  ]
  
### Rota de Lista as 5 Cidades Mais Buscadas

- **Endpoint:** `{URL}/citySearch/filterFiverCity`
- **Método:** GET
- **Descrição:** Esta rota permite buscar as 5 cidades  mais buscada pelos usuários.
- **Objeto de Resposta Sucesso:**
 
  ```json
  
  [
        {
		    "_id": "São Paulo",
		    "count": 320
	    },
	    {
		    "_id": "Sorocaba",
		    "count": 120
	    },
	    {
		    "_id": "Bauru",
		    "count": 67
	    },
	    {
		    "_id": "Itaquera",
		    "count": 41
	    },
	    {
		    "_id": "Guarulhos",
		    "count": 25
	    }
  ]
  
  

### 📲 Contato

Você pode entrar em contato comigo pelo meu perfil do LinkedIn:

[![LinkedIn](https://img.shields.io/badge/-Alex%20dos%20Santos-0077B5?style=flat&logo=Linkedin&logoColor=white)](https://www.linkedin.com/in/alex-santoss/)

Você também pode me encontrar no Instagram:

[![Instagram](https://img.shields.io/badge/Alex%20dos%20Santos-E4405F?style=flat&logo=Instagram&logoColor=white)](https://www.instagram.com/lekotty/)


## Feedback e Sugestões

Estou sempre aberto a receber feedback e sugestões para melhorar o projeto Meta Vagas. Se você tiver alguma ideia, sugestão ou quiser relatar um problema, não hesite em entrar em contato. Sua opinião é fundamental para o aprimoramento contínuo deste projeto.




