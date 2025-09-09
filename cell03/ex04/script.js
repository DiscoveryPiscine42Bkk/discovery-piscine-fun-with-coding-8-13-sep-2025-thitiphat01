$(function(){
    // ===== Background Changer =====
    $("#bgBtn").click(function(){
        let r = Math.floor(Math.random() * 255);
        let g = Math.floor(Math.random() * 255);
        let b = Math.floor(Math.random() * 255);
        $("body").css("background-color", `rgb(${r},${g},${b})`);
    });

    // ===== Balloon =====
    let colors = ["red","green","blue"];
    let colorIndex = 0;
    let w = 200, h = 200;

    $("#balloon").click(function(){
        colorIndex = (colorIndex+1) % colors.length;
        w += 10; h += 10;
        if(w > 420) { w = h = 200; }
        $(this).css({
            "background-color": colors[colorIndex],
            width: w+"px",
            height: h+"px"
        });
    }).mouseleave(function(){
        colorIndex = (colorIndex-1+colors.length) % colors.length;
        w -= 5; h -= 5;
        if(w < 200) { w = h = 200; }
        $(this).css({
            "background-color": colors[colorIndex],
            width: w+"px",
            height: h+"px"
        });
    });

    // ===== Calculator =====
    $("#calcForm").submit(function(e){
        e.preventDefault();
        let num1 = parseInt($("#left").val(), 10);
        let num2 = parseInt($("#right").val(), 10);
        let op = $("#operator").val();

        if(isNaN(num1) || isNaN(num2) || num1 < 0 || num2 < 0) {
            alert("Error :("); return;
        }
        if((op==="/" || op==="%") && num2===0) {
            alert("It's over 9000!"); console.log("It's over 9000!"); return;
        }
        let result;
        switch(op){
            case "+": result = num1+num2; break;
            case "-": result = num1-num2; break;
            case "*": result = num1*num2; break;
            case "/": result = num1/num2; break;
            case "%": result = num1%num2; break;
        }
        alert(result);
        console.log(result);
    });

    setInterval(()=>{ alert("Please, use me..."); }, 30000);

    // ===== To Do List =====
    function saveTodos(){
        let tasks = $("#ft_list div").map(function(){ return $(this).text(); }).get();
        localStorage.setItem("todos", JSON.stringify(tasks));
    }
    function loadTodos(){
        let tasks = JSON.parse(localStorage.getItem("todos")||"[]");
        tasks.forEach(t => addTodo(t,false));
    }
    function addTodo(text, toTop){
        let $todo = $("<div>").text(text).click(function(){
            if(confirm("Do you want to remove this TO DO?")){
                $(this).remove(); saveTodos();
            }
        });
        if(toTop && $("#ft_list div").length){
            $("#ft_list").prepend($todo);
        } else {
            $("#ft_list").append($todo);
        }
    }

    $("#newBtn").click(function(){
        let task = prompt("Enter new TO DO:");
        if(task && task.trim() !== ""){
            addTodo(task.trim(), true); saveTodos();
        }
    });

    loadTodos();
});
