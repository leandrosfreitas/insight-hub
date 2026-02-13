from pydantic import BaseModel
from datetime import date

class DataPointBase(BaseModel):
    date: date
    value: float

class DataPointCreate(DataPointBase):
    indicator_id: int

class DataPointResponse(DataPointBase):
    id: int
    indicator_id: int

    class Config:
        from_attributes = True