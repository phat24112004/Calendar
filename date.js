const currentDate = document.getElementById("calender-header");
const daysTag = document.querySelector(".days");
const prevYear = document.getElementById("prev-year");
const prevMonth = document.getElementById("prev-month");
const nextMonth = document.getElementById("next-month");
const nextYear = document.getElementById("next-year");
const dateHeader = document.getElementById("date-header");
const dayWeek = document.getElementById("day-week");
const daysSelect = document.getElementById("days-select");
const monthsSelect = document.getElementById("months-select");
const years = document.getElementById("years");
const confirmBtn = document.getElementById("confirm-button");
const resetDate = document.getElementById("reset-date");

let date = new Date();

const months = [
    "Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4",
    "Tháng 5", "Tháng 6", "Tháng 7", "Tháng 8",
    "Tháng 9", "Tháng 10", "Tháng 11", "Tháng 12"
];

const dayOfWeeks = [
    "Chủ Nhật", "Thứ 2", "Thứ 3", "Thứ 4",
    "Thứ 5", "Thứ 6", "Thứ 7"
];

const renderCalendar = () => {
    const currYear = date.getFullYear();
    const currMonth = date.getMonth();
    const firstDayOfMonth = new Date(currYear, currMonth, 1).getDay();
    const lastDateOfMonth = new Date(currYear, currMonth + 1, 0).getDate();
    let liTag = "";

    for (let i = 0; i < firstDayOfMonth; i++) {
        liTag += `<li></li>`;
    }

    for (let i = 1; i <= lastDateOfMonth; i++) {
        let isToday = i === new Date().getDate() &&
                      currMonth === new Date().getMonth() &&
                      currYear === new Date().getFullYear() ? "active" : "";
        liTag += `<li class="day-item ${isToday}">${i}</li>`;
    }

    currentDate.textContent = `${months[currMonth]} ${currYear}`;
    daysTag.innerHTML = liTag;

    document.querySelectorAll(".day-item").forEach(ele => { 
        ele.addEventListener("click", function () { 
            let dayText = this.textContent;
            dateHeader.textContent = dayText;
            let selectedDate = new Date(date.getFullYear(), date.getMonth(), dayText);
            let weekdayIndex = selectedDate.getDay();
            dayWeek.textContent = dayOfWeeks[weekdayIndex];
            
            document.querySelectorAll(".day-item").forEach(ele => {
                ele.classList.remove("active")
            });
            ele.classList.add("active");
        }); 
    });
};

prevYear.addEventListener("click", function() {
    let currentYear = date.getFullYear();
    let newYear = currentYear - 1;
    date.setFullYear(newYear);
    renderCalendar();
});

prevMonth.addEventListener("click", function() {
    let currentMonth = date.getMonth();
    let newMonth = currentMonth - 1;
    date.setMonth(newMonth);
    renderCalendar();
});

nextMonth.addEventListener("click", function() {
    let currentMonth = date.getMonth();
    let newMonth = currentMonth + 1;
    date.setMonth(newMonth);
    renderCalendar();
});

nextYear.addEventListener("click", function() {
    let currentYear = date.getFullYear();
    let newYear = currentYear + 1;
    date.setFullYear(newYear);
    renderCalendar();
});

for (let i = 1; i <= 12; i++) {
    let option = document.createElement("option");
    option.value = i;
    option.textContent = i;
    monthsSelect.appendChild(option);
}

for (let i = 1; i <= 31; i++) {
    let option = document.createElement("option");
    option.value = i;
    option.textContent = i;
    daysSelect.appendChild(option);
}

resetDate.addEventListener("click", function() {
    date = new Date();
    dateHeader.textContent = date.getDate();
    dayWeek.textContent = dayOfWeeks[date.getDay()];
    renderCalendar();
});

confirmBtn.addEventListener("click", function() {
    const day = daysSelect.value;
    const month = monthsSelect.value;
    const year = years.value;

    const selectedDate = new Date(year, month - 1, day);
    date = selectedDate;

    dateHeader.textContent = day;
    dayWeek.textContent = dayOfWeeks[selectedDate.getDay()];
    renderCalendar();
});

renderCalendar();
