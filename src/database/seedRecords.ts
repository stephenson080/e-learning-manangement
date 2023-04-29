import Department from "../models/department";
import Level from "../models/level";
import Semester from "../models/semester";
let departments = [
  { name: "Computer Science", code: "CSC" },
  { name: "Information Technology", code: "IFT" },
  { name: "Software Engineering", code: "SFE" },
  { name: "Cyber Security", code: "CYB" },
];
let levels = ["100", "200", "300", "400", "500"];
let semesters = ["HARMATTAN", "RAIN"];

async function addDepartments() {
  for (let dep of departments) {
    const _dep = new Department({ name: dep.name, code: dep.code });
    await _dep.save();
  }
}

async function addLevel() {
  for (let level of levels) {
    const _level = new Level({ name: level });
    await _level.save();
  }
}

async function addSemester() {
  for (let sem of semesters) {
    const _sem = new Semester({ name: sem });
    await _sem.save();
  }
}

export async function seedRecords(){
    try {
        // await Promise.all([addDepartments, addLevel, addSemester])
       
        await addDepartments()
        await addLevel()
        await addSemester()
        console.log('Records Seeded!')
    } catch (error :any) {
        console.log(error.message)
    }
}

// seedRecords()
