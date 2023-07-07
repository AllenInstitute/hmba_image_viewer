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
    
    def __eq__(self, other):
        if isinstance(other, Specimen):
            self_suffix = self.__get_suffix()
            other_suffix = other.__get_suffix()

            return (len(self.parent_specimen_name) == len(other.parent_specimen_name)) and (self_suffix == other_suffix)   
        
        return False

    def __lt__(self, other):
        if isinstance(other, Specimen):
            if len(self.parent_specimen_name) < len(other.parent_specimen_name):
                return True
            elif len(self.parent_specimen_name) == len(other.parent_specimen_name):
                #get the numerical suffix of each parent_specimen_name for comparison
                self_suffix = self.__get_suffix()
                other_suffix = other.__get_suffix() 
                
                if (self_suffix != "CX" != 0) and (other_suffix != "CX" != 0):
                    return int(self_suffix) < int(other_suffix)
                elif self_suffix != "CX" and other_suffix == "CX":
                    return True
                        
        return False

    # get numerical suffix of parent_specimen_name
    def __get_suffix(self):
        if len(self.parent_specimen_name) > 0:
            return self.parent_specimen_name[len(self.parent_specimen_name) - 2:]
        return 0