from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from datetime import date, timedelta

from app.db.session import get_db
from app.schemas.indicator import IndicatorCreate, IndicatorResponse
from app.repositories.indicator import create_indicator, get_indicator_by_id, list_indicators
from app.services.bcb_service import sync_indicator_from_bcb
from app.api.deps import get_current_user, get_current_admin
from app.db.models.user import User

router = APIRouter(
    prefix="/indicators",
    tags=["Indicatores"]
)

# POST - criar indicador + sincronizar datapoints
@router.post(
    "",
    response_model=IndicatorResponse,
    status_code=status.HTTP_201_CREATED
)
def create(
    indicator: IndicatorCreate,
    db: Session = Depends(get_db),
    admin: User = Depends(get_current_admin)
):

    new_indicator = create_indicator(db, indicator)

    imported = 0
    if new_indicator.series_code:
        end_date = date.today()
        start_date = end_date - timedelta(days=365 * 2)

        imported = sync_indicator_from_bcb(
            db=db,
            indicator=new_indicator,
            start_date=start_date,
            end_date=end_date
        )

    return IndicatorResponse(
        id=new_indicator.id,
        name=new_indicator.name,
        description=new_indicator.description,
        source=new_indicator.source,
        series_code=new_indicator.series_code,
        imported_datapoints=imported
    )

# GET - listar todos os indicadores
@router.get(
    "",
    response_model=list[IndicatorResponse]
)
def get_all(
    db: Session = Depends(get_db),
    user: User = Depends(get_current_user)
):
    indicators = list_indicators(db)
    result = []
    for i in indicators:
        result.append(IndicatorResponse(
            id=i.id,
            name=i.name,
            description=i.description,
            source=i.source,
            series_code=i.series_code,
            imported_datapoints=0
        ))
    return result

# GET - buscar indicador por ID
@router.get(
    "/{indicator_id}",
    response_model=IndicatorResponse
)
def get_by_id(
    indicator_id: int,
    db: Session = Depends(get_db),
    user: User = Depends(get_current_user)
):
    indicator = get_indicator_by_id(db, indicator_id)

    if not indicator:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Indicator not found"
        )
    
    return IndicatorResponse(
        id=indicator.id,
        name=indicator.name,
        description=indicator.description,
        source=indicator.source,
        series_code=indicator.series_code,
        imported_datapoints=0
    )
