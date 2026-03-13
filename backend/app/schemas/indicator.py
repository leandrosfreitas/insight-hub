from pydantic import BaseModel, ConfigDict
from typing import Optional

class IndicatorBase(BaseModel):
    name: str
    description: str
    source: str
    series_code: Optional[str] = None

class IndicatorCreate(IndicatorBase):
    series_code: str

class IndicatorResponse(IndicatorBase):
    id: int
    imported_datapoints: int | None = 0

    model_config = ConfigDict(from_attributes=True)
