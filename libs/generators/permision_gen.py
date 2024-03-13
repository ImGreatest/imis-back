class ObjectGenerator:
    def __init__(self, initial_id, actions_subjects):
        self.id_counter = initial_id
       
        self.actions_subjects = actions_subjects

    def generate_object(self):
        generated_object = {
            'id': self.id_counter,
            'role_id': 0,
            'action': None,
            'subject': None
        }

        if self.id_counter < len(self.actions_subjects):
            # Assign action and subject from the predefined list
            generated_object['role_id'],generated_object['action'], generated_object['subject'] = self.actions_subjects[self.id_counter]

        self.id_counter += 1
        return generated_object

# Пример использования генератора
initial_id = 1
actions_subjects = [
    [3,'read', 'UserRole'],
    [3,'update', 'UserRole'],
    [3,'delete', 'UserRole'],
    [3,'create', 'UserRole'],
    [3,'read', 'Permission'],
    [3,'update', 'Permission'],
    [3,'delete', 'Permission'],
    [3,'create', 'Permission'],
    [3,'read', 'User'],
    [3,'update', 'User'],
    [3,'delete', 'User'],
    [3,'create', 'User'],
    [3,'read', 'Company'],
    [3,'update', 'Company'],
    [3,'delete', 'Company'],
    [3,'create', 'Company'],
    [3,'read', 'Theme'],
    [3,'update', 'Theme'],
    [3,'delete', 'Theme'],
    [3,'create', 'Theme'],
    [3,'read', 'Project'],
    [3,'update', 'Project'],
    [3,'delete', 'Project'],
    [3,'create', 'Project'],
    [3,'read', 'Skills'],
    [3,'update', 'Skills'],
    [3,'delete', 'Skills'],
    [3,'create', 'Skills'],
    [3,'read', 'Success'],
    [3,'update', 'Success'],
    [3,'delete', 'Success'],
    [3,'create', 'Success'],
    [3,'read', 'Tag'],
    [3,'update', 'Tag'],
    [3,'delete', 'Tag'],
    [3,'create', 'Tag'],
    [1,'read', 'UserRole'],
    [1,'update', 'UserRole'],
    [1,'delete', 'UserRole'],
    [1,'create', 'UserRole'],
    [1,'read', 'Permission'],
    [1,'update', 'Permission'],
    [1,'delete', 'Permission'],
    [1,'create', 'Permission'],
    [1,'read', 'User'],
    [1,'update', 'User'],
    [1,'read', 'Company'],
    [1,'read', 'Theme'],
    [1,'read', 'Project'],
    [1,'updateStatus', 'Project'],
    [1,'read', 'Skills'],
    [1,'read', 'Tag'],
]

generator = ObjectGenerator(initial_id, actions_subjects)

# Генерация нескольких объектов
for _ in range(len(actions_subjects)-1):
    generated_object = generator.generate_object()
    print(generated_object)
