<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Response;
use App\Task;

class TasksController extends Controller
{
    public function index(){
        return view('index');
    }

    public function showTasks(){
        return Response::json(Task::all());
    }

    public function storeTask(Request $request){
        $task = new Task;
        $task->description = $request->description;
        if($task->save()){
            return Response::json(array('data' => $task), 200);
        }
        return "Insert error!";
    }


}
