from datetime import date
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

def get_datapoint_by_date(
    db: Session,
    indicator_id: int,
    date
) -> DataPoint | None:
    return (
        db.query(DataPoint)
        .filter(
            DataPoint.indicator_id == indicator_id,
            DataPoint.date == date
        )
        .first()
    )

def list_datapoints_by_indicator(
    db: Session,
    indicator_id: int,
    skip: int = 0,
    limit: int = 100,
    start_date: date | None = None,
    end_date: date | None = None
) -> list[DataPoint]:
    
    query = db.query(DataPoint).filter(
        DataPoint.indicator_id == indicator_id
    )

    if start_date:
        query = query.filter(DataPoint.date >= start_date)

    if end_date:
        query = query.filter(DataPoint.date <= end_date)

    return (
        query
        .order_by(DataPoint.date)
        .offset(skip)
        .limit(limit)
        .all()
    )
