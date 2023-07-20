from flask_sqlalchemy import SQLAlchemy
from flask import Flask, render_template, redirect, url_for
from flask_bootstrap import Bootstrap5
from flask_wtf import FlaskForm, CSRFProtect
from wtforms import StringField, SubmitField
from wtforms.validators import DataRequired, Length
import secrets


# this variable, db, will be used for all SQLAlchemy commands
db = SQLAlchemy()
# create the app
app = Flask(__name__)
bootstrap = Bootstrap5(app)
csrf = CSRFProtect(app)
foo = secrets.token_urlsafe(16)
app.secret_key = foo
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql+psycopg2://atlasreader:atlasro@limsdb3/lims2'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = True

# initialize the app with Flask-SQLAlchemy
db.init_app(app)

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
    storage_directory = db.Column(db  .String)
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

class Donor(db.Model):
    __tablename__ = "donors"
    id = db.Column(db.String)
    name = db.Column(db.String, primary_key = True)
    organism_id = db.Column(db.String)
    height = db.Column(db.String)
    weight = db.Column(db.String)
    gender_id = db.Column(db.String)
    race_id = db.Column(db.String)
    handedness_id = db.Column(db.String)
    education_level_id = db.Column(db.String)
    created_by = db.Column(db.String)
    created_at = db.Column(db.String)
    updated_by = db.Column(db.String)
    updated_at = db.Column(db.String)
    death_manner_id = db.Column(db.String)
    death_cause_id = db.Column(db.String)
    death_on = db.Column(db.String)  
    age_id = db.Column(db.String)
    external_donor_name = db.Column(db.String)
    induction_method = db.Column(db.String)
    transgenic_induction_method_id = db.Column(db.String)
    date_of_birth = db.Column(db.String)
    primary_tissue_source_id = db.Column(db.String)
    baseline_weight_g = db.Column(db.String)
    data = db.Column(db.String)
    full_genotype = db.Column(db.String)
    occupation_id = db.Column(db.String)
    water_restricted = db.Column(db.String)

class DonorForm(FlaskForm):
    donor = StringField('What is the donor ID of the specimens you would like to see?', validators=[DataRequired(), Length(10, 40)])
    submit = SubmitField('Submit')

@app.route('/', methods=['GET', 'POST'])
def home():
    donors = db.session.execute(db.select(Donor)
        .filter_by(id="1082752228").distinct())
    
    form = DonorForm()
    message = ""
    if form.validate_on_submit():
        donor = form.donor.data
        if donor.lower() in donors:
            donor_id = donor
            form.donor.data = ""
            return redirect(url_for('specimens', donor_id=donor_id))
        else:
            message = "That donor is not in our database"
    return render_template('home.html',donors=donors, form=form, message=message)
    
@app.route('/specimens/<donor_id>/')
def specimens(donor_id):
    specimens = db.session.execute(db.select(Specimen)
            .filter_by(donor_id=donor_id)
            .order_by(Specimen.name)).scalars()
    return render_template('list.html', donor_id=donor_id, specimens=specimens)

if __name__ == '__main__':
    app.run(debug=True)