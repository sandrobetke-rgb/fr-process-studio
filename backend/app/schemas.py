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


class DocumentCreate(BaseModel):
    document_number: str = Field(min_length=1, max_length=64)
    title: str = Field(min_length=1, max_length=250)
    document_type_code: str = Field(min_length=1, max_length=40)
    owner: str = Field(default="", max_length=200)
    system_area_code: str = Field(pattern=r"^(IATF_QM|IMS_ENV_ENERGY_OHS)$")
    content: dict = Field(default_factory=dict)
    change_reason: str = Field(default="Erstanlage", max_length=2000)


class DocumentVersionRead(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    id: str
    version_number: int
    content: dict
    change_reason: str
    status: str
    content_hash: str
    created_at: datetime


class DocumentRead(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    id: str
    document_number: str
    title: str
    owner: str
    system_area_code: str
    status: str
    versions: list[DocumentVersionRead]


class DocumentVersionCreate(BaseModel):
    content: dict
    change_reason: str = Field(min_length=3, max_length=2000)


class DocumentVersionCreateRead(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    id: str
    version_number: int
    content: dict
    change_reason: str
    status: str
    content_hash: str
    created_at: datetime
