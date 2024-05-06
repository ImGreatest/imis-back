import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker/locale/ru';
import * as bcrypt from 'bcrypt';
import { config } from '../../config/config';

const prisma = new PrismaClient();

function genArray(count: number) {
  return Array.from(Array(count));
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getIds(entity: any, whereData: any = {}): Promise<number[]> {
  return entity
    .findMany({ where: whereData, select: { id: true } })
    .then((res) => res.map((el) => el.id));
}

const groupCount = 10;
const directionCount = 10;
const studentCount = 10;
const companyAndEmployerCount = 5;
const skillTypeCount = 10;
const skillsCount = 20;
const tagCount = 20;
const tagComplexity = 0.6;
const successCount = 10;
const projectCount = 10;
//TODO Сделать рейтинг с оценкой тегов, темы
async function fakeSeed() {
  await prisma.skillType.createMany({
    data: genArray(skillTypeCount).map(() => ({
      name: faker.word.sample(),
    })),
    skipDuplicates: true,
  });

  const skillTypesIds = await getIds(prisma.skillType);

  await prisma.skills.createMany({
    data: genArray(skillsCount).map(() => ({
      name: faker.word.sample(),
      skillTypeId: faker.helpers.arrayElement(skillTypesIds),
    })),
    skipDuplicates: true,
  });

  const skillIds = await getIds(prisma.skills);

  await prisma.group.createMany({
    data: genArray(groupCount).map(() => ({
      name: faker.word.sample(),
    })),
    skipDuplicates: true,
  });

  await prisma.direction.createMany({
    data: genArray(directionCount).map(() => ({
      name: faker.word.sample(),
    })),
    skipDuplicates: true,
  });

  const directionsIds = await getIds(prisma.direction);

  const groupsIds = await getIds(prisma.group);

  await prisma.user.createMany({
    data: genArray(studentCount).map(() => ({
      name: faker.name.firstName(),
      surname: faker.name.middleName(),
      course: faker.number.int({ min: 1, max: 5 }),
      email: faker.internet.email(),
      pass: bcrypt.hashSync(faker.internet.password(), config.HashSaltRound),
      roleId: 1,
      groupId: faker.helpers.arrayElement(groupsIds),
      directionId: faker.helpers.arrayElement(directionsIds),
      userSkils: {
        create: {
          skillId: faker.helpers.arrayElements(
            skillIds,
            faker.number.int({ min: 1, max: 5 }),
          ),
        },
      },
    })),
    skipDuplicates: true,
  });

  await prisma.user.createMany({
    data: genArray(companyAndEmployerCount).map(() => ({
      name: faker.name.firstName(),
      surname: faker.name.middleName(),
      email: faker.internet.email(),
      pass: bcrypt.hashSync(faker.internet.password(), config.HashSaltRound),
      roleId: 4,
    })),
  });

  const employerWithourCompany = await getIds(prisma.user, {
    roleId: 4,
    company: null,
  });

  await prisma.company.createMany({
    data: genArray(companyAndEmployerCount).map(() => ({
      name: faker.company.name(),
      description: faker.company.catchPhrase(),
      spokesPersonId: faker.helpers.arrayElement(employerWithourCompany),
    })),
    skipDuplicates: true,
  });

  for (let i = 0; i < tagCount; i++) {
    if (Math.random() < tagComplexity) {
      const tagsIds = await getIds(prisma.tag);

      await prisma.tag.create({
        data: {
          name: faker.word.sample(),
          description: faker.word.sample(),
          baseTagId: faker.helpers.arrayElement(tagsIds),
        },
      });
    } else {
      await prisma.tag.create({
        data: {
          name: faker.word.sample(),
          description: faker.word.sample(),
        },
      });
    }
  }
  const tagsForSuccess = await getIds(prisma.tag, { childTags: null });
  const studentIds = await getIds(prisma.user, { roleId: 1 });
  const createrIds = await getIds(prisma.user, { roleId: { in: [3, 4, 7] } });

  await prisma.success.createMany({
    data: genArray(successCount).map(() => ({
      name: faker.word.sample(),
      description: faker.word.sample(),
      studentId: faker.helpers.arrayElement(studentIds),
      createrId: faker.helpers.arrayElement(createrIds),
      tags: {
        create: faker.helpers.arrayElements(
          tagsForSuccess,
          faker.number.int({ min: 1, max: 3 }),
        ),
      },
    })),
  });

  const userIds = await getIds(prisma.user);
  const employerIds = await getIds(prisma.user, { roleId: 4 });
  //TODO добавить проекты Статусы
  await prisma.project.createMany({
    data: genArray(projectCount).map(() => ({
      name: faker.word.sample(),
      descripton: faker.word.sample(),
      createrId: faker.helpers.arrayElement(employerIds),
      status: faker.word.words(),
      students: {
        create: {
          studentId: faker.helpers.arrayElements(
            studentIds,
            faker.number.int({ min: 1, max: 4 }),
          ),
        },
      },
      usersWithFavor: {
        create: {
          studentId: faker.helpers.arrayElements(
            userIds,
            faker.number.int({ min: 1, max: 4 }),
          ),
        },
      },
      skills: {
        create: faker.helpers.arrayElements(
          skillIds,
          faker.number.int({ min: 1, max: 4 }),
        ),
      },
    })),
  });
}

fakeSeed()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
