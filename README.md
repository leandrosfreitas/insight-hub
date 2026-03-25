# Insight Hub

## Descrição do projeto

Insight Hub é uma plataforma de insights econômicos com:

- Backend em FastAPI (Python), API REST e autenticação JWT  
- Banco de dados PostgreSQL (Supabase) com SQLAlchemy  
- Frontend em React + TypeScript + Vite com gráficos e filtros  
- Pipeline de ingestão/sincronização de indicadores (BCB) e DAGs Airflow  

O objetivo é fornecer análises de indicadores e séries temporais em um painel visual.

---

## Como instalar e executar

### Requisitos

- Docker/Docker Compose (opcional, para ambiente completo)  
- Python 3.12+  
- Poetry (gerenciador de dependências)  
- Node.js + npm  

---

### 1) Com Docker Compose (opcional)

```bash
git clone https://github.com/leandrosfreitas/insight-hub.git
cd insight-hub
docker compose up --build
```

Acesse:
- API: http://localhost:8000/docs  
- Frontend: http://localhost:4173  
- Airflow: http://localhost:8080  

---

### 2) Ambiente local (recomendado para desenvolvimento)

#### Backend (FastAPI + Poetry)

```bash
cd backend

# Instalar dependências
poetry install

# Ativar ambiente virtual
poetry shell

# Rodar aplicação
uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
```

> Configure a variável de ambiente `DATABASE_URL` com a string de conexão do Supabase.

---

#### Frontend (React + Vite)

```bash
cd frontend
npm install
npm run dev
```

Acesse: http://localhost:5173

---

## Exemplo de uso

1. Crie usuário:
   - `POST /api/v1/users` com `name`, `email`, `password`  

2. Faça login:
   - `POST /api/v1/auth/login` → # Insight Hub

## Descrição do projeto

Insight Hub é uma plataforma de insights econômicos com:

- Backend em FastAPI (Python), API REST e autenticação JWT.
- Banco de dados PostgreSQL (Supabase) com SQLAlchemy.
- Frontend em React + TypeScript + Vite com gráficos e filtros.
- Pipeline de ingestão/sincronização de indicadores (BCB) e DAGs Airflow.

O objetivo é fornecer análises de indicadores e séries temporais em um painel visual.

---

## Como instalar e executar

### Requisitos

- Docker/Docker Compose (opcional, para ambiente completo)
- Python 3.12+
- Poetry (gerenciador de dependências)
- Node.js + npm

---

### 1) Com Docker Compose (opcional)

```bash
git clone <seu-repo>
cd insight-hub
docker compose up --buildretorna `access_token`  

3. Utilize o token no header:
   - `Authorization: Bearer <token>`  

4. Consulte os dados:
   - `GET /api/v1/indicators`  
   - `GET /api/v1/datapoints`  

5. Sincronize indicadores do BCB:
   - `POST /api/v1/indicators/sync`  

No frontend, faça login e explore:
- Dashboard de métricas  
- Gráficos de comparação de indicadores  
- Filtros por período  

---

## Contribuições futuras

- Adicionar filtros avançados (região, setor, categoria)  
- Implementar cache de resultados e endpoints de agregação  
- Suportar múltiplas bases temporais e comparações customizadas  
- Melhorar monitoramento (logs, métricas, tracing)  
- Implementar testes de integração (E2E)  
- Configurar CI/CD com deploy automático (GitHub Actions)  

---

## Contatos úteis

### Ambientes de produção

- API (Render): https://insight-hub-9m87.onrender.com/docs  
- Frontend (Vercel): https://insight-hub-chi.vercel.app/  

### Serviços utilizados

- Banco de dados (Supabase): painel de controle e gestão do PostgreSQL  
- Airflow (caso deployado): URL do ambiente configurado
