from typing import List, Union

from pydantic import BaseModel


class CustomerBase(BaseModel):
    name: str
    email: str


class CustomerCreate(CustomerBase):
    pass


class Customer(CustomerBase):
    id: int
    reservations: List[Reservation] = []

    class Config:
        orm_mode = True


class LocationBase(BaseModel):
    name: str
    max_party_size: int


class LocationCreate(LocationBase):
    pass


class Location(LocationBase):
    id: str
    reservations: List[Reservation] = []


class ReservationBase(BaseModel):
    party_name: str
    party_size: int


class ReservationCreate(ReservationBase):
    pass


class Reservation(ReservationBase):
    id: int
    customer_id: int
    location_id: int

    class Config:
        orm_mode = True
