FROM python:3.12-slim

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1
ENV POETRY_NO_INTERACTION=1 \
    POETRY_VIRTUALENVS_CREATE=false

WORKDIR /app

# Instala o poetry
RUN pip install poetry

# CORREÇÃO: Copiar os arquivos de dentro da pasta backend
COPY backend/pyproject.toml backend/poetry.lock ./
RUN poetry install --no-root --only main

# Copia todo o conteúdo da pasta backend para o WORKDIR (/app)
COPY backend/ .

# Agora o python reconhecerá o pacote "app" que está dentro de /app
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
