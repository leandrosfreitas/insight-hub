from sqlalchemy import String, Text
from sqlalchemy.orm import Mapped, mapped_column, relationship
from app.db.base import Base

class Indicator(Base):
    __tablename__ = "indicators"

    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String(100))
    description: Mapped[str] = mapped_column(Text)
    source: Mapped[str] = mapped_column(String(100))

    datapoints = relationship(
        "DataPoint",
        back_populates="indicator",
        cascade="all, delete"
    )
