const hoursElement = document.getElementById("hours");
const minuteElement = document.getElementById("minute")
const secondElement = document.getElementById("second")
// Loop from 1 to 24
for (let i = 1; i <= 12; i++) {
  // Create a new option element
  const option = document.createElement("option");
  // Set the value and text content of the option
  option.value = i;
  option.textContent = i;
  // Add the option to the select element
  hoursElement.appendChild(option);
}

function populateDropdown(selectElement) {
  for (let i = 1; i <= 60; i++) {
    const option = document.createElement("option");
    option.value = i;
    option.textContent = i;
    selectElement.appendChild(option);
  }
}
populateDropdown(minuteElement);
populateDropdown(secondElement);

function timeClock() {
  const currentTime = new Date();
  document.getElementById("clock").innerText = currentTime.toLocaleTimeString();
}
// timeClock()
setInterval(timeClock, 1000);
