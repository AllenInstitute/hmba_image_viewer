import sqlalchemy 
import psycopg2
import pandas as pd
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

    # prints all tables in LIMS
    # for table_name in Base.classes.keys():
    #     print(table_name)

    # print tables in LIMS with columns with specified word in it 
    # for table_name in Base.classes.keys():
    #     for column in inspector.get_columns(table_name):
    #         if 'storage_directory' in column['name']:
    #             print("table name: " + table_name)
    #             print(str(hello) + ". " + column['name'] + " type: " + str(type(column['name'])))

    # prints the columns of the specified table with the col type
    for column in inspector.get_columns("slides"):
        print(str(hello) + ". " + column['name'] + " var: " + str(type(column['name'])))
        hello = hello + 1



    engine.dispose()

main()
