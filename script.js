//set the year to make this updatable and to get the correct days
const currentYear = 2020;
const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const months = [
	'January',
	'February',
	'March',
	'April',
	'May',
	'June',
	'July',
	'August',
	'September',
	'October',
	'November',
	'December'];
//list the colors that will be applied from mood to day
const colours = ['violet', 'pink', 'lightgreen', 'lightblue', 'coral'];
//the colour of the moods before selection
const defaultColour = '#E9E1E1';
//the user-selected colour that will be applied to the calendar later
let activeColour = ''; 

//set up variables for all interactive elements involved
const calendar = document.getElementById('calendar');
const moods = document.querySelectorAll('.mood');
const randomize = document.getElementById('randomBtn');
const clear = document.getElementById('clearBtn'); 

//below, we need to deal with onclick of the mood faces in the top menu
//if a user deselects a mood, we need to make sure they see that visually
//else we set the mood indicator back to how it appears usually
moods.forEach(mood => {
  mood.addEventListener('click', () => {
    if(mood.classList.contains('selected')){
      mood.classList.remove('selected');
      activeColour = defaultColour;
    } else{
      moods.forEach(mood => {
        mood.classList.remove('selected');
      });
      mood.classList.add('selected');
      activeColour = getComputedStyle(mood).getPropertyValue('color');
    }
  });
});

const getAllDays = year => {
  //set up the first and last days
  const firstDay = new Date(`January 1 ${year}`);
  const lastDay = new Date(`December 31 ${year}`);
 
  //set up the array with day one which is the only day in the array until we loop
  const daysofYear = [firstDay];
  //this is the last day until more days are added, but it changes in the loop (hence the let)
  let lastDayInArray = firstDay; 
  
  while(lastDayInArray.getTime() !== lastDay.getTime()){
    daysofYear.push(addDays(lastDayInArray, 1));
    lastDayInArray = daysofYear[daysofYear.length - 1];
  }
  
  return daysofYear;
};

const dates = getAllDays(currentYear);

let monthsHTML = '';

months.forEach((month, index) => {
  monthsHTML += `<div class="months month_${index}">
<h3>${month}</h3>
<div class="week_days_container">
${weekDays.map(day => `<div class="week_days">${day}</div>`).join('')}
</div>
<div class="days_container"></div>
</div>`;
});

calendar.innerHTML = monthsHTML;

dates.forEach(date => {
  const month = date.getMonth();
  const monthEl = document.querySelector(`.month_${month} .days_container`);
  
  if(date.getDate() === 1 && date.getDay() !== 0){
    for(let i = 0; i < date.getDay(); i++){
      const emptySpot = createEmptySpot();
      monthEl.appendChild(emptySpot);
    }
  }
  
  const dateEl = createDateEl(date);
  monthEl.appendChild(dateEl);
});


const circles = document.querySelectorAll('.circle');
circles.forEach(circle => {
  circle.addEventListener('click', () => {
    circle.style.backgroundColor = activeColour;
  });
});

randomize.addEventListener('click', () => {
  circles.forEach(circle => {
    circle.style.backgroundColor = getRandomColor();
  });
});

clear.addEventListener('click', () => {
  circles.forEach(circle => {
    circle.style.backgroundColor = defaultColour;
  });
});

function getRandomColor(){
  return colours[Math.floor(Math.random() * 5)];
}

function createDateEl(date){
  const day = date.getDate();
  const dateEl = document.createElement('div');
  dateEl.classList.add('days');
  dateEl.innerHTML = `<span class="circle">${day}</span>`;
  
  return dateEl;
}

function createEmptySpot(){
  const emptyEl = document.createElement('div');
  emptyEl.classList.add('days');
  
  return emptyEl;
}

function addDays(date, daysofYear){
  var result = new Date(date);
  result.setDate(result.getDate() + daysofYear);
  return result;
}





