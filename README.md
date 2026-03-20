# Insight Hub

## Descrição do projeto

Insight Hub é uma plataforma de insights econômicos com:
- Backend em FastAPI (Python), API REST e autenticação JWT.
- Banco de dados PostgreSQL com SQLAlchemy.
- Frontend em React + TypeScript + Vite com gráficos e filtros.
- Pipeline de ingestão/sincronização de indicadores (BCB) e DAGs Airflow.

O objetivo é fornecer análises de indicadores e séries temporais em um painel visual.

## Como instalar e executar

### Requisitos
- Docker/Docker Compose (recomendado)
- Python 3.12+ (apenas se rodar sem Docker)
- Node.js + npm (para frontend sem Docker)

### 1) Com Docker Compose (mais rápido)

```bash
git clone <seu-repo>
cd insight-hub
docker compose up --build
```

Acesse:
- API: `http://localhost:8000/docs`
- Frontend: `http://localhost:4173`
- Airflow: `http://localhost:8080`

### 2) Sem Docker (ambiente local)

#### Backend

```bash
cd backend
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt   # ou use poetry install
uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
```

> Ajuste `DATABASE_URL` para o seu PostgreSQL local.

#### Frontend

```bash
cd frontend
npm install
npm run dev
```

Acesse: `http://localhost:5173`

## Exemplo de uso

1. Crie usuário:
   - `POST /api/v1/users` com `name`, `email`, `password`.
2. Faça login:
   - `POST /api/v1/auth/login` -> devolve `access_token`.
3. Use token em `Authorization: Bearer <token>` para consultar:
   - `GET /api/v1/indicators`
   - `GET /api/v1/datapoints`
4. Sincronize indicadores do BCB:
   - `POST /api/v1/indicators/sync`

No frontend, faça login e explore:
- Dashboard de métricas
- Gráficos de comparação de indicadores
- Filtros por período

## Contribuições futuras

- Adicionar filtros avançados (região, setor, categoria)
- Adicionar cache de resultados e endpoints de agregação
- Suportar múltiplas bases temporais e comparações customizadas
- Melhorar monitoramento (logs, métricas, tracing)
- Implementar testes de integração E2E para frontend + backend
- Oferecer deploy automático em CI/CD com templating (GitHub Actions)

---

### Contatos úteis

- API: `http://localhost:8000/docs`
- Frontend: `http://localhost:4173`

