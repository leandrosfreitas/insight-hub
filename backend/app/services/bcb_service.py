from datetime import datetime, date
from sqlalchemy.orm import Session

from app.clients.bcb_client import BCBClient
from app.db.models import Indicator

from app.schemas.datapoint import DataPointCreate
from app.repositories.datapoint import create_datapoint, get_datapoint_by_date

def sync_indicator_from_bcb(
    *,
    db: Session,
    indicator: Indicator,
    series_id: int,
    start_date: date,
    end_date: date,
) -> int:
    """
    Busca dados do BCB e persiste no banco evitando duplicação.
    Retorna quantidade de registros importados.
    """

    dados = BCBClient.buscar_serie(
        serie_id=series_id,
        data_inicial=start_date,
        data_final=end_date,
    )

    importados = 0

    for item in dados:
        try:
            referencia = datetime.strptime(item["data"], "%d/%m/%Y").date()
            valor = float(item["valor"])
        except (KeyError, ValueError):
            # ignora registros inválidos
            continue

        # 🔎 Verifica se já existe
        existente = get_datapoint_by_date(
            db=db,
            indicator_id=indicator.id,
            date=referencia
        )

        if existente:
            continue

        novo = DataPointCreate(
            indicator_id=indicator.id,
            date=referencia,
            value=valor
        )

        create_datapoint(db, novo)
        importados += 1

    return importados
