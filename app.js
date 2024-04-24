let months = {
  1: 'January',
  2: 'February',
  3: 'March',
  4: 'April',
  5: 'May',
  6: 'June',
  7: 'July',
  8: 'August',
  9: 'September',
  10: 'October',
  11: 'November',
  12: 'December',
};


function setDate() {
  let $date = document.getElementById('date');
  let currentDate = new Date();
  let formattedDay = `${currentDate.getDate()}`;
  let formattedMonth = `${months[currentDate.getMonth() + 1]} `;
  let formattedYear = `${currentDate.getFullYear()}`;

  $date.innerHTML = `
    <div>${formattedDay}</div>
    <div>${formattedMonth}</div>
    <div>${formattedYear}</div>
  `;
}

function setDigits(container, digitNumber) {
  for (let digit = 1; digit <= digitNumber; digit++) {
    let $digit = document.createElement('div');
    for (let number = 0; number <= 9; number++) {
      let $number = document.createElement('div');
      $number.classList.add('number');
      $number.classList.add(number);
      $number.textContent = number;
      $digit.appendChild($number);
    }
    $digit.classList.add('digit');
    container.appendChild($digit);
  }
}

function setNumber(container, number) {
  let parsedNumber = number.toString().split('');
  let $digits = container.querySelectorAll('.digit');
  $digits.forEach((digit, index) => {
    let $number = digit.getElementsByClassName(parsedNumber[index])[0];
    if ($number.classList.contains("active")) return;
    let $numbers = digit.querySelectorAll('.number');
    $numbers.forEach((number) => {
      number.classList.remove('active');
    });

    $number.classList.add('active');

    let digitRect = digit.getBoundingClientRect();
    let numberRect = $number.getBoundingClientRect();

    digit.scrollTo({
      top: numberRect.top - digitRect.top,
      behavior: 'smooth',
    });
  });
}
function createClock() {
  let $hours = document.getElementById('hours');
  let $minutes = document.getElementById('minutes');
  let $seconds = document.getElementById('seconds');

  setDigits($hours, 2);
  setDigits($minutes, 2);
  setDigits($seconds, 2);
}

function setHour() {
  let $hour = document.getElementById('hours');
  let $minutes = document.getElementById('minutes');
  let $seconds = document.getElementById('seconds');

  let currentHour = new Date();
  let formattedHours = ('0' + currentHour.getHours()).slice(-2);
  let formattedMinutes = ('0' + currentHour.getMinutes()).slice(-2);
  let formattedSeconds = ('0' + currentHour.getSeconds()).slice(-2);

  setNumber($hour, formattedHours)
  setNumber($minutes, formattedMinutes)
  setNumber($seconds, formattedSeconds);

  console.log(formattedHours, formattedMinutes, formattedSeconds);
}

window.addEventListener('load', () => {
  setDate();
  createClock();
  setInterval(() => {
    setHour();
  }, 1000);
});
