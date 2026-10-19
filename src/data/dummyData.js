// ============================================================
// DUMMY DATA - edit this file to change the demo content.
// All names and details are fictional. No real patient data.
// ============================================================

export const initialResidents = [
  { id: 1, name: 'Ravi Kumar', age: 78, room: 'A-101', blood: 'B+', contact: 'Anil Kumar (Son) - +91 90000 00001', allergies: 'Penicillin', conditions: 'Hypertension, Type 2 Diabetes', history: 'Hypertension since 2012. Type 2 diabetes diagnosed 2016. Cataract surgery in 2021.' },
  { id: 2, name: 'Lakshmi Devi', age: 82, room: 'A-104', blood: 'O+', contact: 'Sunita Rao (Daughter) - +91 90000 00002', allergies: 'None known', conditions: 'Arthritis, Mild Hypothyroidism', history: 'Osteoarthritis (knees) since 2010. Thyroid medication started in 2018.' },
  { id: 3, name: 'Suresh Rao', age: 74, room: 'B-203', blood: 'A+', contact: 'Meera Rao (Wife) - +91 90000 00003', allergies: 'Sulfa drugs, Dust', conditions: 'Heart condition, High cholesterol', history: 'Stent procedure in 2019. Regular cardiology follow-ups every 6 months.' },
  { id: 4, name: 'Meena Sharma', age: 85, room: 'B-207', blood: 'AB+', contact: 'Rohit Sharma (Grandson) - +91 90000 00004', allergies: 'Aspirin', conditions: 'Osteoporosis, Mild memory loss', history: 'Hip fracture in 2020, recovered well. Memory check-ups every 3 months.' },
]

export const initialMeds = [
  { id: 1, residentId: 1, name: 'Paracetamol', dosage: '500 mg', frequency: 'Twice Daily', time: '9:00 AM, 9:00 PM', duration: '5 Days', instructions: 'After food', by: 'Dr. Mehta', notes: '', takenToday: false },
  { id: 2, residentId: 1, name: 'Metformin', dosage: '500 mg', frequency: 'Twice Daily', time: '8:00 AM, 8:00 PM', duration: 'Ongoing', instructions: 'With meals', by: 'Dr. Mehta', notes: 'Monitor sugar weekly', takenToday: true },
  { id: 3, residentId: 1, name: 'Amlodipine', dosage: '5 mg', frequency: 'Once Daily', time: '8:00 AM', duration: 'Ongoing', instructions: 'Morning', by: 'Dr. Mehta', notes: '', takenToday: true },
  { id: 4, residentId: 2, name: 'Levothyroxine', dosage: '50 mcg', frequency: 'Once Daily', time: '6:30 AM', duration: 'Ongoing', instructions: 'Empty stomach', by: 'Dr. Iyer', notes: '', takenToday: true },
  { id: 5, residentId: 2, name: 'Calcium + Vitamin D', dosage: '1 tablet', frequency: 'Once Daily', time: '1:00 PM', duration: 'Ongoing', instructions: 'After lunch', by: 'Dr. Iyer', notes: '', takenToday: false },
  { id: 6, residentId: 3, name: 'Atorvastatin', dosage: '10 mg', frequency: 'Once Daily', time: '9:00 PM', duration: 'Ongoing', instructions: 'Night', by: 'Dr. Nair', notes: '', takenToday: false },
  { id: 7, residentId: 3, name: 'Clopidogrel', dosage: '75 mg', frequency: 'Once Daily', time: '8:00 AM', duration: 'Ongoing', instructions: 'After breakfast', by: 'Dr. Nair', notes: 'Do not skip', takenToday: true },
  { id: 8, residentId: 4, name: 'Alendronate', dosage: '70 mg', frequency: 'Weekly', time: '7:00 AM (Sunday)', duration: 'Ongoing', instructions: 'Upright for 30 min after', by: 'Dr. Iyer', notes: '', takenToday: false },
  { id: 9, residentId: 4, name: 'Donepezil', dosage: '5 mg', frequency: 'Once Daily', time: '9:00 PM', duration: 'Ongoing', instructions: 'Night', by: 'Dr. Rao', notes: '', takenToday: false },
]

export const initialSchedule = [
  { id: 1, time: '07:00 AM', medicine: 'Medicine F', resident: 'Meena Sharma', status: 'Missed' },
  { id: 2, time: '08:00 AM', medicine: 'Medicine A', resident: 'Ravi Kumar', status: 'Completed' },
  { id: 3, time: '10:00 AM', medicine: 'Medicine B', resident: 'Lakshmi Devi', status: 'Pending' },
  { id: 4, time: '01:00 PM', medicine: 'Medicine C', resident: 'Lakshmi Devi', status: 'Completed' },
  { id: 5, time: '06:00 PM', medicine: 'Medicine D', resident: 'Suresh Rao', status: 'Upcoming' },
  { id: 6, time: '09:00 PM', medicine: 'Medicine E', resident: 'Ravi Kumar', status: 'Upcoming' },
]

export const initialNotifications = [
  { id: 1, text: 'Medication due for Ravi Kumar at 9:00 PM', time: '10 min ago', read: false },
  { id: 2, text: 'Medication missed by Lakshmi Devi', time: '1 hr ago', read: false },
  { id: 3, text: 'New resident added', time: '3 hrs ago', read: true },
  { id: 4, text: 'Medication schedule updated', time: 'Yesterday', read: true },
]

export const activity = [
  { id: 1, residentId: 1, text: 'Metformin 500 mg marked as taken', time: '8:05 AM' },
  { id: 2, residentId: 2, text: 'Levothyroxine 50 mcg marked as taken', time: '6:35 AM' },
  { id: 3, residentId: 3, text: 'Clopidogrel 75 mg marked as taken', time: '8:10 AM' },
  { id: 4, residentId: 2, text: 'Calcium + Vitamin D dose pending', time: '1:00 PM' },
  { id: 5, residentId: 4, text: 'Donepezil dose scheduled for tonight', time: '9:00 PM' },
]

export const dashboardStats = { residents: 24, today: 86, pending: 12, completed: 71, missed: 3, adherence: 92 }

export const faqs = [
  { q: 'What is SwasthElder?', a: 'SwasthElder is a prototype medication management system for old-age homes. It keeps resident records, medicines and schedules in one place.' },
  { q: 'Who can use SwasthElder?', a: 'Caregivers, nurses and administrators of old-age homes. Doctors can use the records as a reference.' },
  { q: 'Can caregivers manage medications?', a: "Yes. Caregivers can add, edit and mark medicines as taken, according to the doctor's prescription or the home's approved medical plan." },
  { q: 'Does the AI prescribe medicines?', a: 'No. The assistant only shares general health information and safety warnings. It never diagnoses or prescribes.' },
  { q: 'Is resident data secure?', a: 'This demo stores dummy data in your browser only. A production version would need authentication, encryption and compliance review.' },
]
