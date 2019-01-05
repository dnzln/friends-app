const MAIN_CONTAINER = document.getElementById('main-content');
const MAIL_INPUT = document.querySelector('input[value=male]');
const FEMAIL_INPUT = document.querySelector('input[value=female]');
const FILTERS = document.querySelector('.filters');
var usersArray = [];

fetch('https://randomuser.me/api/?results=36')
    .then( response => {response.json()
    .then( data => {
        usersArray = data.results
        printingUsers(usersArray)
	})
    });

function printingUsers(usersArray, gender) {
    MAIN_CONTAINER.innerHTML = '';
    let fragment = document.createDocumentFragment();
    usersArray.forEach(
        function(user) {
            if(FEMAIL_INPUT.checked) gender = 'female';
            if(MAIL_INPUT.checked) gender = 'male';

            if(gender == 'female') {    
                if(user.gender == 'female') return;
            } else if (gender == 'male') {
                if(user.gender == 'male') return;
            }

            let block = document.createElement('div');
            block.classList.add('blocks');
            fragment.appendChild(block);

            let card = document.createElement('div');
            card.classList.add('user-card');
            block.appendChild(card);
            
            let userImage = document.createElement('img');
            userImage.classList.add('user-pic');
            userImage.setAttribute('src', user.picture.large);
            card.appendChild(userImage);
            
            let userName = document.createElement('p');
            userName.classList.add('user-name');
            userName.innerHTML = `${user.name.first} ${user.name.last}`;
            card.appendChild(userName);

            let userData = document.createElement('p');
            userData.classList.add('user-data');
            userData.innerHTML = `<strong>${user.dob.age}</strong>, from ${user.location.city}`;
            card.appendChild(userData);
            
            let userPhone = document.createElement('p');
            userPhone.classList.add('user-phone');
            userPhone.innerHTML = user.phone;
            card.appendChild(userPhone);
        }
    );
    MAIN_CONTAINER.appendChild(fragment);
}

FILTERS.addEventListener('click', function () {
    switch(event.target.value) {
        case 'all': printingUsers(usersArray); break; 
        case 'male': printingUsers(usersArray, 'male'); break;   
        case 'female': printingUsers(usersArray, 'female'); break;            
        case 'age-down':
            usersArray.sort(function(a, b){return a.dob.age-b.dob.age})
            printingUsers(usersArray.reverse()); break;           
        case 'age-up':
            usersArray.sort(function(a, b){return a.dob.age-b.dob.age})
            printingUsers(usersArray); break;
        case 'name-down':
            usersArray = sortName(usersArray);
            printingUsers(usersArray); break;
        case 'name-up':
            usersArray = sortName(usersArray);
            printingUsers(usersArray.reverse()); break;
    }
    }
);


function sortName(usersArray) {
    usersArray.sort(function(a, b){
        let nameA = a.name.first.toLowerCase(), nameB = b.name.first.toLowerCase();
        if (nameA < nameB) return -1;
        if (nameA > nameB) return 1;
        return 0;
    });
    return usersArray;
}