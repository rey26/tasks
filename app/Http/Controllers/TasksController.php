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

    public function getAll($order = null){
        if($order){
            $response = Response::json(Task::orderBy('created_at', 'desc')->get());
        } else {
            $response = Response::json(Task::all());
        }
        return $response;
    }

    public function create(Request $request){
        $task = new Task;
        $task->description = $request->description;
        if($task->save()){
            return Response::json($task, 200);
        }
        return "Create error!";
    }

    public function setAsDone($id){
        $task = Task::find($id);
        $task->is_done = 1;
        if($task->save()){
            return Response::json($task, 200);
        }
        return "Create error!";
    }


}
