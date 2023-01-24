# Sistema de Notificações
Sistema Web feito com React e NodeJs visando a unificação de notificações em uma unica plataforma e com disponibilização de API para integração com outros sistemas.


## Autores

- [@Mathss18](https://github.com/Mathss18)


## Stack utilizada

**Front-end:** React, Material UI, Vite, Typescript

**Back-end:** Node, Express, TypeORM, Nginx, Mysql, Adminer, Typescript

**Infra:** Docker e docker-compose


## Instalação

Todo o projeto foi feito com a utlização do Docker 
- (Docker version 20.10.21)
- (Docker Compose version v2.13.0)

Clonar o projeto
```bash
 git clone https://git.vibbra.com.br/matheus-1672120744/notifications-vibbra.git
```

Entrar na pasta do projeto
```bash
  cd notifications-vibbra
```

Acessar o backend
```bash
  cd notifications-backend
```

Criar `.env` apartir da `.env.example`
```bash
  cp .env.example .env
```

Iniciar container docker do backend (nessa parte - o projeto ainda não estará pronto para executar)
```bash
  docker-compose up --build -d
```

configurar a .env
```bash
  docker exec -it notifications-backend_nodejs_1 /bin/bash
```

Gerar as Vapid Keys que vamos utilizar, cole os valores gerados de `PUBLIC_KEY` e `PRIVATE_KEY` na sua `.env`
 ```bash
    node ./node_modules/.bin/web-push generate-vapid-keys
```
Não se esqueça de setar um `JWT_SECRET` e os dados do banco, aqui vai um exmplo de `.env` completa:

```markdown
# Webpush keys
PUBLIC_KEY=BGZU72c5G1AsT71KoqbnKuo24IoZsAvclXGIZEpkaSt_vQkV117MeeTIqSmmbt0zwGU0AoNE19BsQV1D_N-580o
PRIVATE_KEY=Esu54te35H9FIA7xUHgbRr_tVOYBLQliC1-03JqmICU

# JWT Secret
JWT_SECRET=secreto

# Database connection
MYSQL_HOST='mysql'
MYSQL_PORT='3306'
MYSQL_DATABASE='notifications'
MYSQL_USER='matheus'
MYSQL_PASSWORD='123456'
MYSQL_ROOT_PASSWORD='root'
```

- pare o projeto e rode novamente
```bash
  docker-compose down && docker-compose up
```

- Agora, vamos configurar o frontend
```bash
  cd ..
  cd notifications-frontend
  docker-compose up --build
```
- Se tudo ocorreu corretamente, você conseguirá acessar a plataforma em:  http://localhost:5173/ e a API em http://localhost:80
## Documentação da API

####  Retorna o token para autenticação 

```http
  GET /api/login
```

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `email` | `string` | **Obrigatório** |
| `password` | `string` | **Obrigatório** |

#### Retorna o token para autenticação

#### O Restante da Documentação pode ser econtrada exportada para Insomnia em: https://dontpad.com/vibbra-matheus-notifications-api-doc




## Melhorias

Possiveis Melhorias: 
 - Implementação de testes
 - Utilização de sistema de mensageria

