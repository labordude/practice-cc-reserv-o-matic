#!/usr/bin/env python3

import os

BASE_DIR = os.path.abspath(os.path.dirname(__file__))
# DATABASE = os.environ.get(
#     "DB_URI", f"sqlite://{os.path.join(BASE_DIR, 'instance/app.db')}"
# )
from typing import List
from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy.exc import IntegrityError
from . import models, schemas
from .database import SessionLocal, engine
import datetime

models.Base.metadata.create_all(bind=engine)
# app = Flask(__name__)
# app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///" + os.path.join(
#     BASE_DIR, "instance/app.db"
# )
# app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
# app.json.compact = False

# migrate = Migrate(app, db)

# db.init_app(app)

app = FastAPI()


# dependency for database
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@app.get("/")
def home():
    return ""


@app.get("/customers", response_model=List[schemas.Customer])
def get_customers(db: Session = Depends(get_db)):
    try:
        customers = [
            customer.to_dict(only=("id", "name", "email"))
            for customer in db.query(models.Customer)
        ]
        return customers, 200

    except:
        return {"error": "Bad request"}, 400


# @app.post("/customers")
# def post_customers():
#     data = request.get_json()
#     try:
#         new_customer = Customer(name=data.get("name"), email=data.get("email"))
#         db.session.add(new_customer)
#         db.session.commit()

#         return new_customer.to_dict(only=("id", "name", "email")), 201
#     except:
#         return {"error": "400: Validation error"}, 400


# @app.get("/customers/{id}")
# def get_single_customer(id):
#     try:
#         customer = (
#             Customer.query.filter(Customer.id == id)
#             .first()
#             .to_dict(only=("id", "name", "email", "reservations"))
#         )

#         # print(customer)
#         return customer, 200
#     except:
#         return {"error": "404: Customer not found"}, 404


# @app.get("/locations")
# def get_locations():
#     try:
#         locations = [
#             location.to_dict(only=("id", "name", "max_party_size"))
#             for location in Location.query.all()
#         ]
#         return locations, 200
#     except:
#         return {"error": "Bad request"}, 400


# @app.get("/locations/{id}")
# def get_single_location(id):
#     try:
#         location = Location.query.filter_by(id=id).first()
#         return location.to_dict(), 200
#     except:
#         raise Exception({"error": "404 not found"}, 404)


# @app.delete("/locations/{id}")
# def delete_location(id):
#     try:
#         location = Location.query.filter_by(id=id).first()

#         db.session.delete(location)
#         db.session.commit()

#         return {}, 204
#     except:
#         return {"error": "404: Location not found"}, 404


# @app.get("/reservations")
# def get_reservations():
#     try:
#         reservations = [
#             reservation.to_dict() for reservation in Reservation.query.all()
#         ]
#         return reservations, 200
#     except:
#         return ({"error": "400 bad request"}, 400)


# @app.post("/reservations")
# def post_new_reservation():
#     data = request.get_json()
#     # print(
#     #     datetime.date(
#     #         datetime.datetime.strptime(
#     #             data.get("reservation_date"), "%Y-%m-%d"
#     #         )
#     #     )
#     # )
#     try:
#         reservation = Reservation(
#             reservation_date=datetime.datetime.strptime(
#                 data.get("reservation_date"), "%Y-%m-%d"
#             ).date(),
#             customer_id=data.get("customer_id"),
#             location_id=data.get("location_id"),
#             party_size=data.get("party_size"),
#             party_name=data.get("party_name"),
#         )

#         db.session.add(reservation)
#         db.session.commit()

#         return reservation.to_dict(), 201

#     except IntegrityError:
#         return ({"error": "500 server went boom"}, 400)
#     except AttributeError:
#         return ({"error": "incorrect"}, 400)
#     except ValueError:
#         return ({"error": "incorrect"}, 400)
#     except Exception:
#         return ({"error": "incorrect"}, 400)


# @app.get("/reservations/{id}")
# def get_single_reservation(id):
#     try:
#         reservation = (
#             Reservation.query.filter(Reservation.id == id).first().to_dict()
#         )
#         return reservation, 200
#     except:
#         return ({"error": "404 not found"}, 404)


# @app.patch("/reservations/{id}")
# def patch_reservation(id):
#     print("in the patch route")
#     data = request.get_json()
#     reservation = Reservation.query.filter(Reservation.id == id).first()
#     if not reservation:
#         return ({"error": "404 not found"}, 404)
#     for attr in data:
#         print(attr, data)
#         if attr == "reservation_date":
#             setattr(
#                 reservation,
#                 attr,
#                 datetime.datetime.strptime(
#                     data.get("reservation_date"), "%Y-%m-%d"
#                 ).date(),
#             )
#         else:
#             setattr(reservation, attr, data.get(attr))
#     try:
#         db.session.add(reservation)
#         db.session.commit()
#         return reservation.to_dict(), 200
#     except Exception:
#         return ({"error": "error"}, 400)


# @app.delete("/reservations/{id}")
# def delete_reservation(id):
#     reservation = Reservation.query.filter(Reservation.id == id).first()
#     if not reservation:
#         return ({"error": "404 not found"}, 404)
#     db.session.delete(reservation)
#     db.session.commit()
#     return ({}, 204)


if __name__ == "__main__":
    app.run(port=5555, debug=True)
