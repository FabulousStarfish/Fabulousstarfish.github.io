var firebaseConfig = {
    apiKey: "AIzaSyBweuVUFZjU1u8AnBLKbI5R3SINR9sKlFM",
    authDomain: "yep-2020.firebaseapp.com",
    databaseURL: "https://yep-2020.firebaseio.com",
    projectId: "yep-2020",
    storageBucket: "yep-2020.appspot.com",
    messagingSenderId: "653623928823",
    appId: "1:653623928823:web:6679c1f971dc5cc59230f2"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  console.log(firebaseConfig);

 /*function create(){
  firebase.database().ref("/Tickets").child("DQNUFI99").update({    
      Status:'New',
      TicketNumber:'DQNUFI99'
  });
  console.log("created");
}
create(); */
/*window.onbeforeunload = function () {
  localTicketNumber=localStorage.getItem("TicketNumber");
    
    ticketRef.child(localTicketNumber).update({
      RemainingTime:distance
    });
};*/

function showElements(){
  if(localStorage.getItem("TicketNumber")===null){    
    document.getElementById("logout").style.visibility = "hidden";
    document.getElementById("timer").style.visibility = "hidden";    
  }
  else{    
    document.getElementById("logout").style.visibility = "visible";
    document.getElementById("timer").style.visibility = "visible";
  }
}
showElements();


var distance=0;

this.database = firebase.database();
ticketRef=this.database.ref('/Tickets');
hextrisRef=this.database.ref('/Hextris');
pacmanRef=this.database.ref('/PacMan');
twozerofoureightRef=this.database.ref('/TZFE');

var topTenHextris=this.database.ref("/Hextris").orderByChild("Score").limitToLast(40);

topTenHextris.once('value', function(snapshot){
    console.log("hello")
    if(snapshot.exists()){
        var content = '';
        let scoresAr=[];
        snapshot.forEach(function(data){
            var val = data.val();
            scoresAr.push(val);
        });
        scoresAr=scoresAr.reverse();
        scoresAr.forEach(function(val){
          content +='<tr>';
          content += '<td class="name_column">' + val.UserName + '</td>';
          content += '<td>' + mask(val.TicketNumber) + '</td>';
          content += '<td class="score_column">' + val.Score + '</td>';
          content += '</tr>';
        });
        $('#LeaderboardH').append(content);
    }
});

if(localStorage.getItem("TicketNumber")!=null){
  ticketNumber= localStorage.getItem("TicketNumber");
  firebase.database().ref(`Hextris/${ticketNumber}`).once("value",snapshotHUser =>{
    if(snapshotHUser.exists()){
      var name_footer=snapshotHUser.child("UserName").val();
      var score_footer=snapshotHUser.child("Score").val();
      var content = '';
      content +='<tfoot>';
      content += '<td class="name_footer">' + name_footer + '</td>';
      content += '<td class="ticket_footer">' + ticketNumber + '</td>';
      content += '<td class="score_footer">' + score_footer + '</td>';
      content += '</tfoot>';

    }
    $('#LeaderboardH').append(content);
  });
    
}

var topTenPacMan=this.database.ref("/PacMan").orderByChild("Score").limitToLast(40);

topTenPacMan.once('value', function(snapshot){
    console.log("hello")
    if(snapshot.exists()){
      var content = '';
      let scoresAr=[];
      snapshot.forEach(function(data){
          var val = data.val();
          scoresAr.push(val);
      });
      scoresAr=scoresAr.reverse();
      scoresAr.forEach(function(val){
        content +='<tr>';
        content += '<td class="name_column">' + val.UserName + '</td>';
        content += '<td>' + mask(val.TicketNumber) + '</td>';
        content += '<td class="score_column">' + val.Score + '</td>';
        content += '</tr>';
      });
      $('#LeaderboardP').append(content);
  }
});  

if(localStorage.getItem("TicketNumber")!=null){
  ticketNumber= localStorage.getItem("TicketNumber");
  firebase.database().ref(`PacMan/${ticketNumber}`).once("value",snapshotPUser =>{
    if(snapshotPUser.exists()){
      var name_footer=snapshotPUser.child("UserName").val();
      var score_footer=snapshotPUser.child("Score").val();
      var content = '';
      content +='<tfoot>';
      content += '<td class="name_footer">' + name_footer + '</td>';
      content += '<td class="ticket_footer" >' + ticketNumber + '</td>';
      content += '<td class="score_footer">' + score_footer + '</td>';
      content += '</tfoot>';

    }
    $('#LeaderboardP').append(content);
  });
    
}

var topTen2048=this.database.ref("/TZFE").orderByChild("Score").limitToLast(40);

topTen2048.once('value', function(snapshot){
    console.log("hello")
    if(snapshot.exists()){
      var content = '';
      let scoresAr=[];
      snapshot.forEach(function(data){
          var val = data.val();
          scoresAr.push(val);
      });
      scoresAr=scoresAr.reverse();
      scoresAr.forEach(function(val){
        content +='<tr>';
        content += '<td class="name_column">' + val.UserName + '</td>';
        content += '<td>' + mask(val.TicketNumber) + '</td>';
        content += '<td class="score_column">' + val.Score + '</td>';
        content += '</tr>';
      });
      $('#LeaderboardT').append(content);
  }
});  

if(localStorage.getItem("TicketNumber")!=null){
  ticketNumber= localStorage.getItem("TicketNumber");
  firebase.database().ref(`TZFE/${ticketNumber}`).once("value",snapshotTUser =>{
    if(snapshotTUser.exists()){
      var name_footer=snapshotTUser.child("UserName").val();
      var score_footer=snapshotTUser.child("Score").val();
      var content = '';
      content +='<tfoot>';
      content += '<td class="name_footer">' + name_footer + '</td>';
      content += '<td class="ticket_footer">' + ticketNumber + '</td>';
      content += '<td class="score_footer">' + score_footer + '</td>';
      content += '</tfoot>';

    }
    $('#LeaderboardT').append(content);
  });
    
}

function mask(input){
  /*let firstPart=input.slice(0,4);*/
  let maskChar='*';
  let maskedPart=maskChar.repeat(4);
  let maskedInput=maskedPart+input.slice(input.length-4);
  return maskedInput;
}

var prevScoreinDB=0;

  function login(){
    gameName=localStorage.getItem("gameName");
    ticketNumber=document.getElementById("ticketNumber").value.toUpperCase();  
    userName=document.getElementById("userName").value; 
    
    if(userName==""){      
      document.getElementById("error_text").innerHTML="Please Enter Your Name"  ;    
    }
    else{
      firebase.database().ref(`Tickets/${ticketNumber}/TicketNumber`).once("value", snapshot => {
      if (snapshot.exists()){
        firebase.database().ref(`Tickets/${ticketNumber}`).once("value",snapshotTickets =>{
          var user_status=snapshotTickets.child("Status").val();
       if(user_status!='Expired'){  
         if(user_status=='New'){   
         console.log("exists!");
         ticketRef.child(ticketNumber).set({
           TicketNumber: ticketNumber,
           UserName: userName,
           Status:'Started',
           RemainingTime:900000
         });
         hextrisRef.child(ticketNumber).set({
          TicketNumber: ticketNumber,
          UserName: userName,
          Score : 0
        });
        pacmanRef.child(ticketNumber).set({
          TicketNumber: ticketNumber,
          UserName: userName,
          Score : 0
        });
        twozerofoureightRef.child(ticketNumber).set({
          TicketNumber: ticketNumber,
          UserName: userName,
          Score : 0
        });
         console.log("Hello");
         var endTime = new Date().getTime() + 900000;
         localStorage.setItem("UserName",userName);
         localStorage.setItem("TicketNumber",ticketNumber);
         localStorage.setItem("EndTime",endTime);
        }
        else if(user_status='Started'){
          userName=snapshotTickets.child("UserName").val();
          var remaining_time=snapshotTickets.child("RemainingTime").val();
          console.log("Hello");
          var endTime = new Date().getTime() + remaining_time;
          localStorage.setItem("UserName",userName);
          localStorage.setItem("TicketNumber",ticketNumber);
          localStorage.setItem("EndTime",endTime);
        }
         document.getElementById("logout").style.visibility = "visible";
         if(gameName=='hextris')
         {


         firebase.database().ref(`Hextris/${ticketNumber}`).once("value", snapshotHextris => {
          if (snapshotHextris.exists())
          {
            prevScoreinDB=snapshotHextris.child("Score").val();
            //prevScoreinDB=555;
            var prevScoreArray="";
            prevScoreArray=prevScoreArray.concat("[",prevScoreinDB,"]");
            localStorage.setItem("highscores",prevScoreArray);
          } 
          else 
          {
            hextrisRef.child(ticketNumber).set({
            TicketNumber: ticketNumber,
            UserName: userName,
            Score : 0
          });
          }
         });

         window.location="/hextris/index.html";
        }
        else if(gameName=='pacman')
        {


        firebase.database().ref(`PacMan/${ticketNumber}`).once("value", snapshotPacMan => {
         if (snapshotPacMan.exists())
         {
           var prevScoreinDB=snapshotPacMan.child("Score").val();
           localStorage.setItem("previousHighScore",prevScoreinDB);
         } 
         else 
         {
           pacmanRef.child(ticketNumber).set({
           TicketNumber: ticketNumber,
           UserName: userName,
           Score : 0
         });
         }
        });

        window.location="/pacman-canvas-master/index.htm";
       } 
         else if(gameName=='2048')
        {

          firebase.database().ref(`TZFE/${ticketNumber}`).once("value", snapshot2048 => {
            if (snapshot2048.exists())
            {
              prevScoreinDB=snapshot2048.child("Score").val();
              localStorage.setItem("highestScore",prevScoreinDB);
            } 
            else 
            {
              twozerofoureightRef.child(ticketNumber).set({
              TicketNumber: ticketNumber,
              UserName: userName,
              Score : 0
            });
            }
           });

          window.location="/2048-master/index.html";
        }    
         console.log(gameName);
        }
        else{
          // document.getElementById("error_text").innerHTML="Expired Ticket";
          userName=snapshotTickets.child("UserName").val();
          var remaining_time=snapshotTickets.child("RemainingTime").val();
          var endTime = new Date().getTime() + remaining_time;
          localStorage.setItem("UserName",userName);
          localStorage.setItem("TicketNumber",ticketNumber);
          localStorage.setItem("EndTime",endTime);
          document.getElementById("logout").style.visibility = "visible";
          window.location="/games.html";
        }});
      }
      else{
        document.getElementById("error_text").innerHTML="Invalid Ticket";
      }
   });

    }
    }
function openForm(game) 
{
  distance = endDate - now;
  ticketNumber=localStorage.getItem('TicketNumber');
  firebase.database().ref(`Tickets/${ticketNumber}/TicketNumber`).once("value", snapshot => 
  {
    if (snapshot.exists() && distance > 0)
     {      
      localStorage.setItem("gameName",game);

      if(game=='hextris')
      {
        firebase.database().ref(`Hextris/${ticketNumber}`).once("value", snapshotHextris => {
          if (snapshotHextris.exists())
          {
            prevScoreinDB=snapshotHextris.child("Score").val();
            //prevScoreinDB=555;
            var prevScoreArray="";
            prevScoreArray=prevScoreArray.concat("[",prevScoreinDB,"]");
            localStorage.setItem("highscores",prevScoreArray);
          } 
          else 
          {
            hextrisRef.child(ticketNumber).set({
            TicketNumber: ticketNumber,
            UserName: userName,
            Score : 0
          });
          }
         });

        window.location="/hextris/index.html";
      }
      else if(game=='pacman')
      {
        firebase.database().ref(`PacMan/${ticketNumber}`).once("value", snapshotPacMan => {

					if (snapshotPacMan.exists())
					{
					  prevScoreinDB=snapshotPacMan.child("Score").val();
            localStorage.setItem("previousHighScore",prevScoreinDB);
          } 
          else 
          {
            pacmanRef.child(ticketNumber).set({
            TicketNumber: ticketNumber,
            UserName: userName,
            Score : 0
          });
          }
         });

        window.location="/pacman-canvas-master/index.htm";
      }   
      else if(game=='2048')
      {
        firebase.database().ref(`TZFE/${ticketNumber}`).once("value", snapshot2048 => {
          if (snapshot2048.exists())
          {
            prevScoreinDB=snapshot2048.child("Score").val();
            localStorage.setItem("highestScore",prevScoreinDB);
          } 
          else 
          {
            twozerofoureightRef.child(ticketNumber).set({
            TicketNumber: ticketNumber,
            UserName: userName,
            Score : 0
          });
          }
         });

        window.location="/2048-master/index.html";
       }
    }
    else if (snapshot.exists() && distance <= 0)
    {
      document.getElementById("myForm").style.display = "none";
      window.alert("Your ticket code has expired");
//      window.location="/games.html";
//      localStorage.setItem("gameName",game);
    }
    else
    {
      document.getElementById("myForm").style.display = "block";
      localStorage.setItem("gameName",game);
    };
  });
}
 
var now=0;

function closeForm() {
  document.getElementById("myForm").style.display = "none";
}

/*function login(){
  gameName=localStorage.getItem("Game_Name");

  firebase.database().ref("/Tickets/").push({
    Ticket_Number:ticketCode,
    Name:name_of_user,
    Status:'Playing'
  });
  console.log("Hello");
  if(gameName='hextris'){
    window.location="/hextris/index.html";
  }
  else if(gameName='pacman'){
    window.location="faqs.html";
  };
  console.log(gameName);

}*/

// Set the date we're counting down to
var endDate = localStorage.getItem("EndTime");

// Update the count down every 1 second
var x = setInterval(function() 
{

  // Get today's date and time
  now = new Date().getTime();
    
  // Find the distance between now and the count down date
  distance = endDate - now;
    
  // Time calculations for days, hours, minutes and seconds
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
  // Output the result in an element with id="demo"
  document.getElementById("timer").innerHTML = minutes + "m " + seconds + "s ";
    
  // If the count down is over, write some text 
  if (distance < 0) 
  {
    clearInterval(x);
    document.getElementById("timer").innerHTML = "EXPIRED";
    localTicketNumber=localStorage.getItem("TicketNumber");
    
    ticketRef.child(localTicketNumber).update({
      Status:'Expired',
      RemainingTime:0
    });
    /*localStorage.clear("TicketNumber");
    localStorage.clear("UserName");*/
  }
}, 1000);



function logout(){
  localTicketNumber=localStorage.getItem("TicketNumber");
    
    ticketRef.child(localTicketNumber).update({
      RemainingTime:distance
    });
  localStorage.clear("TicketNumber");
  localStorage.clear("UserName");
  document.getElementById("logout").style.visibility = "hidden";
  document.getElementById("timer").style.visibility = "hidden";
  window.location="/index.html";
}

var modalH = document.getElementById("myModalH");

// Get the button that opens the modal
var btnH = document.getElementById("myBtnH");

// Get the <span> element that closes the modal
var spanH = document.getElementsByClassName("closeH")[0];

// When the user clicks the button, open the modal 
btnH.onclick = function() {
  modalH.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
spanH.onclick = function() {
  modalH.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modalH) {
    modalH.style.display = "none";
  }
}

var modalP = document.getElementById("myModalP");

// Get the button that opens the modal
var btnP = document.getElementById("myBtnP");

// Get the <span> element that closes the modal
var spanP = document.getElementsByClassName("closeP")[0];

// When the user clicks the button, open the modal 
btnP.onclick = function() {
  modalP.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
spanP.onclick = function() {
  modalP.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modalP) {
    modalP.style.display = "none";
  }
}

var modal = document.getElementById("myModalT");

// Get the button that opens the modal
var btn = document.getElementById("myBtnT");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("closeT")[0];

// When the user clicks the button, open the modal 
btn.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}