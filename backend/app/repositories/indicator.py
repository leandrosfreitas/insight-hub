from sqlalchemy.orm import Session
from app.db.models.indicator import Indicator
from app.schemas.indicator import IndicatorCreate

def create_indicator(
      db: Session,
      data: IndicatorCreate
) -> Indicator:
    indicator = Indicator(
        name=data.name,
        description=data.description,
        source=data.source
    )
    db.add(indicator)
    db.commit()
    db.refresh(indicator)
    return indicator

def list_indicators(db: Session) -> list[Indicator]:
    return db.query(Indicator).all()

def get_indicator_by_id(
        db: Session,
        indicator_id: int
) -> Indicator | None:
    return (
        db.query(Indicator)
        .filter(Indicator.id == indicator_id)
        .first()
    )
