import axios from 'axios';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const DEPARTMENTS: { name: string; positions: { title: string; min: number; max: number }[] }[] = [
  {
    name: 'Engineering',
    positions: [
      { title: 'Software Engineer', min: 4000, max: 7000 },
      { title: 'Senior Software Engineer', min: 7000, max: 10000 },
      { title: 'QA Engineer', min: 3500, max: 6000 },
      { title: 'DevOps Engineer', min: 5000, max: 9000 },
      { title: 'Engineering Manager', min: 9000, max: 13000 },
    ],
  },
  {
    name: 'Product',
    positions: [
      { title: 'Product Manager', min: 6000, max: 9000 },
      { title: 'Senior Product Manager', min: 9000, max: 12000 },
      { title: 'UX Designer', min: 4000, max: 7000 },
      { title: 'UI Designer', min: 4000, max: 6500 },
    ],
  },
  {
    name: 'Sales',
    positions: [
      { title: 'Sales Development Rep', min: 3000, max: 5000 },
      { title: 'Account Executive', min: 5000, max: 8000 },
      { title: 'Sales Manager', min: 7000, max: 11000 },
    ],
  },
  {
    name: 'Marketing',
    positions: [
      { title: 'Content Marketer', min: 3500, max: 6000 },
      { title: 'Performance Marketer', min: 4000, max: 7000 },
      { title: 'SEO Specialist', min: 3500, max: 6000 },
    ],
  },
  {
    name: 'HR',
    positions: [
      { title: 'Recruiter', min: 3000, max: 5000 },
      { title: 'HR Generalist', min: 3500, max: 6000 },
      { title: 'HR Manager', min: 6000, max: 9000 },
    ],
  },
  {
    name: 'Finance',
    positions: [
      { title: 'Financial Analyst', min: 4000, max: 7000 },
      { title: 'Accountant', min: 4000, max: 6500 },
      { title: 'Controller', min: 6000, max: 9000 },
    ],
  },
];

function normalizePostal(postal: any): string | undefined {
  if (postal === undefined || postal === null) return undefined;
  const s = String(postal).trim();
  return s.length ? s : undefined;
}

function randomBetween(min: number, max: number): number {
  const value = Math.floor(Math.random() * (max - min + 1)) + min;
  return Math.floor(value / 100) * 100;
}

async function seedDepartmentsAndPositions() {
  for (const dept of DEPARTMENTS) {
    const createdDept = await prisma.department.upsert({
      where: { name: dept.name },
      update: {},
      create: { name: dept.name },
    });

    for (const pos of dept.positions) {
      await prisma.position.upsert({
        where: { title_departmentId: { title: pos.title, departmentId: createdDept.id } },
        update: {
          minSalary: pos.min,
          maxSalary: pos.max,
        },
        create: {
          title: pos.title,
          departmentId: createdDept.id,
          minSalary: pos.min,
          maxSalary: pos.max,
        },
      });
    }
  }
}

async function fetchRandomUsers(count: number) {
  const perRequest = Math.min(count, 50);
  const pages = Math.ceil(count / perRequest);
  const results: any[] = [];

  for (let p = 0; p < pages; p++) {
    const want = Math.min(perRequest, count - results.length);
    const { data } = await axios.get('https://randomuser.me/api/', {
      params: {
        results: want,
        nat: 'us,gb,fr,de,ca,au',
      },
      timeout: 15000,
    });
    results.push(...data.results);
  }
  return results;
}

async function pickRandomPosition(): Promise<{ id: number; minSalary: number; maxSalary: number }> {
  const total = await prisma.position.count();
  if (total === 0) throw new Error('No positions found. Check departments/positions seeding?');
  const skip = Math.floor(Math.random() * total);
  const pos = await prisma.position.findFirst({ skip });
  if (!pos) throw new Error('Failed to pick a random position');
  return { id: pos.id, minSalary: pos.minSalary, maxSalary: pos.maxSalary };
}

function toTitleCase(s: string): string {
  return s.replace(/\w\S*/g, (txt) => txt[0].toUpperCase() + txt.slice(1).toLowerCase());
}

async function seedEmployees(count: number) {
  const users = await fetchRandomUsers(count);

  for (const u of users) {
    const first = toTitleCase(u.name.first);
    const last = toTitleCase(u.name.last);
    const email = String(u.email).toLowerCase();

    const { id: positionId, minSalary, maxSalary } = await pickRandomPosition();

    const street = [u.location?.street?.number, u.location?.street?.name].filter(Boolean).join(' ');
    const area = u.location?.state || '';
    const region = u.location?.country || '';
    const city = u.location?.city || '';
    const postalCode = normalizePostal(u.location?.postcode);
    const description = undefined;

    const mobileNumber =
      (u.cell && String(u.cell).replace(/\s+/g, '')) ||
      (u.phone && String(u.phone).replace(/\s+/g, '')) ||
      '+10000000000';

    const pictureUrl = u.picture?.large || u.picture?.medium || null;

    const monthlySalary = randomBetween(minSalary, maxSalary);

    try {
      await prisma.employee.create({
        data: {
          firstName: first,
          lastName: last,
          email,
          mobileNumber,
          pictureUrl,
          positionId,
          monthlySalary,
          address: {
            create: {
              street: street || 'N/A',
              area: area || 'N/A',
              region: region || 'N/A',
              city: city || 'N/A',
              postalCode: postalCode,
              description: description,
            },
          },
        },
      });
    } catch (e: any) {
      console.warn(`Skipping ${email}: ${e?.code || e?.message}`);
    }
  }
}

async function main() {
  await seedDepartmentsAndPositions();

  const count = Number(50);
  await seedEmployees(count);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
