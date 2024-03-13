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
    name: 'supervisor',
  },
];

export const permissions = [
  {
    id: 1,
    role_id: 3,
    action: 'manage',
    subject: 'UserRole',
  },
  {
    id: 10,
    role_id: 3,
    action: 'manage',
    subject: 'Permission',
  },
  {
    id: 11,
    role_id: 3,
    action: 'manage',
    subject: 'User',
  },
  {
    id: 2,
    role_id: 1,
    action: 'read',
    subject: 'User',
  },
  {
    id: 3,
    role_id: 1,
    action: 'update',
    subject: 'User',
    conditions: { id: '{{ id }}' },
  },
  {
    id: 4,
    role_id: 1,
    action: 'read',
    subject: 'Company',
  },
  {
    id: 5,
    role_id: 1,
    action: 'read',
    subject: 'Theme',
  },
  {
    id: 6,
    role_id: 1,
    action: 'read',
    subject: 'Project',
  },
  {
    id: 7,
    role_id: 1,
    action: 'updateStatus',
    subject: 'Project',
  },
  {
    id: 8,
    role_id: 1,
    action: 'read',
    subject: 'Skills',
  },
  {
    id: 9,
    role_id: 1,
    action: 'read',
    subject: 'Tag',
  },
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
