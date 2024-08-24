 
const hourInput = document.getElementById("hours");
const minuteInput = document.getElementById("minute")
const secondInput = document.getElementById("second")
const modeInput = document.getElementById("am_pm")

const alarmList = document.getElementById("alarm-list")
const alarmDiv = document.getElementById("alarm-ringing")

const buttonElement = document.querySelector(".set-alarm-btn")

let alarmRingtone = new Audio("./ringtone/alarm.mp3")

let alarmListArr = [];  // array store added alram data 

//check localstorage empty or not
let retrieveAlarm = JSON.parse(localStorage.getItem('localStorage'))

if (retrieveAlarm !== null) {
  alarmListArr = [...retrieveAlarm]
  renderList();
}

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


  const date = new Date();  
  const hour = timeFormat(date.getHours());
  const minute = timeFormat(date.getMinutes());
  const min = date.getMinutes()
  const second = timeFormat(date.getSeconds());
  const sec = date.getSeconds()
  const ampm = hour >= 12 ? 'pm' : 'am';
  let calculatedHour;

  
  if (hour > 12) {
    
    calculatedHour = hour - 12;
    playAlarm(calculatedHour,hour, minute, min, second, sec, ampm)
    
  } else if (hour == 0 && ampm == 'am') {

    //playAlarm(hour, minute, min, second, sec, ampm)
  } else if (hour == 12 && ampm == 'pm') {
    
    //playAlarm(hour, minute, min, second, sec, ampm)
  } else {
    //playAlarm(hour, minute, min, second, sec, ampm)

  }

}

setInterval(timeClock, 1000);


/**play alarm 
 * 12:10:00 am
 * 12:15:23 am
 * 
*/
function playAlarm(calculatedHour,hour, minute, min, second, sec, ampm) {
      for (let i = 0; i < alarmListArr.length; i++) {
        let alarmHour = alarmListArr[i].hourInput
        let alarmMinute = alarmListArr[i].minuteInput
        let alarmSecond = alarmListArr[i].secondInput
        let alarmMode = alarmListArr[i].modeInput

        console.log(alarmHour,alarmMinute,alarmSecond,alarmMode);
         console.log(calculatedHour, minute, second, ampm)

        if((alarmHour == calculatedHour || alarmHour == hour) && 
            (alarmMinute == minute || alarmMinute == min ) && 
            (alarmSecond == second || alarmSecond == sec ) && 
            alarmMode == ampm){
                setTimeout(() => {
                  alarmRingtone.pause();
                  alarmDiv.style.display='none'
                },500000);
                alarmRingtone.play();
                alarmRingtone.loop = true;
                alarmDiv.style.display='flex'
            }
            
      }
}




function timeFormat(time) {
  if (time < 10) {
    return `0${time}`
  }
  return time;
}


/*add alarm **/
buttonElement.addEventListener('click', function () {
  if (hourInput.value == "" || minuteInput.value == "" || secondInput.value == "" || modeInput.value == "") {
    alert('Please fill up all fields')
  } else {
    alarmTime = {
      hourInput: hourInput.value,
      minuteInput: minuteInput.value,
      secondInput: secondInput.value,
      modeInput: modeInput.value,
      id: Date.now()
    }
    alarmListArr.push(alarmTime)

    renderList();
    hourInput.value = ''
    minuteInput.value = ''
    secondInput.value = ''
    modeInput.value = ''
  }

})


function renderList() {
  //localstorage
  localStorage.setItem('localStorage', JSON.stringify(alarmListArr))
  alarmList.innerHTML = ''

  for (let element of alarmListArr) {
    addAlarmList(element)
  }
}

function addAlarmList(alarmTime) {
  const li = document.createElement('li')
  li.innerHTML = `
         ${alarmTime.hourInput}:${alarmTime.minuteInput}:${alarmTime.secondInput} ${alarmTime.modeInput}
        
         <span class="delete-img" ${alarmTime.id}>
            <img src="https://cdn-icons-png.flaticon.com/512/3299/3299935.png" class="delete" id="delete" data-id="${alarmTime.id}" width="30" height="30"> 
         </span>
    `;
  alarmList.append(li)

}


document.addEventListener('click', function (e) {
  if (e.target.id == 'delete') {
    let dataid = e.target.dataset.id;
    deleteButton(dataid)
  }

  console.log(e.target)
  if(e.target.id == 'alarm-ringing-img'){
        alarmRingtone.pause();
        alarmDiv.style.display='none'
  }
})


function deleteButton(dataid) {
  const confirmation = confirm("Are you sure you want to delete this record?");
  if (confirmation) {
    let newAlarmList = alarmListArr.filter(function (alarmTime) {
      return alarmTime.id !== Number(dataid)
    })
    alarmListArr = newAlarmList;
    renderList();
  }

}