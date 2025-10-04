<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Model;

class Artist extends Model
{
    protected $guarded = ['id'];

    protected $appends = ['image_url'];

    public function imageUrl() : Attribute
    {
        return Attribute::make(
            get: fn()=> $this->image ?
              asset('storage/' .  $this->image)  : ''
        );
    }
}
