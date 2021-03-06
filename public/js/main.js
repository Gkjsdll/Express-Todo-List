"use strict";

var $taskAdder, $taskDay, $taskMonth, $taskYear, $taskInfo, $tasks;

$(document).ready(init);

function init(){
  $taskAdder = $('#taskAdder');
  $taskDay = $('#taskDay');
  $taskMonth = $('#taskMonth');
  $taskYear = $('#taskYear');
  $taskInfo = $('#taskInfo');
  $tasks = $('#tasks');
  $tasks.on("dblclick", ".task", promptDeleteTask);
  $tasks.on("click", ".taskComplete", toggleComplete);
  $taskAdder.submit(addTask);
  popTasks();
  swal("To delete a task:", "Double-click on it", "success");
}


function addTask(e){
  e.preventDefault();
  var taskData = {};
  taskData["Day"] = $taskDay.val();
  taskData["Month"] = $taskMonth.val();
  taskData["Year"] = $taskYear.val();
  taskData["Info"] = $taskInfo.val();
  taskData["Complete"] = false;
  $.post("/tasks", taskData)
  .success(function(data){
    var $task = $('<div>').addClass("task no-select");
    var $taskDate = $('<div>').addClass("taskDate");
    $taskDate.text(data.Month + " " + data.Day + ", " + data.Year);
    $task.append($('<div>').addClass("taskInfo").text(data.Info));
    $task.append($taskDate);
    $task.append($("<div>").addClass("taskComplete").text("No"));
    $tasks.append($task);

    $taskDay.val("");
    $taskMonth.val("");
    $taskYear.val("");
    $taskInfo.val("");
  })
  .fail(function(){
    swal("400 Error", "Bad Request");
  });
}

function popTasks(){
  var $taskList = [];
  $.get("/tasks")
  .success(function(data){
    var taskData = JSON.parse(data);
    taskData.forEach(function(value, index){
      var $task = $('<div>').addClass("task no-select");
      var $taskDate = $('<div>').addClass("taskDate");
      $taskDate.text(value.Month + " " + value.Day + ", " + value.Year);
      $task.append($('<div>').addClass("taskInfo").text(value.Info));
      $task.append($taskDate);
      var $taskComplete = $("<div>").addClass("taskComplete");
      if(value.Complete === "true"){
        $task.addClass("complete");
        $taskComplete.text("Yes")
      }
      else{
        $taskComplete.text("No");
      }
      $task.append($taskComplete);
      $taskList.push($task);
    });
    $tasks.append($taskList);
  });
};

function promptDeleteTask(e){
  var taskToDelete = $(this);
  swal({
    title: "Would you like to delete this task?",
    text: "You will not be able to recover this task!",
    type: "warning",
    showCancelButton: true,
    confirmButtonText: "Yes, delete it!",
    cancelButtonText: "No, I changed my mind!",
    closeOnConfirm: false,
    closeOnCancel: false
  },
  function(isConfirm){
    if(isConfirm){
      swal("Deleted!", "Your task has been deleted.", "success");
      deleteTask(taskToDelete);
    }
    else{
      swal("Cancelled", "Your task is safe", "error");
    }
  });
}

function deleteTask(taskToDelete){
  $.post("/tasks", {"Index": taskToDelete.index(), "Action": "delete"})
  .success(function(){
    taskToDelete.remove();
  })
  .fail(function(){
    swal("400 Error", "Bad Request");
  })
};

function toggleComplete(e){
  var taskToToggle = $(this);
  $.post("/tasks", {"Index": taskToToggle.closest(".task").index(), "Action": "toggleComplete"})
  .success(function(){
    switch (taskToToggle.text()) {
      case "No":
        taskToToggle.text("Yes");
        break;
      case "Yes":
        taskToToggle.text("No");
        break;
    }
    taskToToggle.closest(".task").toggleClass("complete");
  })
  .fail(function(){
    swal("400 Error", "Bad Request");
  })
}
