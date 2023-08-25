import sqlalchemy 
from sqlalchemy.ext.automap import automap_base
from sqlalchemy import create_engine, text, inspect
from sqlalchemy.ext.automap import automap_base

def main():

    engine = sqlalchemy.create_engine(
    "postgresql+psycopg2://atlasreader:atlasro@limsdb3/lims2")
    Base = automap_base()
    Base.prepare(engine, reflect=True)
    inspector = inspect(engine)

    # hello = 1

    # prints all tables in LIMS
    # for table_name in Base.classes.keys():
    #     print(table_name)

    # print tables in LIMS with columns with specified word in it 
    # for table_name in Base.classes.keys():
    #     for column in inspector.get_columns(table_name):
    #         if 'equipment' in column['name']:
    #             print("table name: " + table_name)
    #             print("     " + column['name'] + " type: " + str(type(column['name'])))

    # prints the columns of the specified table with the col type
    # for column in inspector.get_columns("specimen_metadata"):
    #     print(str(hello) + ". " + column['name'] + " var: " + str(type(column['name'])))
    #     hello = hello + 1

    # searches each table for the given name and puts table name in list 
    # table_names = []
    # for table_name in Base.classes.keys():
    #     for column in inspector.get_columns(table_name):
    #         if column['name'] == "Snap25-IRES2-Cre;Ai14-539610":
    #             table_names.append(table_name)
    # print(table_names)

    # Setting up the engine, Base, and inspector
    engine = create_engine("postgresql+psycopg2://atlasreader:atlasro@limsdb3/lims2")
    Base = automap_base()
    Base.prepare(engine, reflect=True)
    inspector = inspect(engine)

    table_names = []
    given_string = "Snap25-IRES2-Cre;Ai14-539610"

    # Use a connection object to execute statements
    with engine.connect() as connection:
        for table_name in Base.classes.keys():
            table = Base.classes[table_name]
            for column in inspector.get_columns(table_name):
                column_name = column['name']
                column_type = column['type']

                # If the column type isn't a string or text variant, skip this column
                if not isinstance(column_type, (sqlalchemy.String, sqlalchemy.Text)):
                    continue

                # Construct a raw SQL query
                stmt = text(f"SELECT COUNT(*) FROM {table_name} WHERE {column_name} = :value")
                result = connection.execute(stmt, {'value': given_string}).scalar()
                if result > 0:
                    table_names.append(table_name)
                    break  # Break the inner loop if a match is found in the current table

    print(table_names)





    engine.dispose()

main()
