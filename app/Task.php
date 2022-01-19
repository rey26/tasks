<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    protected $primaryKey = 'task_id';

    protected $fillable = [
        'task_id',
        'description',
        'is_done'
    ];

    // set task not to be done by default
    protected $attributes = [
        'is_done' => false
    ];
}
