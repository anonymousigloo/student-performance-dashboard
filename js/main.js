import { students } from "./students.js";
import {
  searchStudents,
  filterStudentsByBlock,
  filterStudentsByStatus
} from "./gradeUtils.js";
import { displayStudents, displaySummary, displayMessage } from "./display.js";

const searchInput = document.getElementById("searchInput");
const blockFilter = document.getElementById("blockFilter");
const statusFilter = document.getElementById("statusFilter");
const applyBtn = document.getElementById("applyBtn");
const resetBtn = document.getElementById("resetBtn");

function renderResults(resultSet) {
  displayStudents(resultSet);
  displaySummary(resultSet);
}

function getFilteredStudents() {
  const query = searchInput.value.trim();
  const block = blockFilter.value;
  const status = statusFilter.value;

  let result = searchStudents(students, query);
  result = filterStudentsByBlock(result, block);
  result = filterStudentsByStatus(result, status);

  return result;
}

function applyFilters() {
  renderResults(getFilteredStudents());
}

function resetFilters() {
  searchInput.value = "";
  blockFilter.value = "All";
  statusFilter.value = "All";
  displayMessage("");

  renderResults(students);
}

applyBtn.addEventListener("click", applyFilters);

resetBtn.addEventListener("click", resetFilters);

searchInput.addEventListener("input", applyFilters);

blockFilter.addEventListener("change", applyFilters);
statusFilter.addEventListener("change", applyFilters);

renderResults(students);
