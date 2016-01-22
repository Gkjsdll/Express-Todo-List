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
  $tasks.on("dblclick", ".task", deleteTask);
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
  $.post("/addTask", taskData)
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
  //add task to server. if task is successfully added, clear inputs & append to DOM
}

function popTasks(){
  // var $task = $('<div>').addClass("task no-select");
  // var $taskDate = $('<div>').addClass("taskDate");
  // $taskDate.text(data.Month + " " + data.Day + ", " + data.Year);
  // $task.append($('<div>').addClass("taskInfo").text(data.Info));
  // $task.append($taskDate);
  // $task.append($("<div>").addClass("taskComplete").text("No"));
  // $tasks.append($task);
};

function deleteTask(){

};
