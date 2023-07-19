# from flask import Flask, render_template, session, redirect, url_for
# from flask_sqlalchemy import SQLAlchemy
# from sqlalchemy.sql import text
# import psycopg2
# import pandas as pd
# from wtforms import NameForm
# from wtforms import StringField, SubmitField

# app = Flask(__name__)

# app.config['SECRET KEY'] = 'kfgiyffviydliyfvkljfluydl'
# app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql+psycopg2://atlasreader:atlasro@limsdb3/lims2'
# app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# db = SQLAlchemy(app)

# #bind decorative base to engine
# db.Model.metadata.reflect(db.engine)

# @app.route('/', methods = ['GET', 'POST'])
# def index():
#     form = NameForm()
#     if form.validate_on_submit():
#         specimen = Specimen.query.filter_by()
#         if specimen is None:
#             specimen = Specimen()


# class Specimen(db.Model):
#     __tablename__ = 'specimens'
#     specimen_id = db.Column(db.String)
#     specimen_name = db.Column(db.String(100), primary_key = True)
#     donor_id = db.Column(db.String)
#     project_name = db.Column(db.String(100))
#     plane_of_section = db.Column(db.String(100))
#     hemisphere = db.Column(db.String(100))
#     parent_specimen_id = db.Column(db.String)
#     parent_specimen_name = db.Column(db.String(100))
#     parent_x_coord = db.Column(db.String)
#     parent_y_coord = db.Column(db.String)
#     parent_z_coord = db.Column(db.String)

#     def __init__(self, specimen_id, specimen_name, donor_id, project_name, plane_of_section, hemisphere, 
#                 parent_specimen_id, parent_specimen_name, parent_x_coord, parent_y_coord, parent_z_coord):
            
#         self.specimen_id = specimen_id
#         self.specimen_name = specimen_name
#         self.donor_id = donor_id        
#         self.project_name = project_name
#         self.plane_of_section = plane_of_section
#         self.hemisphere = hemisphere
#         self.parent_specimen_id = parent_specimen_id
#         self.parent_specimen_name = parent_specimen_name
#         self.parent_x_coord = parent_x_coord
#         self.parent_y_coord = parent_y_coord
#         self.parent_z_coord = parent_z_coord
#         self.children = []

#     def __repr__(self):
#         return f"Specimen Name:'{self.specimen_name}'"
    
#     @app.route('/<int:specimen_name>/')
#     def specimen(specimen_name):
#         specimen = Specimen.query.get_or_404(specimen_name)
#         return render_template('metadata.html', specimen=specimen)
    
#     if __name__ == '__main__':
#         app.run(debug=True)

from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.sql import text
from sqlalchemy import create_engine
from sqlalchemy.ext.automap import automap_base
from flask import render_template
from flask_bootstrap import Bootstrap

# this variable, db, will be used for all SQLAlchemy commands
db = SQLAlchemy()
# create the app
app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql+psycopg2://atlasreader:atlasro@limsdb3/lims2'

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = True

# initialize the app with Flask-SQLAlchemy
db.init_app(app)

# NOTHING BELOW THIS LINE NEEDS TO CHANGE
# this route will test the database connection - and nothing more
# @app.route('/')
# def testdb():
#     try:
#         db.session.query(text('1')).from_statement(text('SELECT 1')).all()
#         return '<h1>It works.</h1>'
#     except Exception as e:
#         # e holds description of the error
#         error_text = "<p>The error:<br>" + str(e) + "</p>"
#         hed = '<h1>Something is broken.</h1>'
#         return hed + error_text

class Specimen(db.Model):
    __tablename__ = 'specimens'
    id = db.Column(db.String)
    name = db.Column(db.String, primary_key = True)
    plane_of_section_id = db.Column(db.String)
    frozen_at = db.Column(db.String)
    rna_integrity_number = db.Column(db.String)
    tissue_ph = db.Column(db.Double)
    hemisphere_id = db.Column(db.String)
    created_by = db.Column(db.String)
    created_at = db.Column(db.String)
    updated_by = db.Column(db.String)
    updated_at = db.Column(db.String)
    parent_id = db.Column(db.String)
    structure_id = db.Column(db.String)
    postmortem_interval_id = db.Column(db.String)
    preparation_method_id = db.Column(db.String)
    parent_x_coord = db.Column(db.String)
    parent_y_coord = db.Column(db.String)
    parent_z_coord = db.Column(db.String)
    barcode = db.Column(db.String)
    location_id = db.Column(db.String)
    storage_directory = db.Column(db.String)
    project_id = db.Column(db.String)
    specimen_preparation_method_id = db.Column(db.String)
    alignment3d_id = db.Column(db.String)
    reference_space_id = db.Column(db.String)
    external_specimen_name = db.Column(db.String)
    normalization_group_id = db.Column(db.String)
    carousel_well_name = db.Column(db.String)
    donor_id = db.Column(db.String) 
    ephys_cell_plan_id = db.Column(db.String)
    ephys_roi_result_id = db.Column(db.String)
    histology_well_name = db.Column(db.String)
    priority = db.Column(db.String)
    ephys_neural_tissue_plan_id = db.Column(db.String)
    tissue_processing_id = db.Column(db.String)
    task_flow_id = db.Column(db.String)
    specimen_set_id = db.Column(db.String)
    biophysical_model_state = db.Column(db.String)
    cell_prep_id = db.Column(db.String)
    data = db.Column(db.String)
    cell_depth = db.Column(db.String)
    cell_reporter_id = db.Column(db.String)
    facs_well_id = db.Column(db.String)
    patched_cell_container = db.Column(db.String)
    cortex_layer_id = db.Column(db.String)
    cell_label = db.Column(db.String)
    flipped_specimen_id = db.Column(db.String)
    operation_id = db.Column(db.String)
    pinned_radius = db.Column(db.String)
    x_coord = db.Column(db.String)
    y_coord = db.Column(db.String)
    ephys_qc_result = db.Column(db.String)
    ephys_start_time_sec = db.Column(db.String)
    starter_cell_count = db.Column(db.String)
    task_id = db.Column(db.String)
    workflow_state = db.Column(db.String)
    mfish_experiment_id = db.Column(db.String)
    sectioning_task_id = db.Column(db.String)
    merscope_experiment_id = db.Column(db.String)
    oligo_tag = db.Column(db.String)

# class Donor(db.Model):
#     __tablename__ = "donors"
#     donor_name = db.Column(db.String, primary_key = True)
#     race_or_strain = db.Column(db.String)
#     sex = db.Column(db.String)
#     external_donor_name = db.Column(db.String)
#     education_level = db.Column(db.String)
#     handedness = db.Column(db.String)
#     organism = db.Column(db.String)
#     specimens = db.Column(db.String)
#     primary_tissue_source = db.Column(db.String)
#     death_manner = db.Column(db.String)
#     death_cause = db.Column(db.String)
#     death_on = db.Column(db.String)
#     age_at_death = db.Column(db.String)
#     date_of_birth = db.Column(db.String)
#     height_or_length = db.Column(db.String)
#     weight = db.Column(db.String)
#     phenotype = db.Column(db.String)
#     trangenic_induction_method = db.Column(db.String)
#     drawing_tool = db.Column(db.String)
#     donors_genotypes = db.Column(db.String)
#     water_restricted = db.Column(db.String)

@app.route('/specimens/<donor_id>/')
def specimens(donor_id):
    specimens = db.session.execute(db.select(Specimen)
            .filter_by(donor_id=donor_id)).scalars()
    return render_template('list.html', donor_id=donor_id, specimens=specimens)

if __name__ == '__main__':
    app.run(debug=True)