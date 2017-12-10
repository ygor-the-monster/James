var monthName = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
var selected;

function markDone(evt) {
  var today = new Date();

  selected.setHours(0,0,0,0);
  today.setHours(0,0,0,0);
  if(today > selected) {

  } else {
    var tasks = JSON.parse(localStorage.getItem(selected.getFullYear() + '-' + (selected.getMonth() + 1) + '-' + selected.getDate()));
    if(tasks) {
      tasks[evt.target.dataset.id].done = !tasks[evt.target.dataset.id].done;
    }

    localStorage.setItem(selected.getFullYear() + '-' + (selected.getMonth() + 1) + '-' + selected.getDate(), JSON.stringify(tasks));
    setSelectedDate(selected.getFullYear() + '-' + (selected.getMonth() + 1) + '-' + selected.getDate());
  }
}

function setSelectedDate(date) {
  selected = new Date(date);
  selected.setDate(selected.getDate() + 1);
  date = new Date(selected.getTime());

  var today = new Date();

  selected.setHours(0,0,0,0);
  today.setHours(0,0,0,0);

  date.setDate(1);
  while (date.getDay() != 0) {
    date.setDate(date.getDate() - 1);
  }

  var elems = document.querySelectorAll('td');
  for (var i = 0; i < elems.length; i++) {
    elems[i].dataset.date = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
    elems[i].innerText = date.getDate();
    elems[i].className = '';

    if(selected.getMonth() != date.getMonth()){
      elems[i].classList.add('othermonth');
    }

    if(selected.getMonth() == date.getMonth() && selected.getDate() == date.getDate()){
      elems[i].classList.add('selected');
    }

    if(today.getMonth() == date.getMonth() && today.getDate() == date.getDate()){
      elems[i].classList.add('today');
    }

    date.setDate(date.getDate() + 1);
  }

  document.querySelector('header h3').innerText = monthName[selected.getMonth()];
  document.querySelector('#todoList h4').innerText = selected.getDate() + ' de ' + monthName[selected.getMonth()] + " de " + selected.getFullYear();

  document.querySelector('#todoList ul').innerHTML = '';

  var t = localStorage.getItem(selected.getFullYear() + '-' + (selected.getMonth() + 1) + '-' + selected.getDate()) || "[]";
  var tasks = JSON.parse(t);
  if(tasks){
    for (var i = 0; i < tasks.length; i++) {
      var li = document.createElement('li');
      li.className = 'pure-g';

      var icon = document.createElement('i');
      icon.className = 'typcn pure-u-1-5 typcn-' + (tasks[i].done? 'tick' : today > selected ? 'times' : 'minus') + '-outline'
      icon.onclick = markDone;
      icon.dataset.id = i;
      li.appendChild(icon);

      var div = document.createElement('div');
      div.className = 'pure-u-4-5';

      var name = document.createElement('p');
      name.innerText = tasks[i].nome;
      div.appendChild(name);

      var hor = document.createElement('p');
      hor.innerText = tasks[i].horario[0] + ':00 ~ ' + tasks[i].horario[1] + ':00';
      div.appendChild(hor);

      li.appendChild(div);
      document.querySelector('#todoList ul').appendChild(li);
    }
  }
}

function showPopUp() {
  document.getElementById('popup').style.display = 'flex';
}

function hidePopUp() {
  document.getElementById('popup').style.display = 'none';
}

function selectType() {
  document.getElementById('simples').style.display = 'none';
  document.getElementById('recorrente').style.display = 'none';
  document.getElementById('auto').style.display = 'none';

  switch (document.querySelector('input[name="type"]:checked').value) {
    case 'tarefa_simples':
      document.getElementById('simples').style.display = 'block';
      break;
    case 'tarefa_recorrente':
      document.getElementById('recorrente').style.display = 'block';
      break;
    case 'tarefa_automatica':
      document.getElementById('auto').style.display = 'block';
      break;
  }
}

function createTask(name, datetime, type) {
  selected = new Date(datetime.getTime());
  selected.setHours(0, 0, 0, 0);

  var t = localStorage.getItem(selected.getFullYear() + '-' + (selected.getMonth() + 1) + '-' + selected.getDate()) || "[]";
  var tasks = JSON.parse(t) || [];

  tasks.push({nome:name, horario: [datetime.getHours(), datetime.getMinutes()], done: false});

  localStorage.setItem(selected.getFullYear() + '-' + (selected.getMonth() + 1) + '-' + selected.getDate(), JSON.stringify(tasks));
  setSelectedDate(selected.getFullYear() + '-' + (selected.getMonth() + 1) + '-' + selected.getDate());
}
