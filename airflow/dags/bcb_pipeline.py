from airflow import DAG
from airflow.operators.python import PythonOperator
from datetime import datetime
import requests

def sync_selic():
    requests.post(
        "http://api:8000/api/v1/indicators/1/sync",
        params={"series_id": 432}
    )

with DAG(
    dag_id="sync_bcb_indicators",
    start_date=datetime(2024,1,1),
    schedule_interval="@daily",
    catchup=False
) as dag:
    task_sync_selic = PythonOperator(
        task_id="sync_selic",
        python_callable=sync_selic
    )
