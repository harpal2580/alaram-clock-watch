
const hourInput = document.getElementById("hours");
const minuteInput = document.getElementById("minute")
const secondInput = document.getElementById("second")
const modeInput = document.getElementById("am_pm")

const alarmList = document.getElementById("alarm-list")

const buttonElement =  document.querySelector(".set-alarm-btn")


let alarmListArr = [];  // array store added alram data 


// Loop from 1 to 24
for (let i = 1; i <= 12; i++) {
  // Create a new option element
  const option = document.createElement("option");
  // Set the value and text content of the option
  option.value = i;
  option.textContent = i;
  // Add the option to the select element
  hourInput.appendChild(option);
}

function populateDropdown(selectElement) {
  for (let i = 1; i <= 60; i++) {
    const option = document.createElement("option");
    option.value = i;
    option.textContent = i;
    selectElement.appendChild(option);
  }
}
populateDropdown(minuteInput);
populateDropdown(secondInput);

function timeClock() {
  const currentTime = new Date();
  document.getElementById("clock").innerText = currentTime.toLocaleTimeString();
}

setInterval(timeClock, 1000);


/*add alarm **/
buttonElement.addEventListener('click',function(){
  if(hourInput.value=="" || minuteInput.value==""  || secondInput.value=="" ||   modeInput.value==""){
        alert('Please fill up all fields')
  }else{
    alarmTime={
        hourInput:hourInput.value,
        minuteInput:minuteInput.value,
        secondInput:secondInput.value,
        modeInput:modeInput.value,
        id:Date.now()
    }
    alarmListArr.push(alarmTime)
  
    renderList();
    hourInput.value=''
    minuteInput.value=''
    secondInput.value=''
    modeInput.value=''
  }

})


function renderList(){
  //localstorage
  localStorage.setItem('localStorage',JSON.stringify(alarmListArr))
  alarmList.innerHTML=''

  for (let element of alarmListArr) {
      addAlarmList(element)
  }
}

function addAlarmList(alarmTime){
    console.log(alarmTime)

    const div = document.createElement('list')
    div.innerHTML=`
        Hours - ${alarmTime.hourInput}
        Minute - ${alarmTime.minuteInput}
        second  - ${alarmTime.secondInput}
        mode - ${alarmTime.modeInput}
    `;
    alarmList.append(div)

}
