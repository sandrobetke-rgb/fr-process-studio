from datetime import datetime
from pydantic import BaseModel, ConfigDict, Field


class ProcessCreate(BaseModel):
    process_number: str = Field(min_length=1, max_length=64)
    owner: str = Field(default="", max_length=200)
    name: str = Field(min_length=1, max_length=250)
    description: str = ""
    content: dict = Field(default_factory=dict)


class ProcessVersionRead(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    id: str
    version_number: int
    name: str
    description: str
    content: dict
    status: str
    change_reason: str
    created_at: datetime


class ProcessRead(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    id: str
    process_number: str
    owner: str
    status: str
    versions: list[ProcessVersionRead]
