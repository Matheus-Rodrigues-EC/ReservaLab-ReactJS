# Docker Configuration para ReservaLab

Este projeto possui configurações Docker para desenvolvimento e produção.

## Arquivos Docker

- `Dockerfile` - Build para produção (multi-stage com Nginx)
- `Dockerfile.dev` - Build para desenvolvimento
- `docker-compose.yml` - Desenvolvimento com hot reload
- `docker-compose.production.yml` - Produção
- `nginx.conf` - Configuração do Nginx para produção

## Comandos Úteis

### Desenvolvimento

```bash
# Buildar e iniciar em modo desenvolvimento
docker-compose up --build

# Iniciar em background
docker-compose up -d

# Ver logs
docker-compose logs -f

# Parar
docker-compose down
```

### Produção

```bash
# Buildar e iniciar em modo produção
docker-compose -f docker-compose.production.yml up --build

# Iniciar em background
docker-compose -f docker-compose.production.yml up -d

# Parar
docker-compose -f docker-compose.production.yml down
```

### Build Manual

```bash
# Build da imagem de produção
docker build -t reservalab-frontend:prod .

# Build da imagem de desenvolvimento
docker build -f Dockerfile.dev -t reservalab-frontend:dev .

# Executar container de produção
docker run -p 80:80 reservalab-frontend:prod

# Executar container de desenvolvimento
docker run -p 5173:5173 -v ${PWD}:/app -v /app/node_modules reservalab-frontend:dev
```

## Portas

- **Desenvolvimento**: http://localhost:5173
- **Produção**: http://localhost

## Variáveis de Ambiente

- `VITE_API_URL` - URL da API backend (padrão: http://localhost:8080)

## Estrutura

### Desenvolvimento

- Usa Node.js Alpine
- Hot reload habilitado
- Volume mapeado para desenvolvimento ágil
- Instala todas as dependências (incluindo dev)

### Produção

- Multi-stage build
- Primeira etapa: Build com Node.js
- Segunda etapa: Serve com Nginx
- Imagem otimizada e menor
- Apenas arquivos de produção
