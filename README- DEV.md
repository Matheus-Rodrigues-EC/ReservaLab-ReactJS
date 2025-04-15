# 💻 ReservaLab - Frontend (React + Vite)

Este é o frontend da aplicação ReservaLab, feito com React + Vite.

---

## ▶️ Rodar localmente com Docker

Para rodar o frontend isolado via Docker:

```bash
docker-compose -f docker-compose.local.yml up --build -d
```
A aplicação estará acessível em http://localhost:5173.

## 🌐 Variáveis de ambiente

O frontend depende da variável VITE_API_URL para se comunicar com a API.

---

No docker-compose.local.yml, ela já vem configurada como:

```ini
VITE_API_URL=http://localhost:3000
```

## 🔗 Orquestração completa
Se você quiser rodar o sistema completo com backend e banco de dados, use o repositório:

👉 [ReservaLab-FullStack](https://github.com/Matheus-Rodrigues-EC/ReservaLab-FullStack)

```bash
docker-compose up --build -d
```
