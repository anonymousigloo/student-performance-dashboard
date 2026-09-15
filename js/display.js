import { calculateFinalGrade, getAcademicStatus, getPerformanceRemark } from "./gradeUtils.js";

export function displayStudents(students) {
  const studentList = document.getElementById("studentList");
  studentList.innerHTML = "";

  if (students.length === 0) {
    displayMessage("No students found");
    return;
  }

  displayMessage("");

  students.forEach(student => {
    const { id, name, block, quiz, lab, exam } = student;

    const finalGrade = calculateFinalGrade(student);
    const status = getAcademicStatus(finalGrade);
    const remark = getPerformanceRemark(finalGrade);

    const card = document.createElement("div");
    card.className = "student-card";
    card.dataset.id = id;

    card.innerHTML = `
      <h3 class="student-name">${name}</h3>
      <p class="student-block">Block: ${block}</p>
      <p class="student-scores">Quiz: ${quiz} | Lab: ${lab} | Exam: ${exam}</p>
      <p class="student-grade">Final Grade: ${finalGrade.toFixed(2)}</p>
      <p class="student-remark">Remark: ${remark}</p>
      <p class="student-status status-${status.replace(/\s+/g, "-").toLowerCase()}">${status}</p>
    `;

    studentList.appendChild(card);
  });
}

export function displaySummary(students) {
  const classAverageEl = document.getElementById("classAverage");
  const passingCountEl = document.getElementById("passingCount");
  const displayedCountEl = document.getElementById("displayedCount");
  const topStudentEl = document.getElementById("topStudent");

  if (students.length === 0) {
    classAverageEl.textContent = "0.00";
    passingCountEl.textContent = "0";
    displayedCountEl.textContent = "0";
    topStudentEl.textContent = "—";
    return;
  }

  const average = students.reduce((sum, student) => {
    return sum + calculateFinalGrade(student);
  }, 0) / students.length;

  const passingCount = students.filter(student => calculateFinalGrade(student) >= 75).length;

  const topStudent = students.reduce((top, current) => {
    return calculateFinalGrade(current) > calculateFinalGrade(top) ? current : top;
  });

  classAverageEl.textContent = average.toFixed(2);
  passingCountEl.textContent = passingCount;
  displayedCountEl.textContent = students.length;
  topStudentEl.textContent = topStudent.name;
}

export function displayMessage(message) {
  const messageArea = document.getElementById("messageArea");
  messageArea.textContent = message;
}
