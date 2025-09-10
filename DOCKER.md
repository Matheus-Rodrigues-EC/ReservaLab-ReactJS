# ReservaLab - Docker Setup

Este documento explica como executar o projeto ReservaLab usando Docker.

## Arquivos Docker

- `Dockerfile` - Para desenvolvimento com hot reload
- `Dockerfile.prod` - Para produção com Nginx
- `docker-compose.yml` - Para ambiente de desenvolvimento
- `docker-compose.prod.yml` - Para ambiente de produção

## Desenvolvimento

### Executar em modo desenvolvimento:

```bash
# Build e start todos os serviços
docker-compose up --build

# Ou em background
docker-compose up --build -d

# Parar os serviços
docker-compose down
```

### Acessar a aplicação:

- Frontend: http://localhost:5173
- Backend: http://localhost:8080
- PostgreSQL: localhost:5440

## Produção

### Executar em modo produção:

```bash
# Build e start todos os serviços
docker-compose -f docker-compose.prod.yml up --build

# Ou em background
docker-compose -f docker-compose.prod.yml up --build -d

# Parar os serviços
docker-compose -f docker-compose.prod.yml down
```

### Acessar a aplicação:

- Frontend: http://localhost:80
- Backend: http://localhost:8080
- PostgreSQL: localhost:5432

## Configuração do Backend

No arquivo `docker-compose.yml`, você precisa substituir a linha:

```yaml
image: reservalab-backend:dev
```

Por uma das opções:

### Opção 1: Se você tem uma imagem do backend no Docker Hub:

```yaml
image: seu-usuario/reservalab-backend:tag
```

### Opção 2: Se você tem o código do backend localmente:

```yaml
build:
  context: ../caminho-para-backend
  dockerfile: Dockerfile
```

### Opção 3: Se o backend está em outro repositório:

```yaml
build:
  context: https://github.com/seu-usuario/reservalab-backend.git
  dockerfile: Dockerfile
```

## Variáveis de Ambiente

### Frontend (.env)

```bash
VITE_API_URL=http://localhost:8080
```

### Backend

As variáveis de ambiente do backend devem ser configuradas no `docker-compose.yml`:

```yaml
environment:
  - NODE_ENV=development
  - DATABASE_URL=postgresql://postgres:postgres@reservalab-postgres:5432/reservalab
  - JWT_SECRET=your-jwt-secret
  # Adicione outras variáveis conforme necessário
```

## Comandos Úteis

```bash
# Ver logs dos containers
docker-compose logs -f

# Ver logs de um serviço específico
docker-compose logs -f reservalab-frontend

# Executar comandos dentro do container
docker-compose exec reservalab-frontend npm install

# Rebuildar apenas um serviço
docker-compose up --build reservalab-frontend

# Limpar volumes e redes
docker-compose down -v --remove-orphans
```

## Troubleshooting

### Se der erro de "ContainerConfig":

```bash
# Limpar imagens órfãs
docker system prune -a -f

# Rebuildar tudo
docker-compose down -v
docker-compose up --build
```

### Se o frontend não conseguir conectar ao backend:

1. Verifique se a variável `VITE_API_URL` está correta
2. Certifique-se de que o backend está rodando na porta 8080
3. Verifique os logs do backend: `docker-compose logs -f reservalab-backend`
