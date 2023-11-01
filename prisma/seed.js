const prisma = require("../prisma");

const seed = async (numAuthors = 20, booksPerAuthor = 3) => {
  const createAuthorPromises = Array.from({ length: numAuthors }, (_, i) => {
    const books = Array.from({ length: booksPerAuthor }, (_, j) => ({
      title: `Book ${i}${j}`,
    }));
    return prisma.author.create({
      data: {
        name: `Author ${i}`,
        books: {
          create: books,
        },
      },
    });
  });
  await Promise.all(createAuthorPromises);
};
seed()
  .then(async () => await prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
