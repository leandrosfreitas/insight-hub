from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.db.session import get_db
from app.schemas.datapoint import DataPointCreate, DataPointResponse
from app.repositories.datapoint import create_datapoint, list_datapoints_by_indicator

from app.repositories.indicator import get_indicator_by_id

router = APIRouter(
    tags=["Datapoint"]
)


@router.post(
    "/datapoints",
    response_model=DataPointResponse,
    status_code=status.HTTP_201_CREATED
)
def create(datapoint: DataPointCreate, db: Session = Depends(get_db)):
    indicator = get_indicator_by_id(db, datapoint.indicator_id)

    if not indicator:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Indicator not found"
        )
    
    return create_datapoint(db, datapoint)


@router.get(
    "/indicators/{indicator_id}/datapoints",
    response_model=list[DataPointResponse]
)
def list_by_indicator(indicator_id: int, db: Session = Depends(get_db)):
    return list_datapoints_by_indicator(db, indicator_id)
