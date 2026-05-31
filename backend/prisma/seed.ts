import { PrismaClient, Role } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding de la base de données...');

  // Créer l'administrateur
  const adminPassword = await bcrypt.hash('Admin@1234', 12);

  const admin = await prisma.user.upsert({
    where: { email: 'admin@eventapp.com' },
    update: {},
    create: {
      email: 'admin@eventapp.com',
      firstName: 'Super',
      lastName: 'Admin',
      password: adminPassword,
      role: Role.ADMIN,
    },
  });

  console.log(` Admin créé : ${admin.email}`);

  
  const categories = ['Musique', 'Sport', 'Technologie', 'Culture', 'Gastronomie', 'Business'];

  for (const name of categories) {
    await prisma.category.upsert({
      where: { name },
      update: {},
      create: { name },
    });
  }

  console.log(' Catégories créées');
  console.log(' Identifiants Admin :');
  console.log('   Email    : admin@eventapp.com');
  console.log('   Password : Admin@1234');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

