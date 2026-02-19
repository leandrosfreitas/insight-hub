from datetime import datetime, date
from sqlalchemy.orm import Session

from app.clients.bcb_client import BCBClient
from app.db.models import Indicator


def sync_indicator_from_bcb(
    *,
    db: Session,
    indicator: Indicator,
    series_id: int,
    start_date: date,
    end_date: date,
) -> int:
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

        # 🔜 aqui entra persistência futura (indicator_values)
        importados += 1

    return importados
