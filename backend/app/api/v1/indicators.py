from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.db.session import get_db
from app.schemas.indicator import IndicatorCreate, IndicatorResponse
from app.repositories.indicator import create_indicator, get_indicator_by_id, list_indicators

router = APIRouter(
    prefix="/indicators",
    tags=["Indicatores"]
)


@router.post(
    "",
    response_model=IndicatorResponse,
    status_code=status.HTTP_201_CREATED
)
def create(indicator: IndicatorCreate, db: Session = Depends(get_db)):
    return create_indicator(db,indicator)


@router.get(
    "",
    response_model=list[IndicatorResponse]
)
def get_all(db: Session = Depends(get_db)):
    return list_indicators(db)


@router.get(
    "/{indicator_id}",
    response_model=IndicatorResponse
)
def get_by_id(indicator_id: int, db: Session = Depends(get_db)):
    indicator = get_indicator_by_id(db, indicator_id)

    if not indicator:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Indicator not found"
        )
    
    return indicator
