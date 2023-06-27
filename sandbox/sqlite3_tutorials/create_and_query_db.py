import sqlite3
import os


def create_database():
    db_path = "data/example_database.db"

    # if the database file already exists, delete it
    # (this is probably ham-handed; just doing it for
    # tutorial purposes)
    if os.path.exists(db_path):
        os.unlink(db_path)

    with sqlite3.connect(db_path) as connection:
        cursor = connection.cursor()

        section_table_cmd = """
        CREATE TABLE section
        (subject_id INTEGER,
         plane STRING,
         ordinal INTEGER,
         url STRING)
        """
        cursor.execute(section_table_cmd)

        # create an index to speed up searches on subject_id
        cursor.execute("CREATE INDEX subject_index on section(subject_id)")

        # create an index to speed up searches on the order of the slices
        cursor.execute(
            "CREATE UNIQUE INDEX ordinal_index on section(subject_id, plane, ordinal)")
        connection.commit()

        subject_table_cmd = """
        CREATE TABLE subject
        (id INTEGER,
         species STRING,
         age_days INTEGER)
        """
        cursor.execute(subject_table_cmd)

        # creating a unique index forces ID values to be unique
        # for each subject
        cursor.execute("CREATE UNIQUE INDEX id_index on subject(id)")

        # create an index to speed up searches on the age of the
        # subject
        cursor.execute("CREATE INDEX age_index on subject(age_days)")

        connection.commit()


def add_subject(
        id_value,
        species,
        age_days):

    db_path = "data/example_database.db"
    with sqlite3.connect(db_path) as connection:
        cursor = connection.cursor()
        cursor.execute(
            "INSERT INTO subject VALUES (?,?,?)",
            (id_value, species, age_days))


def add_section(
        subject_id,
        plane,
        ordinal,
        url):
    db_path = "data/example_database.db"
    with sqlite3.connect(db_path) as connection:
        cursor = connection.cursor()
        cursor.execute(
            "INSERT INTO section VALUES (?, ?, ?, ?)",
            (subject_id, plane, ordinal, url))


def main():
    create_database()
    add_subject(id_value=0, species='macaque', age_days=23)
    add_subject(id_value=1, species='macaque', age_days=13)
    add_subject(id_value=2, species='macaque', age_days=42)
    add_subject(id_value=3, species='human', age_days=65*365)

    add_section(subject_id=0, plane='coronal', ordinal=0, url='coronal_00')
    add_section(subject_id=0, plane='sagittal', ordinal=0, url='sagittal_00')
    add_section(subject_id=0, plane='coronal', ordinal=1, url='coronal_01')

    add_section(subject_id=1, plane='coronal', ordinal=0, url='coronal_10')
    add_section(subject_id=1, plane='coronal', ordinal=1, url='coronal_11')

    add_section(subject_id=2, plane='coronal', ordinal=0, url='coronal_20')
    add_section(subject_id=2, plane='sagittal', ordinal=0, url='sagittal_21')
    add_section(subject_id=2, plane='coronal', ordinal=1, url='coronal_21')
    add_section(subject_id=2, plane='sagittal', ordinal=1, url='sagittal_21')

    # example query; get aonly the macaques older than 14 days; we only want
    # coronal sections
    query = """
    SELECT section.url as url, subject.id as subject_id
    FROM section
    JOIN subject ON section.subject_id = subject.id
    WHERE subject.age_days > 14
    AND subject.species='macaque'
    AND section.plane='coronal'
    """
    db_path = "data/example_database.db"
    with sqlite3.connect(db_path) as connection:
        cursor = connection.cursor()
        results = cursor.execute(query).fetchall()
    print(results)


if __name__ == "__main__":
    main()
