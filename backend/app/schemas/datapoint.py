from pydantic import BaseModel, ConfigDict
from datetime import date

class DataPointBase(BaseModel):
    date: date
    value: float

class DataPointCreate(DataPointBase):
    indicator_id: int

class DataPointResponse(DataPointBase):
    id: int
    indicator_id: int

    model_config = ConfigDict(from_attributes=True)
