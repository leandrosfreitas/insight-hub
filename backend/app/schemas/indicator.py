from pydantic import BaseModel, ConfigDict

class IndicatorBase(BaseModel):
    name: str
    description: str
    source: str

class IndicatorCreate(IndicatorBase):
    pass

class IndicatorResponse(IndicatorBase):
    id: int

    model_config = ConfigDict(from_attributes=True)
