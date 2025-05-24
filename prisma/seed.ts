import { Day, PrismaClient, UserSex } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  //Admin
  await prisma.admin.create({
    data: {
      id: "admin1",
      username: "admin1",
    },
  });
  await prisma.admin.create({
    data: {
      id: "admin2",
      username: "admin2",
    },
  });
  await prisma.admin.create({
    data: {
      id: "admin3",
      username: "admin3",
    },
  });

  // Grade
  for (let i = 1; i <= 5; i++) {
    await prisma.grade.create({
      data: {
        level: i,
      },
    });
  }

  // Class
  for (let i = 1; i <= 5; i++) {
    await prisma.class.create({
      data: {
        name: `${i}A`,
        capacity: Math.floor(Math.random() * (30 - 20 + 1)) + 20,
        gradeId: i,
      },
    });
  }
  for (let i = 1; i <= 5; i++) {
    await prisma.class.create({
      data: {
        name: `${i}B`,
        capacity: Math.floor(Math.random() * (30 - 20 + 1)) + 20,
        gradeId: i,
      },
    });
  }
  for (let i = 1; i <= 5; i++) {
    await prisma.class.create({
      data: {
        name: `${i}C`,
        capacity: Math.floor(Math.random() * (30 - 20 + 1)) + 20,
        gradeId: i,
      },
    });
  }

  // Subject
  const subjectData = [
    { name: "Mathematics" },
    { name: "Physics" },
    { name: "Chemistry" },
    { name: "Biology" },
    { name: "History" },
    { name: "Literature" },
  ];

  for (const p_subject of subjectData) {
    await prisma.subject.create({
      data: p_subject,
    });
  }

  // TEACHER
  for (let i = 1; i <= 25; i++) {
    await prisma.teacher.create({
      data: {
        id: `teacher${i}`, // Unique ID for the teacher
        username: `teacher${i}`,
        name: `TName${i}`,
        surname: `TSurname${i}`,
        email: `teacher${i}@edu.vn`,
        phone: `097-456-333${i}`,
        address: `Address${i}`,
        bloodType: "A+",
        sex: i % 2 === 0 ? UserSex.MALE : UserSex.FEMALE,
        subjects: { connect: [{ id: (i % 6) + 1 }] },
        classes: { connect: [{ id: (i % 15) + 1 }] },
        birthday: new Date(
          new Date().setFullYear(new Date().getFullYear() - 30)
        ),
      },
    });
  }

  // Lesson
  for (let i = 1; i <= 30; i++) {
    await prisma.lesson.create({
      data: {
        name: `Lesson ${i}`,
        day: Day[
          Object.keys(Day)[
            Math.floor(Math.random() * Object.keys(Day).length)
          ] as keyof typeof Day
        ],
        startTime: new Date(new Date().setHours(new Date().getHours() + 1)),
        endTime: new Date(new Date().setHours(new Date().getHours() + 2.5)),
        subjectId: (i % 6) + 1,
        classId: (i % 15) + 1,
        teacherId: `teacher${(i % 25) + 1}`,
      },
    });
  }

  // PARENT
  for (let i = 1; i <= 50; i++) {
    await prisma.parent.create({
      data: {
        id: `parentId${i}`,
        username: `parentId${i}`,
        name: `PName ${i}`,
        surname: `PSurname ${i}`,
        email: `parent${i}@edu.vn`,
        phone: `034-995-789${i}`,
        address: `Address${i}`,
      },
    });
  }

  // Student
  for (let i = 1; i <= 100; i++) {
    await prisma.student.create({
      data: {
        id: `student${i}`,
        username: `student${i}`,
        name: `SName${i}`,
        surname: `SSurname ${i}`,
        email: `student${i}@edu.vn`,
        phone: `094-364-321${i}`,
        address: `Address${i}`,
        bloodType: "O-",
        sex: i % 2 === 0 ? UserSex.MALE : UserSex.FEMALE,
        parentId: `parentId${Math.ceil(i / 2) % 50 || 50}`,
        gradeId: (i % 5) + 1,
        classId: (i % 15) + 1,
        birthday: new Date(
          new Date().setFullYear(new Date().getFullYear() - 10)
        ),
      },
    });
  }

  // Exam
  for (let i = 1; i <= 10; i++) {
    await prisma.exam.create({
      data: {
        title: `Exam ${i}`,
        startTime: new Date(new Date().setHours(new Date().getHours() + 1)),
        endTime: new Date(new Date().setHours(new Date().getHours() + 1.5)),
        lessonId: (i % 30) + 1,
      },
    });
  }

  // Assignment
  for (let i = 1; i <= 10; i++) {
    await prisma.assignment.create({
      data: {
        title: `Assignment ${i}`,
        startDate: new Date(new Date().setHours(new Date().getHours() + 1)),
        dueDate: new Date(new Date().setDate(new Date().getDate() + 1)),
        lessonId: (i % 30) + 1,
      },
    });
  }
  // Result
  for (let i = 1; i <= 10; i++) {
    await prisma.result.create({
      data: {
        score: 90,
        studentId: `student${i}`,
        ...(i <= 5 ? { examId: i } : { assignmentId: i - 5 }),
      },
    });
  }

  // Attendance
  for (let i = 1; i <= 10; i++) {
    await prisma.attendance.create({
      data: {
        date: new Date(),
        present: true,
        studentId: `student${i}`,
        lessonId: (i % 30) + 1,
      },
    });
  }

  // Event
  for (let i = 1; i <= 10; i++) {
    await prisma.event.create({
      data: {
        title: `Event${i}`,
        description: `Description for Event ${i}`,
        startTime: new Date(new Date().setHours(new Date().getHours() + 1)),
        endTime: new Date(new Date().setHours(new Date().getHours() + 3)),
      },
    });
  }

  // Announcement
  for (let i = 1; i <= 5; i++) {
    await prisma.announcement.create({
      data: {
        title: `Announcement ${i}`,
        description: `Description for Announcement ${i}`,
        date: new Date(),
        classId: (i % 5) + 1,
      },
    });
  }
  console.log("Seeding completed successfully.");
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
