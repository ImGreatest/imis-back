import { PrismaClient } from '@prisma/client';
import { cloneDeep } from 'lodash';
import * as bcrypt from 'bcrypt';
import { config } from '../../config/config';
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
    name: 'supervisor',
  },
];

export const permissions = [
  { id: 1, roleId: 3, action: 'read', subject: 'all' },
  { id: 2, roleId: 3, action: 'create', subject: 'all' },
  { id: 3, roleId: 3, action: 'update', subject: 'all' },
  { id: 4, roleId: 3, action: 'delete', subject: 'all' },
  { id: 36, roleId: 1, action: 'read', subject: 'User' },
  {
    id: 37,
    roleId: 1,
    action: 'update',
    subject: 'User',
    conditions: { id: '{{id}}' },
  },
  { id: 38, roleId: 1, action: 'read', subject: 'Company' },
  { id: 39, roleId: 1, action: 'read', subject: 'Theme' },
  { id: 40, roleId: 1, action: 'read', subject: 'Project' },
  { id: 41, roleId: 1, action: 'updateStatus', subject: 'Project' },
  { id: 42, roleId: 1, action: 'read', subject: 'Skills' },
  { id: 43, roleId: 1, action: 'read', subject: 'Tag' },
  { id: 44, roleId: 2, action: 'read', subject: 'User' },
  {
    id: 45,
    roleId: 2,
    action: 'update',
    subject: 'User',
    conditions: { id: '{{id}}' },
  },
  { id: 46, roleId: 2, action: 'read', subject: 'Company' },
  { id: 47, roleId: 2, action: 'read', subject: 'Theme' },
  { id: 48, roleId: 2, action: 'read', subject: 'Project' },
  { id: 49, roleId: 2, action: 'read', subject: 'Skills' },
  { id: 50, roleId: 2, action: 'read', subject: 'Tag' },
  { id: 51, roleId: 4, action: 'read', subject: 'User' },
  {
    id: 52,
    roleId: 4,
    action: 'update',
    subject: 'User',
    conditions: { id: '{{id}}' },
  },
  { id: 53, roleId: 4, action: 'read', subject: 'Company' },
  {
    id: 54,
    roleId: 4,
    action: 'update',
    subject: 'Company',
    conditions: { spokesPersonId: '{{ id }}' },
  },
  { id: 55, roleId: 4, action: 'read', subject: 'Theme' },
  { id: 56, roleId: 4, action: 'create', subject: 'Theme' },
  { id: 57, roleId: 4, action: 'update', subject: 'Theme' },
  { id: 58, roleId: 4, action: 'read', subject: 'Project' },
  { id: 59, roleId: 4, action: 'create', subject: 'Project' },
  {
    id: 60,
    roleId: 4,
    action: 'update',
    subject: 'Project',
    conditions: { createrId: '{{ id }}' },
  },
  { id: 61, roleId: 4, action: 'read', subject: 'Skills' },
  { id: 62, roleId: 4, action: 'read', subject: 'Tag' },
  { id: 63, roleId: 5, action: 'read', subject: 'User' },
  {
    id: 64,
    roleId: 5,
    action: 'update',
    subject: 'User',
    conditions: { id: '{{id}}' },
  },
  { id: 65, roleId: 5, action: 'read', subject: 'Company' },
  { id: 66, roleId: 5, action: 'read', subject: 'Theme' },
  { id: 67, roleId: 5, action: 'read', subject: 'Project' },
  { id: 68, roleId: 5, action: 'read', subject: 'Skills' },
  { id: 69, roleId: 5, action: 'read', subject: 'Tag' },
  { id: 70, roleId: 6, action: 'read', subject: 'User' },
  { id: 71, roleId: 6, action: 'update', subject: 'User' },
  { id: 72, roleId: 6, action: 'read', subject: 'Company' },
  { id: 73, roleId: 6, action: 'read', subject: 'Theme' },
  { id: 74, roleId: 6, action: 'read', subject: 'Project' },
  { id: 75, roleId: 6, action: 'read', subject: 'Skills' },
  { id: 76, roleId: 6, action: 'read', subject: 'Tag' },
  { id: 77, roleId: 7, action: 'read', subject: 'UserRole' },
  { id: 78, roleId: 7, action: 'update', subject: 'UserRole' },
  { id: 79, roleId: 7, action: 'delete', subject: 'UserRole' },
  { id: 80, roleId: 7, action: 'create', subject: 'UserRole' },
  { id: 81, roleId: 7, action: 'read', subject: 'Permission' },
  { id: 82, roleId: 7, action: 'update', subject: 'Permission' },
  { id: 83, roleId: 7, action: 'delete', subject: 'Permission' },
  { id: 84, roleId: 7, action: 'create', subject: 'Permission' },
  { id: 85, roleId: 7, action: 'read', subject: 'User' },
  { id: 86, roleId: 7, action: 'update', subject: 'User' },
  { id: 87, roleId: 7, action: 'delete', subject: 'User' },
  { id: 88, roleId: 7, action: 'create', subject: 'User' },
  { id: 89, roleId: 7, action: 'read', subject: 'Company' },
  { id: 90, roleId: 7, action: 'update', subject: 'Company' },
  { id: 91, roleId: 7, action: 'delete', subject: 'Company' },
  { id: 92, roleId: 7, action: 'create', subject: 'Company' },
  { id: 93, roleId: 7, action: 'read', subject: 'Theme' },
  { id: 94, roleId: 7, action: 'update', subject: 'Theme' },
  { id: 95, roleId: 7, action: 'delete', subject: 'Theme' },
  { id: 96, roleId: 7, action: 'create', subject: 'Theme' },
  { id: 97, roleId: 7, action: 'read', subject: 'Project' },
  { id: 98, roleId: 7, action: 'update', subject: 'Project' },
  { id: 99, roleId: 7, action: 'delete', subject: 'Project' },
  { id: 100, roleId: 7, action: 'create', subject: 'Project' },
  { id: 101, roleId: 7, action: 'read', subject: 'Skills' },
  { id: 102, roleId: 7, action: 'update', subject: 'Skills' },
  { id: 103, roleId: 7, action: 'delete', subject: 'Skills' },
  { id: 104, roleId: 7, action: 'create', subject: 'Skills' },
  { id: 105, roleId: 7, action: 'read', subject: 'Success' },
  { id: 106, roleId: 7, action: 'update', subject: 'Success' },
  { id: 107, roleId: 7, action: 'delete', subject: 'Success' },
  { id: 108, roleId: 7, action: 'create', subject: 'Success' },
  { id: 109, roleId: 7, action: 'read', subject: 'Tag' },
  { id: 110, roleId: 7, action: 'update', subject: 'Tag' },
  { id: 111, roleId: 7, action: 'delete', subject: 'Tag' },
  { id: 112, roleId: 7, action: 'create', subject: 'Tag' },
  { id: 113, roleId: 3, action: 'create', subject: 'Rating' },
  { id: 114, roleId: 3, action: 'read', subject: 'Rating' },
  { id: 115, roleId: 3, action: 'update', subject: 'Rating' },
  { id: 116, roleId: 3, action: 'delete', subject: 'Rating' },
];
const groups = [
  {
    id: 1,
    name: '402-ИСПК',
  },
  {
    id: 2,
    name: '302-ИСПК',
  },
  {
    id: 3,
    name: '302-ФКК',
  },
];

const directions = [
  {
    id: 1,
    name: 'ИСПК',
  },
  {
    id: 2,
    name: 'ФКК',
  },
];

export const users = [
  {
    id: 1,
    name: 'Billian',
    surname: 'David',
    groupId: 1,
    directionId: 1,
    course: 4,
    roleId: 1,
    pass: bcrypt.hashSync('somePass', config.HashSaltRound),
    email: 'student@mail.com',
  },
  {
    id: 2,
    name: 'Bennison',
    surname: 'Devadoss',
    roleId: 2,
    pass: bcrypt.hashSync('somePass', config.HashSaltRound),
    email: 'teacher@mail.com',
  },
  {
    id: 3,
    name: 'gena',
    surname: 'Chistyna',
    roleId: 3,
    pass: bcrypt.hashSync('somePass', config.HashSaltRound),
    email: 'god@mail.com',
  },
  {
    id: 4,
    name: 'Oleg',
    surname: 'DogCat',
    roleId: 4,
    pass: bcrypt.hashSync('somePass', config.HashSaltRound),
    email: 'syn@mail.com',
  },
  {
    id: 5,
    name: 'ser',
    surname: 'cur',
    roleId: 5,
    pass: bcrypt.hashSync('somePass', config.HashSaltRound),
    email: 'kurator@mail.com',
  },
  {
    id: 6,
    name: 'Khm',
    surname: 'Some',
    roleId: 6,
    pass: bcrypt.hashSync('somePass', config.HashSaltRound),
    email: 'admin@mail.com',
  },
  {
    id: 7,
    name: 'M',
    surname: 'A',
    roleId: 7,
    pass: bcrypt.hashSync('somePass', config.HashSaltRound),
    email: 'rukovod@mail.com',
  },
  {
    id: 8,
    name: 'Billian',
    surname: 'David',
    groupId: 1,
    course: 4,
    directionId: 1,
    roleId: 1,
    pass: bcrypt.hashSync('somePass', config.HashSaltRound),
    email: 'student1@mail.com',
  },
  {
    id: 9,
    name: 'Billian',
    surname: 'David',
    course: 3,
    groupId: 2,
    directionId: 1,
    roleId: 1,
    pass: bcrypt.hashSync('somePass', config.HashSaltRound),
    email: 'student2@mail.com',
  },
  {
    id: 10,
    name: 'Billian',
    surname: 'David',
    groupId: 2,
    course: 3,
    directionId: 1,
    roleId: 1,
    pass: bcrypt.hashSync('somePass', config.HashSaltRound),
    email: 'student3@mail.com',
  },
  {
    id: 11,
    name: 'Billian',
    surname: 'David',
    groupId: 3,
    directionId: 2,
    course: 3,
    roleId: 1,
    pass: bcrypt.hashSync('somePass', config.HashSaltRound),
    email: 'student4@mail.com',
  },
  {
    id: 12,
    name: 'Billian',
    surname: 'David',
    groupId: 3,
    course: 3,
    directionId: 2,
    roleId: 1,
    pass: bcrypt.hashSync('somePass', config.HashSaltRound),
    email: 'student5@mail.com',
  },
  {
    id: 13,
    name: 'Billian',
    surname: 'David',
    groupId: 3,
    directionId: 2,
    course: 3,
    roleId: 1,
    pass: bcrypt.hashSync('somePass', config.HashSaltRound),
    email: 'student6@mail.com',
  },
  {
    id: 14,
    name: 'Billian',
    surname: 'David',
    groupId: 3,
    course: 3,
    directionId: 2,
    roleId: 1,
    pass: bcrypt.hashSync('somePass', config.HashSaltRound),
    email: 'student7@mail.com',
  },
  {
    id: 15,
    name: 'Billian',
    surname: 'David',
    groupId: 3,
    course: 3,
    directionId: 2,
    roleId: 1,
    pass: bcrypt.hashSync('somePass', config.HashSaltRound),
    email: 'student8@mail.com',
  },
  {
    id: 16,
    name: 'Billian',
    surname: 'David',
    groupId: 3,
    course: 3,
    directionId: 2,
    roleId: 1,
    pass: bcrypt.hashSync('somePass', config.HashSaltRound),
    email: 'student9@mail.com',
  },
  {
    id: 17,
    name: 'Billian',
    groupId: 3,
    directionId: 2,
    course: 3,
    surname: 'David',
    roleId: 1,
    pass: bcrypt.hashSync('somePass', config.HashSaltRound),
    email: 'student10@mail.com',
  },
  {
    id: 18,
    name: 'Billian',
    groupId: 3,
    course: 3,
    directionId: 2,
    surname: 'David',
    roleId: 1,
    pass: bcrypt.hashSync('somePass', config.HashSaltRound),
    email: 'student11@mail.com',
  },
  {
    id: 19,
    name: 'Billian',
    surname: 'David',
    groupId: 3,
    course: 3,
    directionId: 2,
    roleId: 1,
    pass: bcrypt.hashSync('somePass', config.HashSaltRound),
    email: 'student12@mail.com',
  },
];
const tags = [
  {
    id: 1,
    name: 'tag1',
    description: 'tag1 description',
  },
  {
    id: 2,
    name: 'tag2',
    description: 'tag2 description',
  },
];

const rating = {
  id: 1,
  name: 'rating1',
  minuteUpdate: 0,
  createrId: 3,
  default:true,
};

const ratingScope = [
  {
    ratingId: 1,
    tagId: 1,
    ratingScore: 3,
  },
  {
    ratingId: 1,
    tagId: 2,
    ratingScore: 3,
  },
];
const ratingScore = [
  {
    ratingId: 1,
    studentId: 1,
    ratingScore: 3,
  },
  {
    ratingId: 1,
    studentId: 8,
    ratingScore: 164,
  },
  {
    ratingId: 1,
    studentId: 9,
    ratingScore: 143,
  },
  {
    ratingId: 1,
    studentId: 10,
    ratingScore: 234,
  },
  {
    ratingId: 1,
    studentId: 11,
    ratingScore: 123,
  },
  {
    ratingId: 1,
    studentId: 12,
    ratingScore: 57,
  },
  {
    ratingId: 1,
    studentId: 13,
    ratingScore: 76,
  },
  {
    ratingId: 1,
    studentId: 14,
    ratingScore: 36,
  },
  {
    ratingId: 1,
    studentId: 15,
    ratingScore: 25,
  },
  {
    ratingId: 1,
    studentId: 16,
    ratingScore: 23,
  },
  {
    ratingId: 1,
    studentId: 17,
    ratingScore: 2,
  },
  {
    ratingId: 1,
    studentId: 18,
    ratingScore: 8,
  },
  {
    ratingId: 1,
    studentId: 19,
    ratingScore: 10,
  },
];

const prisma = new PrismaClient();

async function main() {
  for await (const role of roles) {
    const roleAttrs = cloneDeep(role);
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
    await prisma.permission.upsert({
      where: {
        id: permission.id,
      },
      create: permissionAttrs,
      update: permissionAttrs,
    });
  }
  for await (const group of groups) {
    const groupAttrs = cloneDeep(group);
    await prisma.group.upsert({
      where: {
        id: group.id,
      },
      create: groupAttrs,
      update: groupAttrs,
    });
  }
  for await (const direction of directions) {
    const directionAttrs = cloneDeep(direction);
    await prisma.direction.upsert({
      where: {
        id: direction.id,
      },
      create: directionAttrs,
      update: directionAttrs,
    });
  }
  for await (const user of users) {
    const userAttrs = cloneDeep(user);
    await prisma.user.upsert({
      where: {
        id: user.id,
      },
      create: userAttrs,
      update: userAttrs,
    });
  }

  for await (const tag of tags) {
    const tagAttrs = cloneDeep(tag);
    await prisma.tag.upsert({
      where: {
        id: tag.id,
      },
      create: tagAttrs,
      update: tagAttrs,
    });
  }

  await prisma.rating.upsert({
    where: {
      id: rating.id,
    },
    create: rating,
    update: rating,
  });
  for await (const scope of ratingScope) {
    const scopeAttrs = cloneDeep(scope);
    await prisma.ratingScope.upsert({
      where: {
        ratingId_tagId: {
          ratingId: scope.ratingId,
          tagId: scope.tagId,
        },
      },
      create: scopeAttrs,
      update: scopeAttrs,
    });
  }
  for await (const score of ratingScore) {
    const scoreAttrs = cloneDeep(score);
    await prisma.score.upsert({
      where: {
        ratingId_studentId: {
          ratingId: score.ratingId,
          studentId: score.studentId,
        },
      },
      create: scoreAttrs,
      update: scoreAttrs,
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
