class Specimen:

    def __init__(self, specimen_id, specimen_name, donor_id, project_name, plane_of_section, hemisphere, 
                parent_specimen_id, parent_specimen_name, parent_x_coord, parent_y_coord, parent_z_coord):
            
            self.specimen_id = specimen_id
            self.specimen_name = specimen_name
            self.donor_id = donor_id        
            self.project_name = project_name
            self.plane_of_section = plane_of_section
            self.hemisphere = hemisphere
            self.parent_specimen_id = parent_specimen_id
            self.parent_specimen_name = parent_specimen_name
            self.parent_x_coord = parent_x_coord
            self.parent_y_coord = parent_y_coord
            self.parent_z_coord = parent_z_coord
            self.children = []
    
    #adds a node to list of children 
    def add_child(self, child):
        self.nodes.append(child)

    def __str__(self):
        return "specimen_id: " + self.specimen_id + "\t" + "parent_id: " + self.parent_specimen_id