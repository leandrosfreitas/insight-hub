from sqlalchemy import Date, ForeignKey, Float
from sqlalchemy.orm import Mapped, mapped_column, relationship
from app.db.base import Base

class DataPoint(Base):
    __tablename__ = "datapoints"

    id: Mapped[int] = mapped_column(primary_key=True)
    date: Mapped[str] = mapped_column(Date)
    value: Mapped[float] = mapped_column(Float)
    
    indicator_id: Mapped[int] = mapped_column(
        ForeignKey("indicators.id")
    )

    indicator = relationship(
        "Indicator",
        back_populates="datapoints"
    )
