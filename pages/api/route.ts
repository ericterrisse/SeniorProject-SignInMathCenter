import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      // Data in this order
      const { fullname, classId, studentId } = req.body;

      // Split up first and last name from 'fullname'
      const [firstName, ...lastNameParts] = fullname.split(' ');
      const lastName = lastNameParts.join(' ');

      // Find student with the unique studentId
      const student = await prisma.student.findUnique({
        where: { studentId },
      });

      // Create student if it doesn't already exist
      if (!student) {
        const newStudent = await prisma.student.create({
          data: {
            studentId,
            firstName,
            lastName,
          },
        });

        // Making studentTracker with relationship to newStudent
        await prisma.studentTracker.create({
          data: {
            className: classId,
            checkInTime: new Date(),
            studentId: newStudent.studentId,
          },
        });
      } else {
        // Making studentTracker with relationship with existing student
        await prisma.studentTracker.create({
          data: {
            className: classId,
            checkInTime: new Date(),
            studentId: student.studentId,
          },
        });
      }

      res.status(200).json({ message: 'Check-in successful' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}