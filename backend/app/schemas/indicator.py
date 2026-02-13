from pydantic import BaseModel

class IndicatorBase(BaseModel):
    name: str
    description: str
    source: str

class IndicatorCreate(IndicatorBase):
    pass

class IndicatorResponse(IndicatorBase):
    id: int

    class Config:
        from_attributes = True
