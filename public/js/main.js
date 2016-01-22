"use strict";

var $taskAdder, $taskDay, $taskMonth, $taskYear, $taskInfo, $tasks;

$(document).ready(init);

function init(){
  $taskAdder = $('#taskAdder');
  $taskDay = $('#taskDay');
  $taskMonth = $('#taskMonth');
  $taskYear = $('#taskYear');
  $taskYear = $('#taskYear');
  $taskInfo = $('#taskInfo');
  $tasks = $('#tasks');
  $tasks.on("dblclick", ".task", promptDeleteTask);
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
  $.post("/task", taskData)
  .success(function(data){
    var $task = $('<div>').addClass("task no-select");
    var $taskDate = $('<div>').addClass("taskDate");
    $taskDate.text(data.Month + " " + data.Day + ", " + data.Year);
    $task.append($('<div>').addClass("taskInfo").text(data.Info));
    $task.append($taskDate);
    $task.append($("<div>").addClass("taskComplete").text("No"));
    $tasks.append($task);
  })
  .fail(function(){
    swal("400 Error", "Bad Request");
  });
}

function popTasks(){
  console.log("Tasks would be populated to the DOM");
  // var $task = $('<div>').addClass("task no-select");
  // var $taskDate = $('<div>').addClass("taskDate");
  // $taskDate.text(data.Month + " " + data.Day + ", " + data.Year);
  // $task.append($('<div>').addClass("taskInfo").text(data.Info));
  // $task.append($taskDate);
  // $task.append($("<div>").addClass("taskComplete").text("No"));
  // $tasks.append($task);
};

function promptDeleteTask(){
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
      deleteTask();
    }
    else{
      swal("Cancelled", "Your task is safe", "error");
    }
  });
}

function deleteTask(){
  console.log("Task would be deleted.");
};
