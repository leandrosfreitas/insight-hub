from datetime import date, timedelta
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.db.session import get_db
from app.db.models import Indicator
from app.services.bcb_service import sync_indicator_from_bcb

from app.api.deps import get_current_user
from app.db.models.user import User

router = APIRouter(
    prefix="/indicators",
    tags=["Indicators Sync"]
)


@router.post("/{indicator_id}/sync")
def sync_indicator(
    indicator_id: int,
    series_id: int,
    user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    indicator = db.get(Indicator, indicator_id)

    if not indicator:
        raise HTTPException(
            status_code=404,
            detail="Indicator not found"
        )

    end_date = date.today()
    start_date = end_date - timedelta(days=365 * 2)

    try:
        imported = sync_indicator_from_bcb(
            db=db,
            indicator=indicator,
            series_id=series_id,
            start_date=start_date,
            end_date=end_date,
        )
    except ValueError as exc:
        raise HTTPException(
            status_code=400,
            detail=str(exc),
        )

    return {
        "indicator_id": indicator.id,
        "series_id": series_id,
        "imported_datapoints": imported,
    }
