from sqlalchemy.orm import Session
from . import models,schemas

def get_customer(db:Session, id:int):
    return db.query(models.Customer).filter(models.Customer.id == id).first()

def get_customers(db:Session):
    return db.query(models.Customer)