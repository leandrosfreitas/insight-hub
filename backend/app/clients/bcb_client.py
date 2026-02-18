from datetime import date
import requests


class BCBClient:
    BASE_URL = "https://api.bcb.gov.br/dados/serie"

    @staticmethod
    def buscar_serie(
        serie_id: int,
        data_inicial: date,
        data_final: date,
    ) -> list[dict]:
        url = f"{BCBClient.BASE_URL}/bcdata.sgs.{serie_id}/dados"

        params = {
            "formato": "json",
            "dataInicial": data_inicial.strftime("%d/%m/%Y"),
            "dataFinal": data_final.strftime("%d/%m/%Y"),
        }

        response = requests.get(url, params=params, timeout=15)

        if response.status_code != 200:
            raise ValueError(
                f"Erro ao acessar BCB ({response.status_code}): {response.text}"
            )

        data = response.json()

        if not isinstance(data, list):
            raise ValueError("Resposta inesperada da API do Banco Central")

        return data
