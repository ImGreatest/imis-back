import { PrismaClient } from '@prisma/client';
import cloneDeep from 'lodash.clonedeep';
//('student', 'teacher', 'supervisor');
export const roles = [
  {
    id: 1,
    name: 'student',
  },
  {
    id: 2,
    name: 'teacher',
  },
  {
    id: 3,
    name: 'superAdmin',
  },
  {
    id: 4,
    name: 'employer',
  },
  {
    id: 5,
    name: 'curator',
  },
  {
    id: 6,
    name: 'admin',
  },
  {
    id: 7,
    name: 'supervisor ',
  },
];

export const permissions = [
  { id: 1, role_id: 3, action: 'update', subject: 'UserRole' },
  { id: 2, role_id: 3, action: 'delete', subject: 'UserRole' },
  { id: 3, role_id: 3, action: 'create', subject: 'UserRole' },
  { id: 4, role_id: 3, action: 'read', subject: 'Permission' },
  { id: 5, role_id: 3, action: 'update', subject: 'Permission' },
  { id: 6, role_id: 3, action: 'delete', subject: 'Permission' },
  { id: 7, role_id: 3, action: 'create', subject: 'Permission' },
  { id: 8, role_id: 3, action: 'read', subject: 'User' },
  { id: 9, role_id: 3, action: 'update', subject: 'User' },
  { id: 10, role_id: 3, action: 'delete', subject: 'User' },
  { id: 11, role_id: 3, action: 'create', subject: 'User' },
  { id: 12, role_id: 3, action: 'read', subject: 'Company' },
  { id: 13, role_id: 3, action: 'update', subject: 'Company' },
  { id: 14, role_id: 3, action: 'delete', subject: 'Company' },
  { id: 15, role_id: 3, action: 'create', subject: 'Company' },
  { id: 16, role_id: 3, action: 'read', subject: 'Theme' },
  { id: 17, role_id: 3, action: 'update', subject: 'Theme' },
  { id: 18, role_id: 3, action: 'delete', subject: 'Theme' },
  { id: 19, role_id: 3, action: 'create', subject: 'Theme' },
  { id: 20, role_id: 3, action: 'read', subject: 'Project' },
  { id: 21, role_id: 3, action: 'update', subject: 'Project' },
  { id: 22, role_id: 3, action: 'delete', subject: 'Project' },
  { id: 23, role_id: 3, action: 'create', subject: 'Project' },
  { id: 24, role_id: 3, action: 'read', subject: 'Skills' },
  { id: 25, role_id: 3, action: 'update', subject: 'Skills' },
  { id: 26, role_id: 3, action: 'delete', subject: 'Skills' },
  { id: 27, role_id: 3, action: 'create', subject: 'Skills' },
  { id: 28, role_id: 3, action: 'read', subject: 'Success' },
  { id: 29, role_id: 3, action: 'update', subject: 'Success' },
  { id: 30, role_id: 3, action: 'delete', subject: 'Success' },
  { id: 31, role_id: 3, action: 'create', subject: 'Success' },
  { id: 32, role_id: 3, action: 'read', subject: 'Tag' },
  { id: 33, role_id: 3, action: 'update', subject: 'Tag' },
  { id: 34, role_id: 3, action: 'delete', subject: 'Tag' },
  { id: 35, role_id: 3, action: 'create', subject: 'Tag' },
  { id: 36, role_id: 1, action: 'read', subject: 'User' },
  {
    id: 37,
    role_id: 1,
    action: 'update',
    subject: 'User',
    conditions: { id: '{{id}}' },
  },
  { id: 38, role_id: 1, action: 'read', subject: 'Company' },
  { id: 39, role_id: 1, action: 'read', subject: 'Theme' },
  { id: 40, role_id: 1, action: 'read', subject: 'Project' },
  { id: 41, role_id: 1, action: 'updateStatus', subject: 'Project' },
  { id: 42, role_id: 1, action: 'read', subject: 'Skills' },
  { id: 43, role_id: 1, action: 'read', subject: 'Tag' },
  { id: 44, role_id: 2, action: 'read', subject: 'User' },
  {
    id: 45,
    role_id: 2,
    action: 'update',
    subject: 'User',
    conditions: { id: '{{id}}' },
  },
  { id: 46, role_id: 2, action: 'read', subject: 'Company' },
  { id: 47, role_id: 2, action: 'read', subject: 'Theme' },
  { id: 48, role_id: 2, action: 'read', subject: 'Project' },
  { id: 49, role_id: 2, action: 'read', subject: 'Skills' },
  { id: 50, role_id: 2, action: 'read', subject: 'Tag' },
  { id: 51, role_id: 4, action: 'read', subject: 'User' },
  {
    id: 52,
    role_id: 4,
    action: 'update',
    subject: 'User',
    conditions: { id: '{{id}}' },
  },
  { id: 53, role_id: 4, action: 'read', subject: 'Company' },
  {
    id: 54,
    role_id: 4,
    action: 'update',
    subject: 'Company',
    conditions: { spokesPersonId: '{{ id }}' },
  },
  { id: 55, role_id: 4, action: 'read', subject: 'Theme' },
  { id: 56, role_id: 4, action: 'create', subject: 'Theme' },
  { id: 57, role_id: 4, action: 'update', subject: 'Theme' },
  { id: 58, role_id: 4, action: 'read', subject: 'Project' },
  { id: 59, role_id: 4, action: 'create', subject: 'Project' },
  {
    id: 60,
    role_id: 4,
    action: 'update',
    subject: 'Project',
    conditions: { createrId: '{{ id }}' },
  },
  { id: 61, role_id: 4, action: 'read', subject: 'Skills' },
  { id: 62, role_id: 4, action: 'read', subject: 'Tag' },
  { id: 63, role_id: 5, action: 'read', subject: 'User' },
  {
    id: 64,
    role_id: 5,
    action: 'update',
    subject: 'User',
    conditions: { id: '{{id}}' },
  },
  { id: 65, role_id: 5, action: 'read', subject: 'Company' },
  { id: 66, role_id: 5, action: 'read', subject: 'Theme' },
  { id: 67, role_id: 5, action: 'read', subject: 'Project' },
  { id: 68, role_id: 5, action: 'read', subject: 'Skills' },
  { id: 69, role_id: 5, action: 'read', subject: 'Tag' },
  { id: 70, role_id: 6, action: 'read', subject: 'User' },
  { id: 71, role_id: 6, action: 'update', subject: 'User' },
  { id: 72, role_id: 6, action: 'read', subject: 'Company' },
  { id: 73, role_id: 6, action: 'read', subject: 'Theme' },
  { id: 74, role_id: 6, action: 'read', subject: 'Project' },
  { id: 75, role_id: 6, action: 'read', subject: 'Skills' },
  { id: 76, role_id: 6, action: 'read', subject: 'Tag' },
  { id: 77, role_id: 7, action: 'read', subject: 'UserRole' },
  { id: 78, role_id: 7, action: 'update', subject: 'UserRole' },
  { id: 79, role_id: 7, action: 'delete', subject: 'UserRole' },
  { id: 80, role_id: 7, action: 'create', subject: 'UserRole' },
  { id: 81, role_id: 7, action: 'read', subject: 'Permission' },
  { id: 82, role_id: 7, action: 'update', subject: 'Permission' },
  { id: 83, role_id: 7, action: 'delete', subject: 'Permission' },
  { id: 84, role_id: 7, action: 'create', subject: 'Permission' },
  { id: 85, role_id: 7, action: 'read', subject: 'User' },
  { id: 86, role_id: 7, action: 'update', subject: 'User' },
  { id: 87, role_id: 7, action: 'delete', subject: 'User' },
  { id: 88, role_id: 7, action: 'create', subject: 'User' },
  { id: 89, role_id: 7, action: 'read', subject: 'Company' },
  { id: 90, role_id: 7, action: 'update', subject: 'Company' },
  { id: 91, role_id: 7, action: 'delete', subject: 'Company' },
  { id: 92, role_id: 7, action: 'create', subject: 'Company' },
  { id: 93, role_id: 7, action: 'read', subject: 'Theme' },
  { id: 94, role_id: 7, action: 'update', subject: 'Theme' },
  { id: 95, role_id: 7, action: 'delete', subject: 'Theme' },
  { id: 96, role_id: 7, action: 'create', subject: 'Theme' },
  { id: 97, role_id: 7, action: 'read', subject: 'Project' },
  { id: 98, role_id: 7, action: 'update', subject: 'Project' },
  { id: 99, role_id: 7, action: 'delete', subject: 'Project' },
  { id: 100, role_id: 7, action: 'create', subject: 'Project' },
  { id: 101, role_id: 7, action: 'read', subject: 'Skills' },
  { id: 102, role_id: 7, action: 'update', subject: 'Skills' },
  { id: 103, role_id: 7, action: 'delete', subject: 'Skills' },
  { id: 104, role_id: 7, action: 'create', subject: 'Skills' },
  { id: 105, role_id: 7, action: 'read', subject: 'Success' },
  { id: 106, role_id: 7, action: 'update', subject: 'Success' },
  { id: 107, role_id: 7, action: 'delete', subject: 'Success' },
  { id: 108, role_id: 7, action: 'create', subject: 'Success' },
  { id: 109, role_id: 7, action: 'read', subject: 'Tag' },
  { id: 110, role_id: 7, action: 'update', subject: 'Tag' },
  { id: 111, role_id: 7, action: 'delete', subject: 'Tag' },
  { id: 112, role_id: 7, action: 'create', subject: 'Tag' },
];

export const users = [
  {
    id: 1,
    name: 'Billian',
    surname: 'David',
    role_id: 1,
    pass: 'somePass',
    email: 'billy@yopmail.com',
  },
  {
    id: 2,
    name: 'Bennison',
    surname: 'Devadoss',
    role_id: 2,
    pass: 'somePass',
    email: 'bennison@yopmail.com',
  },
];

const prisma = new PrismaClient();

async function main() {
  for await (const role of roles) {
    const roleAttrs = cloneDeep(role);
    delete roleAttrs.id;
    await prisma.userRole.upsert({
      where: {
        id: role.id,
      },
      create: roleAttrs,
      update: roleAttrs,
    });
  }

  for await (const permission of permissions) {
    const permissionAttrs = cloneDeep(permission);
    delete permissionAttrs.id;
    await prisma.permission.upsert({
      where: {
        id: permission.id,
      },
      create: permissionAttrs,
      update: permissionAttrs,
    });
  }

  for await (const user of users) {
    const userAttrs = cloneDeep(user);
    delete userAttrs.id;
    await prisma.user.upsert({
      where: {
        id: user.id,
      },
      create: userAttrs,
      update: userAttrs,
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.log(error);
    await prisma.$disconnect();
  });
