var objJson;
var obj, dbParam, x, txt = "";
var info = document.getElementById("info");
var el = document.getElementsByClassName("num");
var authorList = document.getElementsByClassName("author");
var nextPage;
var prevPage;
var myObj;
var current_page = 1;
var records_per_page = 20;


function loadPictures() {

    document.getElementById("loader").style.display = "block";
    
    var xmlhttp = new XMLHttpRequest();
    var url = "https://unsplash.it/list";
    dbParam = JSON.stringify(obj);

    
    xmlhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            objJson = JSON.parse(this.responseText); //JSON.parse - разбирает строку JSON, responseText - текст ответа
            objJson.reverse();
            addNums(objJson);
            showPage(objJson);
            dropDownAuthors(objJson);
            console.log(objJson);
            
            document.getElementById("btnloading").style.display = "none";
            document.getElementById("loader").style.display = "none";
            document.getElementById("aside").style.display = "block";
            document.getElementById("bottom").style.display = "block";
//        setTimeout(function(){
//         document.getElementById('loader').style.display="none";
//      },700);

        }  else {
                console.log('Error: ' + this.status);
            }
  };

    xmlhttp.open("GET", url, true); //конфигурация 
    xmlhttp.send("x=" + dbParam); //отсылаем запрос
   
};


function dropDownAuthors(author) {
    obj = { "table":"customers", "limit":20 };
    
    // dropdown-список авторов
    myObj = getUniqTags(author);
    txt += "<i class='fa fa-caret-down' aria hidden='true'></i><select id='mySelect' class='author' onchange='filterByName()'>"
        for (x in myObj) {
            txt += "<option value='" + myObj[x] + "'>" + myObj[x];
        }
        txt += "</select>"
        info.innerHTML = txt;
    // end dropdown-список авторов
    
    //Оставить уникальные элементы массива - авторов
    function getUniqTags(tags) {
        var results = [];
        var outAside = "";

        tags.forEach(function (author, value) {

            if (results.indexOf(author.author) === -1) {
                results.push(author.author);
            }
        });
        return results;
    };      
};


// добавить фото при загрузке или фильтр.
function addNums(pictur) {
        var out = "";
        var i;
    if ( pictur.length < 20 ) {
        for(i = 0; i < pictur.length; i++) {
            out += '<li class="num"><a class="lightbox" href="#' + pictur[i].filename + '"><img src="https://unsplash.it/' + pictur[i].filename + '" alt="author ' + pictur[i].author + '"/></a><div class="lightbox-target" id="' + pictur[i].filename + '"><img src="https://unsplash.it/' + pictur[i].filename + '" alt="author ' + pictur[i].author + '"/><a class="lightbox-close" href="#"></a></div></li>';
        }
    } else {
        for(i = 0; i < 20; i++) {
            out += '<li class="num"><a class="lightbox" href="#' + pictur[i].filename + '"><img src="https://unsplash.it/' + pictur[i].filename + '" alt="author ' + pictur[i].author + '"/></a><div class="lightbox-target" id="' + pictur[i].filename + '"><img src="https://unsplash.it/' + pictur[i].filename + '" alt="author ' + pictur[i].author + '"/><a class="lightbox-close" href="#"></a></div></li>';
        }
    }
        document.getElementById("listingTable").innerHTML = out;
};


function showPage(cam) {
    
    function changePage(page) {
        var btn_next = document.getElementById("btn_next");
        var btn_prev = document.getElementById("btn_prev");
        var listing_table = document.getElementById("listingTable");
        var page_span = document.getElementById("page");

        if (page < 1) page = 1;
        if (page > numPages()) page = numPages();

        listing_table.innerHTML = "";

        for (var i = (page-1) * records_per_page; i < (page * records_per_page) && i < cam.length; i++) {
            listing_table.innerHTML += '<li class="num"><a class="lightbox" href="#' + cam[i].filename + '"><img src="https://unsplash.it/' + cam[i].filename + '" alt="author ' + cam[i].author + '"/></a><div class="lightbox-target" id="' + cam[i].filename + '"><img src="https://unsplash.it/' + cam[i].filename + '" alt="author ' + cam[i].author + '"/><a class="lightbox-close" href="#"></a></div></li>';
        }
        page_span.innerHTML = page + "/" + numPages();

        (function (){if (page == 1) {
            btn_prev.style.visibility = "hidden";
        } else {
            btn_prev.style.visibility = "visible";
        }

        if (page == numPages()) {
            btn_next.style.visibility = "hidden";
        } else {
            btn_next.style.visibility = "visible";
        }})()
    };

    function numPages() {
        return Math.ceil( cam.length / records_per_page ); //Math.ceil() возвращает наименьшее целое число, большее, либо равное указанному числу
    };


    prevPage = function prevPage() {
        if (current_page > 1) {
            current_page--;
            changePage(current_page);
        }
    };

    nextPage = function nextPage() {
        if (current_page < numPages()) {
            current_page++;
            changePage(current_page);
        }
    };

    window.onload = function() {
        changePage(1);
    };
    
    document.getElementById("page").innerHTML = 1 + "/" + numPages();
    
};

function deleteNums() {
    while(el[0]) {
        el[0].parentNode.removeChild(el[0]);
    }
//    while(authorList[0]) {
//        authorList[0].parentNode.removeChild(authorList[0]);
//    };   
};


function large() {
    var bigImg = objJson.filter(function(anim) {
        return anim.width >= 1500;
    });
    deleteNums();
    console.log( bigImg );      
    addNums(bigImg);
    showPage(bigImg);
//    dropDownAuthors(bigImg);

};


function medium() {
    var medImg = objJson.filter(function(anim) {
        if (( anim.width <= 1499 ) && ( anim.width >= 800  )) {
            
        return anim;
        }
    });
    deleteNums();
    console.log( medImg );      
    addNums(medImg);
    showPage(medImg);
//    dropDownAuthors(medImg);

};


function small() {
    var smallImg = objJson.filter(function(anim) {
        return anim.width <= 799;
    });
    deleteNums();
    console.log( smallImg );      
    addNums(smallImg);
    showPage(smallImg);
//    dropDownAuthors(smallImg);

};



function filterByName() {
var xaxa = document.getElementById("mySelect").value;
    var filterImg = objJson.filter(function(anim) {
        return anim.author === xaxa;
    });
    deleteNums();
    console.log( filterImg );      
    showPage(filterImg);
    addNums(filterImg);
//    dropDownAuthors(smallImg);

};

// показать при скроле    - первый вариант прокрутки наверх
//var lastScrollTop = 0;
//
//window.addEventListener("scroll", function(){  
//   var st = window.pageYOffset || document.documentElement.scrollTop;  
//   if (st < lastScrollTop){
//       document.getElementById("bottomup").style.bottom = "-10%";
//   } else {
//      document.getElementById("bottomup").style.bottom = "0";
//   }
//   lastScrollTop = st;
//}, false);

// скрол на верх второй вариант
function up() {
    var e = Math.max(document.body.scrollTop, document.documentElement.scrollTop);
    return e > 0 ? (window.scrollBy(0, (e + 100) / -10), t = setTimeout("up()", 20)) : clearTimeout(t), !1;
}
window.onscroll = function myScroll() {
    var toTop = document.getElementById("bottomup");
   (document.body.scrollTop > 0 || document.documentElement.scrollTop > 0) ? toTop.style.display='block' : toTop.removeAttribute('style');
};