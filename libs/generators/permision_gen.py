class ObjectGenerator:
    def __init__(self, initial_id, actions_subjects):
        self.id_counter = initial_id
       
        self.actions_subjects = actions_subjects

    def generate_object(self):
        generated_object = {
            'id': self.id_counter,
            'role_id': 0,
            'action': None,
            'subject': None,
        }

        if self.id_counter < len(self.actions_subjects):
            # Assign action and subject from the predefined list
            generated_object['role_id'],generated_object['action'], generated_object['subject'] , condition = self.actions_subjects[self.id_counter]
            if condition:
                generated_object['conditions'] = condition
        self.id_counter += 1
        return generated_object

# Пример использования генератора
initial_id = 1
actions_subjects = [
    [3,'read', 'UserRole',None],
    [3,'update', 'UserRole',None],
    [3,'delete', 'UserRole',None],
    [3,'create', 'UserRole',None],
    [3,'read', 'Permission',None],
    [3,'update', 'Permission',None],
    [3,'delete', 'Permission',None],
    [3,'create', 'Permission',None],
    [3,'read', 'User',None],
    [3,'update', 'User',None],
    [3,'delete', 'User',None],
    [3,'create', 'User',None],
    [3,'read', 'Company',None],
    [3,'update', 'Company',None],
    [3,'delete', 'Company',None],
    [3,'create', 'Company',None],
    [3,'read', 'Theme',None],
    [3,'update', 'Theme',None],
    [3,'delete', 'Theme',None],
    [3,'create', 'Theme',None],
    [3,'read', 'Project',None],
    [3,'update', 'Project',None],
    [3,'delete', 'Project',None],
    [3,'create', 'Project',None],
    [3,'read', 'Skills',None],
    [3,'update', 'Skills',None],
    [3,'delete', 'Skills',None],
    [3,'create', 'Skills',None],
    [3,'read', 'Success',None],
    [3,'update', 'Success',None],
    [3,'delete', 'Success',None],
    [3,'create', 'Success',None],
    [3,'read', 'Tag',None],
    [3,'update', 'Tag',None],
    [3,'delete', 'Tag',None],
    [3,'create', 'Tag',None],
    [1,'read', 'User',None],
    [1,'update', 'User',{ "id" : '{{id}}' }],
    [1,'read', 'Company',None],
    [1,'read', 'Theme',None],
    [1,'read', 'Project',None],
    [1,'updateStatus', 'Project',None],
    [1,'read', 'Skills',None],
    [1,'read', 'Tag',None],
    [2,'read', 'User',None],
    [2,'update', 'User',{ "id" : '{{id}}' }],
    [2,'read', 'Company',None],
    [2,'read', 'Theme',None],
    [2,'read', 'Project',None],
    [2,'read', 'Skills',None],
    [2,'read', 'Tag',None],
    [4,'read', 'User',None],
    [4,'update', 'User',{ "id" : '{{id}}' }],
    [4,'read', 'Company',None],
    [4,'update', 'Company',{ "spokesPersonId": '{{ id }}' }],
    [4,'read', 'Theme',None],
    [4,'create', 'Theme',None],
    [4,'update', 'Theme',None],
    [4,'read', 'Project',None],
    [4,'create', 'Project',None],
    [4,'update', 'Project',{ "createrId": '{{ id }}' }],
    [4,'read', 'Skills',None],
    [4,'read', 'Tag',None],
    [5,'read', 'User',None],
    [5,'update', 'User',{ "id" : '{{id}}' }],
    [5,'read', 'Company',None],
    [5,'read', 'Theme',None],
    [5,'read', 'Project',None],
    [5,'read', 'Skills',None],
    [5,'read', 'Tag',None],
    [6,'read', 'User',None],
    [6,'update', 'User',None],
    [6,'read', 'Company',None],
    [6,'read', 'Theme',None],
    [6,'read', 'Project',None],
    [6,'read', 'Skills',None],
    [6,'read', 'Tag',None],
    [7,'read', 'UserRole',None],
    [7,'update', 'UserRole',None],
    [7,'delete', 'UserRole',None],
    [7,'create', 'UserRole',None],
    [7,'read', 'Permission',None],
    [7,'update', 'Permission',None],
    [7,'delete', 'Permission',None],
    [7,'create', 'Permission',None],
    [7,'read', 'User',None],
    [7,'update', 'User',None],
    [7,'delete', 'User',None],
    [7,'create', 'User',None],
    [7,'read', 'Company',None],
    [7,'update', 'Company',None],
    [7,'delete', 'Company',None],
    [7,'create', 'Company',None],
    [7,'read', 'Theme',None],
    [7,'update', 'Theme',None],
    [7,'delete', 'Theme',None],
    [7,'create', 'Theme',None],
    [7,'read', 'Project',None],
    [7,'update', 'Project',None],
    [7,'delete', 'Project',None],
    [7,'create', 'Project',None],
    [7,'read', 'Skills',None],
    [7,'update', 'Skills',None],
    [7,'delete', 'Skills',None],
    [7,'create', 'Skills',None],
    [7,'read', 'Success',None],
    [7,'update', 'Success',None],
    [7,'delete', 'Success',None],
    [7,'create', 'Success',None],
    [7,'read', 'Tag',None],
    [7,'update', 'Tag',None],
    [7,'delete', 'Tag',None],
    [7,'create', 'Tag',None],
]

generator = ObjectGenerator(initial_id, actions_subjects)

# Генерация нескольких объектов
for _ in range(len(actions_subjects)-1):
    generated_object = generator.generate_object()
    print(generated_object)
