from fastapi import FastAPI, HTTPException
from sqlalchemy import create_engine, text
from sqlalchemy.exc import SQLAlchemyError
from typing import List
import os

app = FastAPI()

# Configuração do banco de dados
DATABASE_URL = "sqlite:///db.sqlite3"

# Criar a conexão com o banco
engine = create_engine(DATABASE_URL)

@app.get("/dados", response_model=List[dict])
async def get_dados():
    try:
        with engine.connect() as connection:
            query = text("SELECT * FROM app_smart_contadordata")
            result = connection.execute(query).fetchall()

            # Converte os resultados para JSON
            dados = [{"data": row["timestamp"], "valor": row["valor"]} for row in result]
        return dados
    except SQLAlchemyError as e:
        print(f"Erro ao buscar dados: {e}")
        raise HTTPException(status_code=500, detail="Erro ao buscar dados")


