from flask_sqlalchemy import SQLAlchemy
from flask import Flask, render_template, redirect, url_for, send_file, request, jsonify
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
app.config['WTF_CSRF_ENABLED'] = False

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
    parent_id = db.Column(db.String)

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

class Image(db.Model):
    __tablename__ = 'images'
    id = db.Column(db.String, primary_key = True)
    jp2 = db.Column(db.String)
    zoom = db.Column(db.String)
    created_at = db.Column(db.String)
    updated_at = db.Column(db.String)
    qc_date = db.Column(db.String)
    slide_id = db.Column(db.String)
    width = db.Column(db.String)
    height = db.Column(db.String)
    image_type_id = db.Column(db.String)
    parent_id = db.Column(db.String)
    position = db.Column(db.String)
    specimen_id = db.Column(db.String)
    jp2_md5sum = db.Column(db.String)
    flip_id = db.Column(db.String)
    zoom_tiers = db.Column(db.String)
    archive_dir = db.Column(db.String)
    zoom_archive_dir = db.Column(db.String)
    treatment_id = db.Column(db.String)

class SpecimenTypes(db.Model):
    __tablename__ = 'specimen_types'
    id = db.Column(db.String, primary_key = True)
    name = db.Column(db.String) 
    created_at = db.Column(db.String)
    updated_at = db.Column(db.String)

class Plane(db.Model):
    __tablename__ = 'plane_of_sections'
    id = db.Column(db.String, primary_key = True)
    name = db.Column(db.String) 
    created_at = db.Column(db.String)
    updated_at = db.Column(db.String)

class ImageTypes(db.Model):
    __tablename__ = 'image_types'
    id = db.Column(db.String, primary_key = True)
    name = db.Column(db.String) 
    created_at = db.Column(db.String)
    updated_at = db.Column(db.String)
    reuploadable = db.Column(db.String)

class Project(db.Model):
    __tablename__ = 'projects'
    id = db.Column(db.String, primary_key = True)
    name = db.Column(db.String) 
    created_at = db.Column(db.String)
    updated_at = db.Column(db.String)
    file_storage = db.Column(db.String)
    subdirectory_count = db.Column(db.String)
    current_directory = db.Column(db.String)
    trigger_dir = db.Column(db.String)
    failed_trigger_dir = db.Column(db.String)
    process_triggers = db.Column(db.String)
    incoming_directory = db.Column(db.String)
    non_cached_schema_name = db.Column(db.String)
    digital_archive_id = db.Column(db.String)

class Structure(db.Model):
    __tablename__ = 'structures'
    id = db.Column(db.String, primary_key = True)
    atlas_id = db.Column(db.String)
    name = db.Column(db.String)
    acronym = db.Column(db.String)
    red = db.Column(db.String)
    green = db.Column(db.String)
    blue = db.Column(db.String)
    st_order = db.Column(db.String)
    st_level = db.Column(db.String)
    ontology_id = db.Column(db.String)
    hemisphere_id = db.Column(db.String)
    sibling_order = db.Column(db.String)
    created_at = db.Column(db.String)
    updated_at = db.Column(db.String)

class Age(db.Model):
    __tablename__ = 'ages'
    id = db.Column(db.String, primary_key = True)
    name = db.Column(db.String)
    description = db.Column(db.String)
    organism_id = db.Column(db.String)
    created_at = db.Column(db.String)
    updated_at = db.Column(db.String)
    days = db.Column(db.String)
    isembryonic = db.Column(db.String)

class Organism(db.Model):
    __tablename__ = 'organisms'
    id = db.Column(db.String, primary_key = True)
    name = db.Column(db.String)
    ncbitaxonomyid = db.Column(db.String)
    created_at = db.Column(db.String)
    updated_at = db.Column(db.String)
    common_name = db.Column(db.String)

class SpecimenTypesSpecimens(db.Model):
    __tablename__ = 'specimen_types_specimens'
    specimen_type_id = db.Column(db.String)
    specimen_id = db.Column(db.String, primary_key = True)

class DonorForm(FlaskForm):
    donor = StringField('What is the name of the donor you would like to see?', validators=[DataRequired(), Length(10, 40)])
    submit = SubmitField('Submit')

class Node:
    def __init__ (self, name, children=None):
        self.name = name 
        self.children = children if children is not None else []

        specimen = Specimen.query.filter_by(name=name).first()
        self.id = specimen.id
        self.donor_id = specimen.donor_id

        self.parent_id = self.parent_name = self.storage_directory = self.plane_of_section = self.project_name = self.structure = "None"
        if specimen.parent_id:
            self.parent_id = specimen.parent_id
            self.parent_name = Specimen.query.filter_by(id=specimen.parent_id).first().name

        if specimen.storage_directory:
            self.storage_directory = specimen.storage_directory
        
        if specimen.plane_of_section_id: 
            self.plane_of_section = Plane.query.filter_by(id=specimen.plane_of_section_id).first().name
        
        if specimen.project_id:
            self.project_name = Project.query.filter_by(id=specimen.project_id).first().name
        
        if specimen.structure_id:
            self.structure = Structure.query.filter_by(id=specimen.structure_id).first().name

        self.specimen_type = "None"
        specimen_type = SpecimenTypesSpecimens.query.filter_by(specimen_id=specimen.id).first()
        if specimen_type:
            self.specimen_type = SpecimenTypes.query.filter_by(id=specimen_type.specimen_type_id).first().name
            self.name = str(self.name) + ": " + str(self.specimen_type)

        self.age = self.organism = "None"
        donor = Donor.query.filter_by(id=specimen.donor_id).first()
        if donor.age_id:
            self.age = Age.query.filter_by(id=donor.age_id).first().name

        if donor.organism_id:
            self.organism = Organism.query.filter_by(id=donor.organism_id).first().common_name

        self.image_type = self.image_name = self.image_url = "None"
        image = Image.query.filter_by(specimen_id=specimen.id).first()
        if image:
            self.image_type = ImageTypes.query.filter_by(id=image.image_type_id).first().name
            self.image_name = image.zoom
            self.image_url = self._convert_aff("//" + str(self.storage_directory + self.image_name), image)

    
    def _convert_aff(self, img_path, image) :
        new_url = 'http://lims2/cgi-bin/imageservice?mime=2&path=' 
        new_url += str(img_path)
        new_url +=  '&top=0&left=0&width='
        new_url += str(image.height)
        new_url += '&zoom='
        new_url += str(image.zoom_tiers - 1)

        return new_url

# asks the user to enter the donor they want to see the data for
@app.route('/', methods=['GET', 'POST'])
def home():
    # gets table of all donors in LIMS
    donors = Donor.query.all()
    message = ""

    form = DonorForm()
    if form.validate_on_submit():
        donor_name = form.donor.data

        # gets the donor that matches the requested donor id
        donor = Donor.query.filter_by(name = donor_name).first()
        if donor is not None:
            form.donor.data = ""

            # goes to appropriate specimen page based on donor id 
            # calls specimen method
            return redirect(url_for('specimens', donor_id=donor.id))
        else:
            message = "That donor is not in our database"
    return render_template('home.html',donors=donors, form=form, message=message)

# builds the parent-child relationship between specimens 
# generates dropdown menu with hierarchy built in through flattened data
@app.route('/specimens/<donor_id>/')
def specimens(donor_id):

    # get table of specimens matching given donor id (has all columns!)
    specimens = Specimen.query.filter_by(donor_id=donor_id).order_by(Specimen.name)

    # provides the metadata for the first specimen in the specimen list for the requested donor 
    # makes it so that the starting metadata display is the root specimen 
    specimen_data = populate_metadata(specimens.first().name)

    tree = build_tree(specimens)

    # renders template that displays all specimens in table with their id and parent id
    return render_template('dropdown_and_metadata.html', tree = tree, specimen_data = specimen_data)

# specimens = table of all specimens with given donor_id
# maps specimen ids to children
def build_tree(specimens):
    def build_node(name):
        return Node(name, [build_node(child) for child in relationships.get(name, [])])
    
    relationships = {}
    root_names = []

    for specimen in specimens:
        parent_id = specimen.parent_id
        if parent_id:
            parent_name = Specimen.query.filter_by(id=specimen.parent_id).first().name
            if parent_name not in relationships:
                relationships[parent_name] = []
            relationships[parent_name].append(specimen.name)
        else:
            root_names.append(specimen.name)
    
    trees = [build_node(root) for root in root_names]
    
    return trees

# gets all of the relevant metadata for the given specimen
def populate_metadata(specimen_name):
    specimen = Specimen.query.filter_by(name=specimen_name).first()

    specimen_data = {
        'id': specimen.id,
        'name': specimen.name, 
        'donor_id': specimen.donor_id, 
        'parent_id': "None",
        'storage_directory': "None",
        'plane_of_section': "None",
        'project_name': "None", 
        'structure': "None",
        'parent_name': "None",
        'specimen_type': "None",
        'age': "None",
        'organism': "None",
        'image_type': "None",
        'image_name': "None",
        'image_url': "None"
    }
    
    if specimen.parent_id:
        specimen_data['parent_id'] = specimen.parent_id
        specimen_data['parent_name'] = Specimen.query.filter_by(id=specimen.parent_id).first().name

    if specimen.storage_directory:
        specimen_data['storage_directory'] = specimen.storage_directory
    
    if specimen.plane_of_section_id: 
        specimen_data['plane_of_section'] = Plane.query.filter_by(id=specimen.plane_of_section_id).first().name
    
    if specimen.project_id:
        specimen_data['project_name'] = Project.query.filter_by(id=specimen.project_id).first().name
    
    if specimen.structure_id:
        specimen_data['structure'] = Structure.query.filter_by(id=specimen.structure_id).first().name

    donor = Donor.query.filter_by(id=specimen.donor_id).first()
    if donor.age_id:
        specimen_data['age'] = Age.query.filter_by(id=donor.age_id).first().name
    
    if donor.organism_id:
        specimen_data['organism'] = Organism.query.filter_by(id=donor.organism_id).first().common_name

    image = Image.query.filter_by(specimen_id=specimen.id).first()
    if image:
        specimen_data['image_type'] = ImageTypes.query.filter_by(id=image.image_type_id).first().name
        specimen_data['image_name'] = image.zoom
        specimen_data['image_url'] = convert_aff("//" + str(specimen_data['storage_directory'] + specimen_data['image_name']), image)

    specimen_type = SpecimenTypesSpecimens.query.filter_by(specimen_id=specimen.id).first()
    if specimen_type:
        specimen_data['specimen_type'] = SpecimenTypes.query.filter_by(id=specimen_type.specimen_type_id).first().name
        specimen_data['name'] = specimen_data['name'] + ": " + specimen_data['specimen_type']

    return specimen_data

# creates the image url for an .aff image so it can be rendered in html
def convert_aff(img_path, image):
    new_url = 'http://lims2/cgi-bin/imageservice?mime=2&path=' 
    new_url += str(img_path)
    new_url +=  '&top=0&left=0&width='
    new_url += str(image.height)
    new_url += '&zoom='
    new_url += str(image.zoom_tiers - 1)

    return new_url

# reroutes the page to update the metadata based on which specimen the user clicks in the dropdown menu
# makes it so that the state of the dropdown menu doesn't change as you click through it
@app.route('/get_specimen_data', methods=['POST'])
def get_specimen_data():
    data= request.get_json()
    node_name = data.get('node_name')
    specimen_data = populate_metadata(node_name)
    return jsonify(specimen_data)

if __name__ == '__main__':
    db.create_all()
    app.run(debug=True)