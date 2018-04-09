/** Check scroll position for header type */
function CheckScroll() {
  if ( $(window).scrollTop() > 1000 ) {
    $('#header').addClass('header--small');
  } else {
    $('#header').removeClass('header--small');
  }
}

function CheckHelpRange(inputRange) {
  const value = inputRange.value/10;

  inputRange.style.background = 'linear-gradient(to right, #62909E 0%, #62909E '+ value + '%, rgba(255, 255, 255, 0.8) '+ value +'%, rgba(255, 255, 255, 0.8) 100%)';

  const pandas = $('#pandas').find('svg');

  if (value < 30) {
    pandas.eq(0).removeClass('display-none');
    pandas.eq(1).addClass('display-none');
    pandas.eq(2).addClass('display-none');
  }

  if (value >= 30 && value < 60) {
    pandas.eq(0).addClass('display-none');
    pandas.eq(1).removeClass('display-none');
    pandas.eq(2).addClass('display-none');
  }

  if (value >= 60) {
    pandas.eq(0).addClass('display-none');
    pandas.eq(1).addClass('display-none');
    pandas.eq(2).removeClass('display-none');
  }
}

/** Help range value changed */
$('#inputRange').on('input', function() {
  CheckHelpRange(this);
});

$(window).scroll(CheckScroll);

$(document).ready(function() {
  const inputRange = document.getElementById('inputRange');

  CheckHelpRange(inputRange);
  CheckScroll();
});
