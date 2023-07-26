import sqlalchemy 
import psycopg2
import pandas as pd
from Specimen import Specimen
from csv import DictReader
from sqlalchemy.ext.automap import automap_base
from sqlalchemy import inspect

def main():

    engine = sqlalchemy.create_engine(
    "postgresql+psycopg2://atlasreader:atlasro@limsdb3/lims2")

    Base = automap_base()
    Base.prepare(engine, reflect=True)

    inspector = inspect(engine)
    hello = 1
    # for table_name in Base.classes.keys():
    #     print(table_name)
    for column in inspector.get_columns("image_types"):
        print(str(hello) + ". " + column['name'] + " type: " + str(type(column['name'])))
        hello = hello + 1



    engine.dispose()

main()
