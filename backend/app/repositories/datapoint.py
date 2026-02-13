from sqlalchemy.orm import Session
from app.db.models.datapoint import DataPoint
from app.schemas.datapoint import DataPointCreate

def create_datapoint(
        db: Session,
        data: DataPointCreate
) -> DataPoint:
    datapoint = DataPoint(
        date=data.date,
        value=data.value,
        indicator_id=data.indicator_id
    )
    db.add(datapoint)
    db.commit()
    db.refresh(datapoint)
    return datapoint

def list_datapoints_by_indicator(
    db: Session,
    indicator_id: int
) -> list[DataPoint]:
    return (
        db.query(DataPoint)
        .filter(DataPoint.indicator_id == indicator_id)
        .order_by(DataPoint.date)
        .all()
    )
