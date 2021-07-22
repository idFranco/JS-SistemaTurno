
window.onload = function () {

    noBack();

    if (document.getElementById('txt')) {
        document.getElementById('txt').innerHTML = "<h1>Bienvenido al sistema de Gestión de Turnos</h1>";
    }

    if (document.getElementById('formLogin')) {

        LoadBootstrap();

    }

    if (document.getElementById('singUp')) {

        LoadBootstrap();
        
    }

    if (document.getElementById('table')) {
        
        document.getElementById('stylesheet').href = '/stylesheets/mStyle.css';

        let fecha = "2021-01-01";
        let val = document.getElementById("loadDate").innerHTML;
        if(val  != ''){
            fecha = document.getElementById("loadDate").innerHTML;
        }else{
            fecha = toDay();
        }        
       
        document.getElementById("calendar").value = fecha;
        document.getElementById("loadDate").style.visibility = 'hidden';

    }

    if (document.getElementById('listContainer')) {
        document.getElementById('stylesheet').href = '/stylesheets/mStyle.css';
    }

}

function LoadBootstrap() {

    document.getElementById('stylesheet').href = '/stylesheets/style.css';

    document.getElementById('bootstrapCSS').href = 'https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta3/dist/css/bootstrap.min.css';
    document.getElementById('bootstrapCSS').rel = 'stylesheet';
    document.getElementById('bootstrapCSS').integrity = 'sha384-eOJMYsd53ii+scO/bJGFsiCZc+5NDVN2yr8+0RDqr0Ql0h+rP48ckxlpbzKgwra6';

    document.getElementById('bootstrapIcono').rel = 'stylesheet';
    document.getElementById('bootstrapIcono').href = 'https://cdn.jsdelivr.net/npm/bootstrap-icons@1.4.1/font/bootstrap-icons.css';

    document.getElementById('script1').src = 'https://code.jquery.com/jquery-3.5.1.slim.min.js';
    document.getElementById('script1').integrity = 'sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj';

    document.getElementById('script2').src = 'https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/js/bootstrap.bundle.min.js';
    document.getElementById('script2').integrity = 'sha384-gtEjrD/SeCtmISkJkNUaaKMoLD0//ElJ19smozuHV6z3Iehds+3Ulb9Bn9Plx0x4';

    document.getElementById('script3').src = 'https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/js/bootstrap.min.js';
    document.getElementById('script3').integrity = 'sha384-OgVRvuATP1z7JjHLkuOU7Xw704+h835Lr+6QL9UvYjZE3Ipu6Tp75j7Bh/kR0JKI';

}

window.history.forward();

function noBack() {
    window.history.forward();
}

function toDay() {

    let date = new Date();

    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    let dateToDay;

    if (day < 10) {
        day = `0${day}`;
    };
    if (month < 10) {
        month = `0${month}`;
    }

    dateToDay = year + '-' + month + '-' + day;
    return dateToDay;

}

function create() {
    window.location.href = "/singup";
}

function principal() {
    window.location.href = '/';
}

function selectHour(){

    let name = document.getElementById("nameUser").innerHTML;

    $.ajax({
        url: '/selectHour',
        type: "POST",
        data: {nameUser: name}
      
      }).done(function(data){
         console.log("Error " + data);
      })

      window.location.href = "/lisths";

}

function horarioCompleto() {
    window.location.href = "/lHorario";
}

function cancel() {
    principal();
}


const botones = document.querySelectorAll(".selectItem");
let i;
const cuandoSeHaceClick = function cuandoSeHaceClick() {	
    this.style.borderColor = "blue";

    var sHorario = "";
    $(this).parents("tr").find(".colHs").each(function() {
        sHorario += $(this).html() + "\n";
      });

	tableAB(this.innerText, sHorario)
}
botones.forEach(boton => {
    boton.addEventListener("click", cuandoSeHaceClick);
});

function tableAB(txtButton, txtHorario){
   
    $.ajax({
        url: '/dataAB',
        type: "POST",
        data: {option:txtButton, hour: txtHorario}
      
      }).done(function(data){
         console.log("Error " + data);
      })

      window.location.href = "/lisths";

}