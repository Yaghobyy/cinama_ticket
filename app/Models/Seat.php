<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Model;

class Seat extends Model
{
    protected $fillable = ['row','number'];

    protected $appends = ['title'];

    public function title() : Attribute
    {
        return Attribute::make(get:function(){
            return $this->row . $this->number;
        });
    }
}
