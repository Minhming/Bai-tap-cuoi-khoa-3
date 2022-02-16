// Js phan dang nhap dang ki
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.6/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.6.6/firebase-analytics.js"; 
import { getDatabase, set, ref, update } from "https://www.gstatic.com/firebasejs/9.6.6/firebase-database.js"; 
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.6.6/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyDFkDsU-4DgxfhA6KH7wam6JBkA9TWSwjQ",
  authDomain: "spck-91d1c.firebaseapp.com",
  databaseURL: "https://spck-91d1c-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "spck-91d1c",
  storageBucket: "spck-91d1c.appspot.com",
  messagingSenderId: "849032213297",
  appId: "1:849032213297:web:a5307671ac45d666817610",
  measurementId: "G-668Q72GFTR"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const database = getDatabase(app)
const auth = getAuth();

let signUp = document.getElementById("sign-up");

signUp.addEventListener('click',(e) => {
  var email = document.getElementById('email').value;
  var password = document.getElementById('password').value;
  var fname = document.getElementById('first-name').value;
  var lname = document.getElementById('last-name').value;

  createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    const user = userCredential.user;

    set(ref(database, 'user/' + user.uid), {
      fname: fname,
      lname: lname,
      email: email,
      password: password,
    })

    alert('Đã tạo người dùng!')
    window.location.href = "#";
  })

  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    alert(errorMessage);
  });
});

// Js phan section
$("section").click(function(){
	$(this).toggleClass("on");
});

let antitap = document.querySelector("div.form");
antitap.addEventListener("click", atFunction);

function atFunction() {
	antitap.classList.add("on");
}
// Jquery cua sign in log in 
$('.form').find('input, textarea').on('keyup blur focus', function (e) {
  var $this = $(this),
      label = $this.prev('label');

	  if (e.type === 'keyup') {
			if ($this.val() === '') {
          label.removeClass('active highlight');
        } else {
          label.addClass('active highlight');
        }
    } else if (e.type === 'blur') {
    	if( $this.val() === '' ) {
    		label.removeClass('active highlight'); 
		} else {
		    label.removeClass('highlight');   
		}   
    } else if (e.type === 'focus') {
      
      if( $this.val() === '' ) {
    		label.removeClass('highlight'); 
		} else if( $this.val() !== '' ) {
		    label.addClass('highlight');
		}
    }
});

$('.tab a').on('click', function (e) {
  
  e.preventDefault();
  
  $(this).parent().addClass('active');
  $(this).parent().siblings().removeClass('active');
  
  target = $(this).attr('href');

  $('.tab-content > div').not(target).hide();
  
  $(target).fadeIn(600);
  
});

// Phan js cua anh tap the
var gallery = document.querySelector('.gallery');
var galleryItems = document.querySelectorAll('.gallery-item');
var numOfItems = gallery.children.length;
var itemWidth = 23; // percent: as set in css

var featured = document.querySelector('.featured-item');

var leftBtn = document.querySelector('.move-btn.left');
var rightBtn = document.querySelector('.move-btn.right');
var leftInterval;
var rightInterval;

var scrollRate = 0.1;
var left;

function selectItem(e) {
	if (e.target.classList.contains('active')) return;
	
	featured.style.backgroundImage = e.target.style.backgroundImage;
	
	for (var i = 0; i < galleryItems.length; i++) {
		if (galleryItems[i].classList.contains('active'))
			galleryItems[i].classList.remove('active');
	}
	
	e.target.classList.add('active');
}

function galleryWrapLeft() {
	var first = gallery.children[0];
	gallery.removeChild(first);
	gallery.style.left = -itemWidth + '%';
	gallery.appendChild(first);
	gallery.style.left = '0%';
}

function galleryWrapRight() {
	var last = gallery.children[gallery.children.length - 1];
	gallery.removeChild(last);
	gallery.insertBefore(last, gallery.children[0]);
	gallery.style.left = '-23%';
}

function moveLeft() {
	left = left || 0;

	leftInterval = setInterval(function() {
		gallery.style.left = left + '%';

		if (left > -itemWidth) {
			left -= scrollRate;
		} else {
			left = 0;
			galleryWrapLeft();
		}
	}, 1);
}

function moveRight() {
	//Make sure there is element to the leftd
	if (left > -itemWidth && left < 0) {
		left = left  - itemWidth;
		
		var last = gallery.children[gallery.children.length - 1];
		gallery.removeChild(last);
		gallery.style.left = left + '%';
		gallery.insertBefore(last, gallery.children[0]);	
	}
	
	left = left || 0;

	leftInterval = setInterval(function() {
		gallery.style.left = left + '%';

		if (left < 0) {
			left += scrollRate;
		} else {
			left = -itemWidth;
			galleryWrapRight();
		}
	}, 1);
}

function stopMovement() {
	clearInterval(leftInterval);
	clearInterval(rightInterval);
}

leftBtn.addEventListener('mouseenter', moveLeft);
leftBtn.addEventListener('mouseleave', stopMovement);
rightBtn.addEventListener('mouseenter', moveRight);
rightBtn.addEventListener('mouseleave', stopMovement);


//Start this baby up
(function init() {
	var images = [
		'https://s3-us-west-2.amazonaws.com/forconcepting/800Wide50Quality/car.jpg',
		'https://s3-us-west-2.amazonaws.com/forconcepting/800Wide50Quality/city.jpg',
		'https://s3-us-west-2.amazonaws.com/forconcepting/800Wide50Quality/deer.jpg',
		'https://s3-us-west-2.amazonaws.com/forconcepting/800Wide50Quality/flowers.jpg',
		'https://s3-us-west-2.amazonaws.com/forconcepting/800Wide50Quality/food.jpg',
		'https://s3-us-west-2.amazonaws.com/forconcepting/800Wide50Quality/guy.jpg',
		'https://s3-us-west-2.amazonaws.com/forconcepting/800Wide50Quality/landscape.jpg',
		'https://s3-us-west-2.amazonaws.com/forconcepting/800Wide50Quality/lips.jpg',
		'https://s3-us-west-2.amazonaws.com/forconcepting/800Wide50Quality/night.jpg',
		'https://s3-us-west-2.amazonaws.com/forconcepting/800Wide50Quality/table.jpg'
	];
	
	//Set Initial Featured Image
	featured.style.backgroundImage = 'url(' + images[0] + ')';
	
	//Set Images for Gallery and Add Event Listeners
	for (var i = 0; i < galleryItems.length; i++) {
		galleryItems[i].style.backgroundImage = 'url(' + images[i] + ')';
		galleryItems[i].addEventListener('click', selectItem);
	}
})();