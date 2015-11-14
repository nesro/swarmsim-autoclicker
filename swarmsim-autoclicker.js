/*
    https://github.com/nesro/swarmsim-autoclicker
    
    README:
      THIS SCRIPT IS NOT MANIPULATING WITH THE GAME DATA IN ANY WAY.
      IT ONLY SIMULATES MOUSE CLICKS.
      
    version 0 (I'm wainting for energy to test this script)
*/

/******************************************************************************/

function delayed_loop_territory_units(i, to, delay) {
  console.log("delayed_loop: i="+i+",to="+to+", delay="+delay);
  console.log(document.getElementsByClassName("unit-sidebar")[i].href);
  
  window.location=document.getElementsByClassName("unit-sidebar")[i].href;
 
  document.getElementsByClassName("btn-default")[2].click();
  document.getElementsByClassName("btn-default")[1].click();
  document.getElementsByClassName("btn-default")[0].click();
  
  if ((i + 1) < to) {
    setTimeout(function(){delayed_loop(i + 1, to, delay)}, delay);
  } else {
    console.log("### territory_units: END ####");
  } 
}

function territory_units() {
  window.location="#/tab/territory/unit/swarmling";
  units = document.getElementsByClassName("unit-sidebar").length - 1;
  delayed_loop_territory_units(0, units, 10 * 1000);
}
//territory_units();

/******************************************************************************/

function larvae_upgrades() {
  window.location="#/tab/larva/unit/larva";
  len = document.getElementsByClassName("btn-default").length;
  /* skip uncocoon */
  for (var j = 3; j < len; j++) {
    if (document.getElementsByClassName("btn-default")[j]) {    
      if (document.getElementsByClassName("btn-default")[j].hasAttribute("ng-click") ) {
        console.log(document.getElementsByClassName("btn-default")[j]);
        document.getElementsByClassName("btn-default")[j].click();
      }
    }
  }
}
//larvae_upgrades();

/******************************************************************************/

function buy_upgrades() {
  angular.element($0).scope().buyUpgrades(angular.element($0).scope().game.availableAutobuyUpgrades(0.25), 0.25);
}
//buy_upgrades();

/******************************************************************************/

function cocoon() {
  window.location="#/tab/larva/unit/cocoon";
  document.getElementsByClassName("btn-default")[2].click();
}
//cocoon();

/******************************************************************************/

function delayed_loop_meat_units(i, to, delay) {
  console.log("delayed_loop_meat_units: i="+i+",to="+to+", delay="+delay);
  console.log(document.getElementsByClassName("unit-sidebar")[i].href);
  
  window.location=document.getElementsByClassName("unit-sidebar")[i].href;
 
  /* don't buy it, if it will cost 100% of our larvae */
  var is100p = false;
  var len = document.getElementsByClassName("ng-binding").length;
  for (i = 0; i < len; i++) {
    console.log(document.getElementsByClassName("ng-binding")[i].innerHTML);
    if (document.getElementsByClassName("ng-binding")[i].innerHTML == "100% of your larva income") {
      is100p = true;
      break;
    }
  }
  //console.log(is100p);  
 
  if (!is100p) {
    document.getElementsByClassName("btn-default")[2].click();
  }
  
  buy_upgrades();
  
  /* if this cost 100%, the next unit will too */
  if (!is100p && (i + 1) < to) {
    setTimeout(function(){delayed_loop(i + 1, to, delay)}, delay);
  } else {
    console.log("### meat_units: END ####");
  } 
}

function meat_units() {
  window.location="#/tab/meat/unit/drone";
  units = document.getElementsByClassName("unit-sidebar").length - 1;
  delayed_loop_territory_units(0, units, 5 * 1000);
}
//meat_units();

/******************************************************************************/

function warp() {
  window.location="#/tab/energy/unit/energy";
  if(document.getElementsByClassName("btn-default")[0]) {
    document.getElementsByClassName("btn-default")[0].click();
    return true;
  } else {
    return false;
  }
}
//warp();

/******************************************************************************/

for (;;) {
  /* larvae are expensive, don't spend nothing we can generate in seonds */
  cocoon();
  
  buy_upgrades();
  
  /* FIXME: thus must be called this twice */
  larvae_upgrades();
  larvae_upgrades();
  
  meat_units();
  territory_units();
  
  if(!warp()) {
    break;
  }
}



